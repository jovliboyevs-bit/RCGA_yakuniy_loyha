import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://fonts.googleapis.com/**', route => route.abort());
  await page.route('https://fonts.gstatic.com/**', route => route.abort());
});

test('all public routes render directly with production CSP and local images', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const route of ['index', 'about', 'news', 'events', 'institutions', 'publications', 'publication-detail', 'search', 'login', 'chat']) {
    await page.goto(`/${route}.html`);
    await expect(page.locator('.route-page')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sahifa yuklanmadi' })).toHaveCount(0);
    expect(await page.locator('[onclick], [onchange], [onsubmit]').count()).toBe(0);
    expect(await page.locator('script:not([src])').count()).toBe(0);
    const brokenImages = await page.locator('img').evaluateAll(elements => elements
      .filter((element): element is HTMLImageElement => element instanceof HTMLImageElement)
      .filter(image => image.src.startsWith(location.origin) && image.complete && !image.naturalWidth)
      .map(image => image.src));
    expect(brokenImages).toEqual([]);
    if (route === 'index' || route === 'chat') {
      await page.screenshot({ path: testInfo.outputPath(`${route}.png`), fullPage: false });
    }
  }
  expect(errors).toEqual([]);
});

test('navigation, history, language and widget survive repeated route changes without document reload', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/index.html');
  await expect(page.locator('.nav')).toBeVisible();
  await page.evaluate(() => { document.documentElement.dataset.testDocument = 'same'; });
  for (let i = 0; i < 3; i++) {
    await page.locator('.nav-links a[href="about.html"]').click();
    await expect(page).toHaveURL(/about.html$/);
    await expect(page.locator('.nav-links a.active')).toHaveAttribute('href', 'about.html');
    await page.locator('.lang-switch button[data-lang="en"]').click();
    await expect(page.locator('.nav-links a[href="index.html"]')).toHaveText('Home');
    await page.locator('.nav-links a[href="index.html"]').click();
    await expect(page).toHaveURL(/index.html$/);
    await expect(page.locator('#rcga-chatbot-root')).toHaveCount(1);
    await expect(page.locator('.rcga-cursor')).toHaveCount(1);
  }
  await page.goBack();
  await expect(page).toHaveURL(/about.html$/);
  expect(await page.evaluate(() => document.documentElement.dataset.testDocument)).toBe('same');
  expect(errors).toEqual([]);
});

test('login sends the existing API contract once after revisiting the form', async ({ page }) => {
  let calls = 0;
  await page.route('**/api/v1/auth/login', async route => {
    calls++;
    expect(route.request().postData()).toContain('username=farmer%40example.com');
    await route.fulfill({ json: { access_token: 'test-token', user: { id: 1, full_name: 'Test Farmer', role: 'FARMER' } } });
  });
  await page.goto('/login.html');
  await page.locator('a[href="index.html"]').first().click();
  await page.locator('.nav a[href="login.html"]').click();
  await page.locator('#login-form input[type="email"]').fill('farmer@example.com');
  await page.locator('#login-form input[type="password"]').fill('secret-test-password');
  await page.locator('#login-form button[type="submit"]').click();
  await expect(page).toHaveURL(/index.html$/);
  await expect(page.locator('.nav')).toContainText('Test Farmer');
  expect(await page.evaluate(() => localStorage.getItem('rcga_token'))).toBeNull();
  await page.reload();
  await expect(page.locator('.nav')).toContainText('Test Farmer');
  const other = await page.context().newPage();
  await other.goto('/index.html');
  await expect(other.locator('.nav')).toContainText('Test Farmer');
  await other.route('**/api/v1/auth/logout', route => route.fulfill({ json: {} }));
  await other.locator('.nav button[data-en="Logout"]').click();
  await expect(page.locator('.nav a[href="login.html"]')).toBeVisible();
  expect(calls).toBe(1);
});

