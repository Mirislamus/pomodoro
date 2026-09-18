import { expect, test } from '@playwright/test';

test('user can open the timer and start a focus session', async ({ page }) => {
  const pageErrors: string[] = [];
  const failedFirstPartyRequests: string[] = [];

  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('requestfailed', request => {
    if (new URL(request.url()).origin === new URL(page.url()).origin) {
      failedFirstPartyRequests.push(request.url());
    }
  });

  await page.goto('./');

  await expect(page.getByText('25:00', { exact: true })).toBeVisible();

  const startButton = page.getByRole('button', { name: /старт|start/i });
  await startButton.click();

  await expect(page.getByRole('button', { name: /пауза|pause/i })).toBeVisible();
  expect(pageErrors).toEqual([]);
  expect(failedFirstPartyRequests).toEqual([]);
});

test('user can change a timer setting and keep it after reload', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: /настройки|settings/i }).click();
  await page.waitForURL(/.*\/settings\/?/);

  const pomodoroCount = page.getByLabel(/pomodoro count|количество помодоро/i);
  await pomodoroCount.fill('3');
  await page.reload();

  await expect(page.getByLabel(/pomodoro count|количество помодоро/i)).toHaveValue('3');
});

test('numeric setting labels keep their title and helper text stacked', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: /настройки|settings/i }).click();
  await expect(page.getByRole('tab', { name: /таймер|timer/i })).toBeVisible();
  await page.waitForTimeout(300);

  const labelParts = page.locator('[data-scope="field"][data-part="label"]').first().locator(':scope > *');
  const title = await labelParts.nth(0).boundingBox();
  const helper = await labelParts.nth(1).boundingBox();

  expect(title).not.toBeNull();
  expect(helper).not.toBeNull();
  expect(helper!.y).toBeGreaterThanOrEqual(title!.y + title!.height);
});

test('sound menus open independently', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: /настройки|settings/i }).click();
  await page.getByRole('tab', { name: /звуки|sounds/i }).click();
  await page.getByRole('button', { name: /bell/i }).click();

  await expect(page.locator('[role="menu"]:visible')).toHaveCount(1);
});

test('settings tabs and actions keep the intended desktop layout', async ({ page }) => {
  const cssWarnings: string[] = [];
  page.on('console', message => {
    if (message.text().includes('Using kebab-case for css properties')) {
      cssWarnings.push(message.text());
    }
  });

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('./');
  await page.getByRole('button', { name: /настройки|settings/i }).click();

  const timerTab = page.getByRole('tab', { name: /таймер|timer/i });
  const tabStyles = await timerTab.evaluate(element => {
    const styles = getComputedStyle(element);
    return {
      cursor: styles.cursor,
      fontSize: Number.parseFloat(styles.fontSize),
      justifyContent: styles.justifyContent,
    };
  });

  expect(tabStyles).toEqual({ cursor: 'pointer', fontSize: 16, justifyContent: 'center' });

  const enabledButtons = page.locator('button:not(:disabled)');
  await expect
    .poll(async () => enabledButtons.evaluateAll(buttons => buttons.every(button => getComputedStyle(button).cursor === 'pointer')))
    .toBe(true);

  const scrollArea = page.locator('.simplebar-content-wrapper');
  const overflow = await scrollArea.evaluate(element => ({
    horizontal: element.scrollWidth - element.clientWidth,
    vertical: element.scrollHeight - element.clientHeight,
  }));

  expect(overflow.horizontal).toBeLessThanOrEqual(0);
  expect(overflow.vertical).toBeLessThanOrEqual(0);
  expect(cssWarnings).toEqual([]);
});

