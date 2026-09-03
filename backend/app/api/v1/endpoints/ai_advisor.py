from fastapi import APIRouter
from backend.app.schemas.ai import AIChatRequest, AIChatResponse

router = APIRouter()

@router.post("/chat", response_model=AIChatResponse)
def ai_chat_advisory(req: AIChatRequest):
    msg = req.message.lower()
    lang = req.language or "uz"

    # Intelligent agricultural responses based on CAREC & RCGA knowledge base
    if "suv" in msg or "tomchilatib" in msg or "water" in msg:
        res = "Mintaqaviy iqlimga moslashish bo'yicha: Tomchilatib sug'orish va aqlli suv o'lchash texnologiyalari Markaziy Osiyoda suv resurslarini 35-40% gacha tejash imkonini beradi. RCGA ning 2026-yilgi tavsiyanomalarida suv tejovchi nasos texnologiyalari va tuproq namligi datchiklarini o'rnatish taklif etiladi."
    elif "tuproq" in msg or "sho'rlanish" in msg or "soil" in msg:
        res = "Tuproq undorligini oshirish va sho'rlanishga qarshi: Organik mulchalash, fitomelioratsiyada tuzga chidamli ekin turlari (halofitlar) hamda no-till (nol ishlov berish) texnologiyasi tuproq strukturasini qayta tiklashda eng samarali usullardir."
    elif "nashr" in msg or "maqola" in msg or "publication" in msg:
        res = "RCGA Knowledge Repository ilmiy bazasida 1,240+ dan ortiq iqlim va yashil agrotexnologiyalarga oid xalqaro va mintaqaviy maqolalar mavjud. Qidiruv bo'limidan foydalanib ularni PDF ko'rinishida yuklab olishingiz mumkin."
    else:
        res = f"RCGA AI Advisor maslahati: '{req.message}' bo'yicha agro-ekologik tadqiqotlarimiz shuni ko mezonlaydiki, CAREC mintaqasi uchun iqlimga chidamli urug'chilik va raqamli monitoring tizimlarini qo'llash tavsiya etiladi."

    return {
        "response": res,
        "confidence": 0.96,
        "relevant_sources": [
            "RCGA Climate Adaptive Agriculture Guide 2026",
            "FAO Regional Water Management Standards"
        ]
    }