test('logout revokes the current bearer token and clears the browser session', async ({ page }) => {
  let calls = 0;
  await page.route('**/api/v1/auth/login', route => route.fulfill({
    json: { access_token: 'test-token', user: { id: 1, full_name: 'Test Farmer', role: 'FARMER' } },
  }));
  await page.route('**/api/v1/auth/logout', route => {
    expect(route.request().method()).toBe('POST');
    expect(route.request().headers().authorization).toBe('Bearer test-token');
    calls++;
    return route.fulfill({ json: { detail: 'Signed out' } });
  });
  await page.goto('/login.html');
  await page.locator('#login-form input[type="email"]').fill('farmer@example.com');
  await page.locator('#login-form input[type="password"]').fill('secret-test-password');
  await page.locator('#login-form button[type="submit"]').click();
  await page.locator('.nav button[data-en="Logout"]').click();
  await expect(page.locator('.nav a[href="login.html"]')).toBeVisible();
  await expect.poll(() => calls).toBe(1);
});

test('register tab and payload still work', async ({ page }) => {
  let payload: Record<string, unknown> | undefined;
  page.on('dialog', dialog => dialog.accept());
  await page.route('**/api/v1/auth/register', async route => {
    payload = route.request().postDataJSON();
    await route.fulfill({ json: { id: 2 } });
  });
  await page.goto('/login.html#register');
  await expect(page.locator('#form-register')).toBeVisible();
  await page.locator('[name="full_name"]').fill('New Farmer');
  await page.locator('#register-form [name="email"]').fill('new@example.com');
  await page.locator('[name="password"]').fill('password123');
  await page.locator('#register-form input[type="checkbox"]').check();
  await page.locator('#register-form button[type="submit"]').click();
  await expect(page).toHaveURL(/login.html$/);
  expect(payload).toMatchObject({ full_name: 'New Farmer', email: 'new@example.com' });
});

test('admin guard redirects guests', async ({ page }) => {
  page.on('dialog', dialog => dialog.accept());
  await page.goto('/admin.html');
  await expect(page).toHaveURL(/login.html$/);
  await expect(page.locator('#login-form')).toBeVisible();
});