test('mobile settings fit the viewport and keep both actions aligned', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 642 });
  await page.goto('./');
  await page.getByRole('button', { name: /настройки|settings/i }).click();

  const scrollArea = page.locator('.simplebar-content-wrapper');
  const resetButton = page.getByRole('button', { name: /сбросить настройки|reset settings/i });
  const copyButton = page.getByRole('button', { name: /скопировать настройки|copy settings/i });
  const [overflow, resetBox, copyBox] = await Promise.all([
    scrollArea.evaluate(element => element.scrollHeight - element.clientHeight),
    resetButton.boundingBox(),
    copyButton.boundingBox(),
  ]);

  expect(overflow).toBeLessThanOrEqual(0);
  expect(resetBox).not.toBeNull();
  expect(copyBox).not.toBeNull();
  const resetCenterY = resetBox!.y + resetBox!.height / 2;
  const copyCenterY = copyBox!.y + copyBox!.height / 2;
  expect(Math.abs(resetCenterY - copyCenterY)).toBeLessThanOrEqual(1);
  expect(resetBox!.y + resetBox!.height).toBeLessThanOrEqual(642);
  expect(copyBox!.y + copyBox!.height).toBeLessThanOrEqual(642);
});

test('core layout keeps its published geometry across responsive widths', async ({ page }) => {
  const viewports = [
    { width: 1440, height: 900, contentInset: 110, circleSize: 500 },
    { width: 1024, height: 900, contentInset: 30, circleSize: 500 },
    { width: 768, height: 900, contentInset: 30, circleSize: 500 },
    { width: 390, height: 844, contentInset: 16, circleSize: 300 },
    { width: 320, height: 642, contentInset: 16, circleSize: 300 },
  ];

  await page.addInitScript(() => localStorage.setItem('chakra-ui-color-mode', 'dark'));

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('./');

    const [headerBox, progressBox, bodyBackground, horizontalOverflow] = await Promise.all([
      page.locator('header').first().boundingBox(),
      page.locator('svg[width="500"][height="500"]').boundingBox(),
      page.locator('body').evaluate(element => getComputedStyle(element).backgroundColor),
      page.locator('html').evaluate(element => element.scrollWidth - element.clientWidth),
    ]);

    expect(headerBox).not.toBeNull();
    expect(progressBox).not.toBeNull();
    expect(Math.abs(headerBox!.x - viewport.contentInset)).toBeLessThanOrEqual(5);
    expect(Math.round(progressBox!.width)).toBe(viewport.circleSize);
    expect(bodyBackground).toMatch(/^rgba?\(0,\s*0,\s*0/);
    expect(horizontalOverflow).toBeLessThanOrEqual(0);
  }
});

test('mobile stage dialog keeps the published top offset and backdrop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('./');
  await page.getByRole('button', { name: /pomodoro/i }).click();

  const dialog = page.getByRole('dialog');
  const backdrop = page.locator('[data-scope="dialog"][data-part="backdrop"]');
  await expect
    .poll(async () => {
      const box = await dialog.boundingBox();
      return box
        ? { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width) }
        : null;
    })
    .toEqual({ x: 31, y: 64, width: 328 });

  const backdropColor = await backdrop.evaluate(element => getComputedStyle(element).backgroundColor);
  expect(backdropColor).toBe('rgba(0, 0, 0, 0.48)');
});

test('settings switch uses its full row as one click target', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('./');
  await page.getByRole('button', { name: /настройки|settings/i }).click();

  const checkbox = page.getByRole('checkbox', { name: /автозапуск|autostart/i });
  const clickTarget = checkbox.locator('..');
  const targetBox = await clickTarget.boundingBox();

  expect(targetBox).not.toBeNull();
  expect(targetBox!.width).toBeGreaterThan(300);
  await clickTarget.click({ position: { x: targetBox!.width / 2, y: targetBox!.height / 2 } });
  await expect(checkbox).toBeChecked();
});

