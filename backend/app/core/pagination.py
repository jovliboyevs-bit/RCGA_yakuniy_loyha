import math
from datetime import datetime, time
from typing import Optional, Dict, Any, Tuple, Union
from sqlalchemy.orm import Query
from sqlalchemy import Column

def parse_date(date_val: Union[str, datetime, None], is_end_of_day: bool = False) -> Optional[datetime]:
    """Parses date string (YYYY-MM-DD or ISO 8601) to datetime object."""
    if not date_val:
        return None
    if isinstance(date_val, datetime):
        return date_val

    date_str = str(date_val).strip()
    try:
        if "T" in date_str or " " in date_str:
            dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        else:
            # Simple date: YYYY-MM-DD
            dt = datetime.strptime(date_str, "%Y-%m-%d")
            if is_end_of_day:
                dt = datetime.combine(dt.date(), time.max)
        return dt
    except Exception:
        return None

def apply_date_filter(
    query: Query,
    column: Column,
    date_from: Optional[Union[str, datetime]] = None,
    date_to: Optional[Union[str, datetime]] = None
) -> Query:
    """Applies date_from and date_to range filters to a SQLAlchemy column."""
    dt_from = parse_date(date_from, is_end_of_day=False)
    if dt_from:
        query = query.filter(column >= dt_from)

    dt_to = parse_date(date_to, is_end_of_day=True)
    if dt_to:
        query = query.filter(column <= dt_to)

    return query

def apply_sorting(
    query: Query,
    sort_by: Optional[str],
    allowed_columns: Dict[str, Column],
    default_column: Column,
    default_order: str = "desc"
) -> Query:
    """
    Safely orders a query.
    Supports:
      sort_by="published_at" (asc/desc depending on default)
      sort_by="-published_at" (explicit desc)
      sort_by="+published_at" (explicit asc)
    """
    if not sort_by:
        return query.order_by(default_column.desc() if default_order.lower() == "desc" else default_column.asc())

    sort_clean = sort_by.strip()
    direction = default_order.lower()

    if sort_clean.startswith("-"):
        direction = "desc"
        field_name = sort_clean[1:].strip()
    elif sort_clean.startswith("+"):
        direction = "asc"
        field_name = sort_clean[1:].strip()
    else:
        field_name = sort_clean

    col = allowed_columns.get(field_name.lower())
    if col is None:
        # Fallback to default
        col = default_column
        direction = default_order.lower()

    if direction == "asc":
        return query.order_by(col.asc())
    else:
        return query.order_by(col.desc())

def paginate_query(
    query: Query,
    page: int = 1,
    size: int = 20,
    skip: Optional[int] = None,
    limit: Optional[int] = None
) -> Tuple[Query, Dict[str, int]]:
    """
    Computes total count, offsets, and limits.
    Returns: (sliced_query, {"total": total, "page": page, "size": size, "pages": pages})
    """
    total = query.count()

    # Legacy skip/limit support
    if skip is not None:
        actual_size = limit if (limit and limit > 0) else size
        actual_page = (skip // actual_size) + 1 if actual_size > 0 else 1
        offset = skip
        size = actual_size
        page = actual_page
    else:
        page = max(1, page)
        size = max(1, min(100, size))
        offset = (page - 1) * size

    pages = max(1, math.ceil(total / size)) if total > 0 else 1
    sliced_query = query.offset(offset).limit(size)

    return sliced_query, {
        "total": total,
        "page": page,
        "size": size,
        "pages": pages
    }