test('admin loads API data safely and delegated delete keeps authorization', async ({ page }) => {
  let deleted = false;
  page.on('dialog', dialog => dialog.accept());
  await page.route('**/api/v1/auth/login', route => route.fulfill({
    json: { access_token: 'admin-token', user: { id: 1, full_name: 'Admin', role: 'SUPERADMIN' } },
  }));
  await page.route('**/api/v1/admin/stats', route => route.fulfill({ json: { users_count: 2, publications_count: 1, news_count: 0, events_count: 0 } }));
  await page.route('**/api/v1/publications?**', route => route.fulfill({ json: { items: deleted ? [] : [{ id: 7, title_uz: '<img src=x onerror="alert(1)">', category: 'Science', authors: 'Author' }] } }));
  await page.route('**/api/v1/admin/publications/7', async route => {
    expect(route.request().method()).toBe('DELETE');
    expect(route.request().headers().authorization).toBe('Bearer admin-token');
    deleted = true;
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto('/login.html');
  await page.locator('#login-form input[type="email"]').fill('admin@example.com');
  await page.locator('#login-form input[type="password"]').fill('secret-test-password');
  await page.locator('#login-form button[type="submit"]').click();
  await expect(page).toHaveURL(/admin.html$/);
  await page.locator('.admin-menu [data-tab="publications"]').click();
  await expect(page.locator('#pub-list-tbody')).toContainText('<img src=x');
  await expect(page.locator('#pub-list-tbody img')).toHaveCount(0);
  await page.locator('[data-admin-action="deletePub"]').click();
  await expect.poll(() => deleted).toBe(true);
  await expect(page.locator('[data-admin-action="deletePub"]')).toHaveCount(0);
});

test('chat sends once and strips executable source URLs', async ({ page }) => {
  let calls = 0;
  await page.route('**/api/v1/ai/chat', async route => {
    calls++;
    expect(route.request().postDataJSON().message).toBe('Suv haqida ayting');
    await route.fulfill({ json: { response: 'Suvni tejang.', relevant_sources: [
      { title: 'External source', url: 'https://example.com/publication' },
      { title: 'RCGA source', url: '/publication-detail.html?id=7' },
    ] } });
  });
  await page.goto('/chat.html');
  await page.locator('#chat-textarea').fill('Suv haqida ayting');
  await page.locator('#chat-send-btn').click();
  await expect(page.locator('#messages-container')).toContainText('Suvni tejang.');
  await expect(page.locator('#messages-container span.chat-source-item').filter({ hasText: 'External source' })).toBeVisible();
  await expect(page.locator('#messages-container').getByRole('link', { name: /RCGA source/ })).toHaveAttribute('href', '/publication-detail.html?id=7');
  expect(calls).toBe(1);
});

test('chat draft avoids the URL and AI key stays in the current tab', async ({ page }) => {
  let requests = 0;
  await page.route('**/api/v1/ai/chat', route => {
    expect(route.request().postDataJSON()).toMatchObject({ api_key: 'test-key', message: 'Private draft' });
    requests++;
    return route.fulfill({ json: { response: 'Test answer' } });
  });
  await page.goto('/');
  await page.locator('#rcga-widget-toggle').click();
  await page.locator('#rcga-widget-input').fill('Private draft');
  await page.locator('#rcga-fullscreen-btn').click();
  await expect(page).toHaveURL(/\/chat.html$/);
  await expect(page.locator('#chat-textarea')).toHaveValue('Private draft');
  expect(requests).toBe(0);
  page.on('dialog', dialog => dialog.accept());
  await page.locator('#open-settings-btn').click();
  await page.locator('#gemini-key-input').fill('test-key');
  await page.locator('#save-key-btn').click();
  await page.locator('#chat-send-btn').click();
  await expect(page.locator('#messages-container')).toContainText('Test answer');
  expect(await page.evaluate(() => ['rcga_ai_key', 'rcga_chat_sessions_v1'].map(key => localStorage.getItem(key)))).toEqual([null, null]);
  await page.reload();
  await expect(page.locator('#messages-container')).toContainText('Test answer');
  await page.locator('#chat-textarea').fill('Unsent draft');
  await page.reload();
  await expect(page.locator('#chat-textarea')).toHaveValue('Unsent draft');
  await page.locator('#chat-textarea').fill('Private draft');
  await page.locator('#chat-send-btn').click();
  await expect.poll(() => requests).toBe(2);
});

test('language menu and home layout work at desktop and phone widths', async ({ page }) => {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    await page.locator('.locale-menu summary').click();
    await expect(page.locator('.locale-options button')).toHaveCount(11);
    await page.locator('.locale-options button').filter({ hasText: 'English' }).click();
    await expect(page.locator('.locale-menu summary')).toContainText('English');
    await expect(page.locator('.countries-rail .country-chip')).toHaveCount(11);
    await expect(page.locator('.countries-rail')).not.toContainText('Afghanistan');
    const badge = await page.locator('.sticky-badge').boundingBox();
    expect(badge!.x + badge!.width).toBeLessThan(width / 2);
    await page.locator('.stats').first().scrollIntoViewIfNeeded();
    await expect(page.locator('[data-count="1240"]').first()).toHaveText('1,240');
    const row = page.locator('.stat-num').filter({ has: page.locator('[data-count="1240"]') }).first();
    const number = await row.locator('[data-count]').boundingBox();
    const plus = await row.locator('.plus').boundingBox();
    expect(plus!.x).toBeGreaterThanOrEqual(number!.x + number!.width - 1);
  }
});

test('inner page headings fit below navigation and leave room for content', async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    for (const route of ['about', 'publications', 'publication-detail', 'news', 'events', 'institutions', 'search']) {
      await page.goto('/' + route + '.html');
      const hero = page.locator('.page-hero');
      await expect(hero).toBeVisible();
      const heading = hero.locator('h1');
      if (route === 'news') await expect(heading).toHaveText("So'nggi yangiliklar.");
      if (route === 'events') await expect(heading).toHaveText('Hamjamiyat tadbirlari.');
      const nav = await page.locator('.nav').boundingBox();
      const crumbs = await hero.locator('.crumbs').boundingBox();
      const title = await heading.boundingBox();
      expect(crumbs!.y).toBeGreaterThanOrEqual(nav!.y + nav!.height - 1);
      expect(title!.y + title!.height).toBeLessThan(550);
      expect(title!.x + title!.width).toBeLessThanOrEqual(width);
      if (width === 1440) expect((await hero.boundingBox())!.height).toBeLessThan(560);
    }
  }
});