test('focused checked switch keeps one focus ring and a contained white thumb', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('./');
  await page.getByRole('button', { name: /настройки|settings/i }).click();
  await page.waitForURL(/.*\/settings\/?/);

  const checkbox = page.getByRole('checkbox', { name: /автозапуск|autostart/i });
  await expect(checkbox).toBeVisible();
  await checkbox.focus();
  await page.keyboard.press('Space');

  const root = page.locator('[data-scope="switch"][data-part="root"]:visible');
  const label = root.locator('[data-part="label"]');
  const control = root.locator('[data-part="control"]');
  const thumb = root.locator('[data-part="thumb"]');
  const [controlBox, thumbBox] = await Promise.all([control.boundingBox(), thumb.boundingBox()]);
  const styles = await Promise.all(
    [root, label, control, thumb].map(locator =>
      locator.evaluate(element => ({
        background: getComputedStyle(element).backgroundColor,
        boxShadow: getComputedStyle(element).boxShadow,
      }))
    )
  );

  expect(controlBox).not.toBeNull();
  expect(thumbBox).not.toBeNull();
  expect(styles[0].boxShadow).toBe('none');
  expect(styles[1].boxShadow).toBe('none');
  expect(styles[2].boxShadow).not.toBe('none');
  expect(styles[3].background).toBe('rgb(255, 255, 255)');
  expect(thumbBox!.x).toBeGreaterThanOrEqual(controlBox!.x);
  expect(thumbBox!.x + thumbBox!.width).toBeLessThanOrEqual(controlBox!.x + controlBox!.width);
});

test('sound ranges match the published track fill and thumb geometry', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('chakra-ui-color-mode', 'dark'));
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('./');
  await page.getByRole('button', { name: /настройки|settings/i }).click();
  await page.getByRole('tab', { name: /звуки|sounds/i }).click();

  const slider = page.locator('[data-scope="slider"][data-part="root"]:visible').first();
  const parts = await slider.evaluate(
    (element, partNames) =>
      partNames.map(part => {
        const partElement = element.querySelector(`[data-part="${part}"]`);
        if (!partElement) throw new Error(`Missing slider part: ${part}`);

        const styles = getComputedStyle(partElement);
        const rect = partElement.getBoundingClientRect();
        return {
          background: styles.backgroundColor,
          border: styles.border,
          boxShadow: styles.boxShadow,
          height: rect.height,
          centerY: rect.y + rect.height / 2,
        };
      }),
    ['control', 'track', 'range', 'thumb']
  );

  expect(parts[0].height).toBe(24);
  expect(parts[1].height).toBe(4);
  expect(parts[1].background).toBe('rgba(255, 255, 255, 0.08)');
  expect(parts[2].height).toBe(6);
  expect(parts[2].background).toBe('rgb(237, 68, 85)');
  expect(parts[2].centerY).toBe(parts[1].centerY);
  expect(parts[3].height).toBe(16);
  expect(parts[3].background).toBe('rgb(255, 255, 255)');
  expect(parts[3].border).toBe('1px solid rgba(0, 0, 0, 0)');
  expect(parts[3].boxShadow).not.toBe('none');
});

test('autostart begins the next stage with its full duration', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'settings-storage',
      JSON.stringify({
        state: {
          settings: {
            count: 5,
            duration: 300,
            shortBreak: 5000,
            longBreak: 5000,
            hasAutoStart: true,
            alarmSound: 'alarm-bell',
            alarmSoundVolume: 0,
            tickSound: 'none',
            tickSoundVolume: 0,
            allowNotifications: false,
          },
        },
        version: 0,
      })
    );
    localStorage.removeItem('session-storage');
  });

  await page.goto('./');
  await page.getByRole('button', { name: /старт|start/i }).click();

  await expect
    .poll(async () => {
      const storedSession = await page.evaluate(() => localStorage.getItem('session-storage'));
      return storedSession ? JSON.parse(storedSession).state.session.stage : null;
    })
    .toBe('short-break');
  await expect(page.getByRole('button', { name: /пауза|pause/i })).toBeVisible();
  await expect(page.getByText(/00:0[1-5]/)).toBeVisible();
});