test('featured content, filters and results stay together on news and events', async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    for (const route of ['news', 'events']) {
      await page.goto('/' + route + '.html');
      const featured = page.locator('.feed-feature > .container-wide');
      const filters = page.locator('.feed-filters');
      const results = page.locator('.feed-filters + section');
      await expect(results).toBeAttached();
      const card = (await featured.boundingBox())!;
      const bar = (await filters.boundingBox())!;
      const list = (await results.boundingBox())!;
      expect(bar.y - card.y - card.height).toBeLessThanOrEqual(30);
      expect(Math.abs(list.y - bar.y - bar.height)).toBeLessThanOrEqual(1);
    }
  }
});

test('scroll reveals offscreen content and reduced motion shows it immediately', async ({ page }) => {
  await page.goto('/');
  const photo = page.locator('.story-photo');
  await expect(photo).not.toHaveClass(/\bin\b/);
  await photo.scrollIntoViewIfNeeded();
  await expect(photo).toHaveClass(/\bin\b/);
  await expect(photo).toHaveCSS('clip-path', 'inset(0px round 20px)');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(photo).toHaveClass(/\bin\b/);
  await expect(photo).toHaveCSS('transition-duration', '0s');
  await expect(page.locator('.feature-card').first()).toHaveCSS('border-top-left-radius', '20px');
});

test('phone and tablet visitors can open navigation and search without zoom or horizontal scrolling', async ({ page }) => {
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    const menu = page.getByRole('button', { name: 'Menyu' });
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await menu.click();
    await page.locator('#site-navigation a[href="search.html"]').click();
    await expect(page).toHaveURL(/search.html$/);
    const input = page.locator('.search-bar input');
    await expect(input).toBeVisible();
    expect(await input.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
    const button = await page.locator('.search-bar button').boundingBox();
    expect(button!.x + button!.width).toBeLessThanOrEqual(width);
    expect(button!.height).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test.describe('mobile header and assistant', () => {
  test.use({ isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  test('controls stay on screen at the hero and the bottom of the page', async ({ page }) => {
    for (const width of [320, 360, 390]) {
      await page.setViewportSize({ width, height: 740 });
      await page.goto('/');
      for (const atFooter of [false, true]) {
        if (atFooter) await page.locator('.metric-strip').scrollIntoViewIfNeeded();
        const toggle = page.locator('#rcga-widget-toggle');
        await toggle.tap();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await expect(page.locator('#rcga-widget-input')).not.toBeFocused();
        for (const selector of ['.nav-right a', '.nav-toggle', '.locale-menu summary', '#rcga-widget-card', '#rcga-widget-input', '#rcga-widget-send', '#rcga-widget-toggle']) {
          const box = await page.locator(selector).boundingBox();
          expect(box!.x, selector).toBeGreaterThanOrEqual(0);
          expect(box!.x + box!.width, selector).toBeLessThanOrEqual(width);
        }
        await toggle.tap();
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      }
      const rows = await page.locator('.metric-strip > span:not(.sep)').evaluateAll(elements =>
        elements.map(el => Math.round(el.getBoundingClientRect().left)));
      expect(new Set(rows).size).toBe(1);
    }
  });
});