test('skip advances to the next stage and clears the skipped stage time', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'settings-storage',
      JSON.stringify({
        state: {
          settings: {
            count: 5,
            duration: 30000,
            shortBreak: 5000,
            longBreak: 10000,
            hasAutoStart: false,
            alarmSound: 'alarm-bell',
            alarmSoundVolume: 0,
            tickSound: 'none',
            tickSoundVolume: 0,
            allowNotifications: false,
          },
        },
        version: 0,
      })
    );
    localStorage.setItem(
      'session-storage',
      JSON.stringify({
        state: {
          session: {
            sessionCount: 1,
            stage: 'pomodoro',
            pomodoroCurrentTime: 15000,
            shortBrakeCurrentTime: 2500,
            longBrakeCurrentTime: 0,
          },
        },
        version: 0,
      })
    );
  });

  await page.goto('./');
  const skipButton = page.locator('button:has(svg polygon)');
  await skipButton.click();

  await expect
    .poll(async () => page.evaluate(() => JSON.parse(localStorage.getItem('session-storage')!).state.session))
    .toMatchObject({ stage: 'short-break', pomodoroCurrentTime: 0, shortBrakeCurrentTime: 0 });

  await skipButton.click();
  await expect
    .poll(async () => page.evaluate(() => JSON.parse(localStorage.getItem('session-storage')!).state.session))
    .toMatchObject({ stage: 'pomodoro', sessionCount: 2, shortBrakeCurrentTime: 0 });
});

test('skip button resets cycle directly to step 1 and zeroes out all times', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'session-storage',
      JSON.stringify({
        state: {
          session: {
            sessionCount: 3,
            stage: 'short-break',
            pomodoroCurrentTime: 12000,
            shortBrakeCurrentTime: 4000,
            longBrakeCurrentTime: 8000,
          },
        },
        version: 0,
      })
    );
  });

  await page.goto('./');

  const skipAllButton = page.getByRole('button', { name: /skip all steps|пропустить все шаги/i });
  await expect(skipAllButton).toBeVisible();
  await skipAllButton.click();

  await expect
    .poll(async () => page.evaluate(() => JSON.parse(localStorage.getItem('session-storage')!).state.session))
    .toEqual({
      stage: 'pomodoro',
      sessionCount: 1,
      pomodoroCurrentTime: 0,
      shortBrakeCurrentTime: 0,
      longBrakeCurrentTime: 0,
    });

  await expect(page.getByText('25:00', { exact: true })).toBeVisible();
  await expect(page.getByText(/1 (из|of|dan|von) \d+/i)).toBeVisible();
});

test('circular skip button shows tooltip on hover both when paused and playing', async ({ page }) => {
  await page.goto('./');

  const circularSkip = page.getByRole('button', { name: /skip current step|пропустить текущий этап/i });
  await expect(circularSkip).toBeVisible();
  await circularSkip.hover();

  const tooltip = page.locator('[data-scope="tooltip"][data-part="content"]:visible');
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toContainText(/skip current step|пропустить текущий этап/i);

  // Start timer and verify tooltip still shows on hover when playing
  const toggleBtn = page.getByRole('button', { name: /start|старт|boshlash/i });
  await toggleBtn.click();
  await expect(page.getByRole('button', { name: /pause|пауза|to‘xtatish/i })).toBeVisible();

  await circularSkip.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toContainText(/skip current step|пропустить текущий этап/i);
});

test('tooltip arrow uses the same background as its content without contrasting border', async ({ page }) => {
  await page.goto('./');

  for (const mode of ['light', 'dark'] as const) {
    await page.evaluate(m => {
      document.documentElement.setAttribute('data-theme', m);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(m);
      localStorage.setItem('chakra-ui-color-mode', m);
    }, mode);

    const trigger = page.locator('[data-scope="tooltip"][data-part="trigger"]').first();
    await expect(trigger).toBeVisible();
    await trigger.hover();
    const tooltip = page.locator('[data-scope="tooltip"][data-part="content"]:visible');
    await expect(tooltip).toBeVisible();

    const styles = await tooltip.evaluate(element => {
      const arrowTip = element.querySelector('[data-part="arrow-tip"]') as HTMLElement | null;
      if (!arrowTip) return null;
      const contentStyle = getComputedStyle(element);
      const tipStyle = getComputedStyle(arrowTip);
      return {
        contentBg: contentStyle.backgroundColor,
        arrowBg: tipStyle.backgroundColor,
        borderTopWidth: tipStyle.borderTopWidth,
        borderTopColor: tipStyle.borderTopColor,
        borderLeftWidth: tipStyle.borderLeftWidth,
        borderLeftColor: tipStyle.borderLeftColor,
      };
    });

    expect(styles).not.toBeNull();
    expect(styles!.arrowBg).toBe(styles!.contentBg);
    const isTopBorderHidden =
      styles!.borderTopWidth === '0px' ||
      styles!.borderTopColor === 'rgba(0, 0, 0, 0)' ||
      styles!.borderTopColor === 'transparent' ||
      styles!.borderTopColor === styles!.contentBg;
    const isLeftBorderHidden =
      styles!.borderLeftWidth === '0px' ||
      styles!.borderLeftColor === 'rgba(0, 0, 0, 0)' ||
      styles!.borderLeftColor === 'transparent' ||
      styles!.borderLeftColor === styles!.contentBg;
    expect(isTopBorderHidden).toBe(true);
    expect(isLeftBorderHidden).toBe(true);
  }
});

test('user can switch the color mode and keep it after reload', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => localStorage.setItem('chakra-ui-color-mode', 'light'));
  await page.reload();

  await page.getByRole('button', { name: /dark mode|тёмный режим|dunkler modus/i }).click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('user can switch the language and keep it after reload', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'The language control uses the mobile drawer there.');

  await page.goto('./');
  await page.evaluate(() => localStorage.setItem('i18nextLng', 'en'));
  await page.reload();

  await page.getByRole('button', { name: 'English' }).click();
  await expect(page.getByText('Language selection', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Russian' }).click();

  await expect(page).toHaveURL(/.*\/ru\//);
  await expect(page.getByRole('button', { name: 'Русский' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Русский' })).toBeVisible();

  await page.getByRole('button', { name: 'Русский' }).click();
  await expect(page.getByText('Выбор языка', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Узбекский' }).click();

  await expect(page).toHaveURL(/.*\/uz\//);
  await expect(page.getByRole('button', { name: 'O‘zbekcha' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'O‘zbekcha' })).toBeVisible();
});

test('localized routes open with correct language content', async ({ page }) => {
  await page.goto('./ru/');
  await expect(page.getByText('25:00', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /старт/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /пропустить все шаги/i })).toHaveText(/пропустить/i);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');

  await page.goto('./uz/');
  await expect(page.getByText('25:00', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /boshlash/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /barcha bosqichlarni/i })).toHaveText(/tkazib yuborish/i);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uz');

  await page.goto('./de/');
  await expect(page.getByText('25:00', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /start/i })).toBeVisible();
  const skipDeBtn = page.getByRole('button', { name: /alle schritte überspringen/i });
  await expect(skipDeBtn).toHaveText(/überspringen/i);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');

  // Verify skip button is horizontally centered over the circular start button
  const startDeBtn = page.getByRole('button', { name: /start/i });
  const skipBox = await skipDeBtn.boundingBox();
  const startBox = await startDeBtn.boundingBox();
  expect(skipBox).not.toBeNull();
  expect(startBox).not.toBeNull();
  const skipCenter = skipBox!.x + skipBox!.width / 2;
  const startCenter = startBox!.x + startBox!.width / 2;
  expect(Math.abs(skipCenter - startCenter)).toBeLessThanOrEqual(1.5);
});

test('all locale dictionaries have identical keys and clean formatting', async () => {
  const en = (await import('../../src/localization/locales/en')).default;
  const ru = (await import('../../src/localization/locales/ru')).default;
  const uz = (await import('../../src/localization/locales/uz')).default;
  const de = (await import('../../src/localization/locales/de')).default;

  const enKeys = Object.keys(en);
  for (const [lang, dict] of Object.entries({ ru, uz, de })) {
    expect(Object.keys(dict), `Key mismatch for ${lang}`).toEqual(enKeys);
    for (const [key, value] of Object.entries(dict)) {
      expect(/[\u0300-\u036f]/.test(value), `Combining diacritics in ${lang}.${key}`).toBe(false);
      if (lang === 'ru') {
        const hasMixed = value.split(/\s+/).some(w => /[\u0400-\u04FF]/.test(w) && /[A-Za-z]/.test(w));
        expect(hasMixed, `Mixed Latin/Cyrillic in ru.${key}`).toBe(false);
      }
      if (lang === 'uz') {
        expect(value.includes("'"), `ASCII apostrophe in uz.${key}`).toBe(false);
      }
    }
  }
});

test('sitemap index and sitemap are accessible', async ({ request }) => {
  const sitemapIndexResponse = await request.get('./sitemap-index.xml');
  expect(sitemapIndexResponse.ok()).toBe(true);
  const sitemapIndexText = await sitemapIndexResponse.text();
  expect(sitemapIndexText).toContain('sitemap-0.xml');

  const sitemap0Response = await request.get('./sitemap-0.xml');
  expect(sitemap0Response.ok()).toBe(true);
  const sitemap0Text = await sitemap0Response.text();
  expect(sitemap0Text).toContain('/pomodoro/');
  expect(sitemap0Text).toContain('/pomodoro/ru/');
  expect(sitemap0Text).toContain('/pomodoro/uz/');
  expect(sitemap0Text).toContain('/pomodoro/de/');
  expect(sitemap0Text).not.toContain('/settings');
  expect(sitemap0Text).toContain('hreflang="en"');
  expect(sitemap0Text).toContain('hreflang="ru"');
  expect(sitemap0Text).toContain('hreflang="uz"');
  expect(sitemap0Text).toContain('hreflang="de"');
});

test('page has valid SEO tags, Schema.org JSON-LD, and H1', async ({ page }) => {
  await page.goto('./');

  // Verify H1 presence
  const h1 = page.locator('h1');
  await expect(h1).toBeAttached();
  await expect(h1).toHaveText(/Pomotomo/);

  // Verify main landmark
  await expect(page.locator('main#main-content')).toBeAttached();

  // Verify robots meta on homepage
  const robotsMeta = page.locator('meta[name="robots"]');
  await expect(robotsMeta).toHaveAttribute('content', /index,\s*follow/);

  // Verify mobile favicons
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', /icon-192x192\.png/);

  // Verify JSON-LD
  const jsonLdScript = page.locator('script[type="application/ld+json"]');
  await expect(jsonLdScript).toBeAttached();
  const jsonLdContent = await jsonLdScript.textContent();
  expect(jsonLdContent).not.toBeNull();
  const parsed = JSON.parse(jsonLdContent!);
  expect(parsed['@context']).toBe('https://schema.org');
  const graph = parsed['@graph'];
  expect(Array.isArray(graph)).toBe(true);

  const types = graph.map((node: { '@type': string }) => node['@type']);
  expect(types).toContain('Organization');
  expect(types).toContain('WebSite');
  expect(types).toContain('WebApplication');
  expect(types).toContain('HowTo');
  expect(types).toContain('FAQPage');

  // Organization logo must be PNG
  const orgNode = graph.find((node: { '@type': string }) => node['@type'] === 'Organization');
  expect(orgNode.logo.url).toContain('.png');

  // Navigate to settings and check noindex
  await page.goto('./settings/');
  const settingsRobots = page.locator('meta[name="robots"]');
  await expect(settingsRobots).toHaveAttribute('content', 'noindex, follow');
});

test('timer persists countdown when navigating between timer and settings', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByText('25:00', { exact: true })).toBeVisible();

  const startButton = page.getByRole('button', { name: /старт|start/i });
  await startButton.click();
  await expect(page.getByRole('button', { name: /пауза|pause/i })).toBeVisible();

  await page.waitForTimeout(1100);

  await page.getByRole('button', { name: /настройки|settings/i }).click();
  await page.waitForURL(/.*\/settings\/?/);
  await expect(page.getByRole('tab', { name: /звуки|sounds/i })).toBeVisible();

  await page.waitForTimeout(1100);

  await page.getByRole('button', { name: /закрыть|close/i }).first().click();
  await page.waitForURL(url => !url.pathname.includes('/settings'));

  await expect(page.getByRole('button', { name: /пауза|pause/i })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(/24:5[0-9]/)).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('25:00', { exact: true })).not.toBeVisible();
});

