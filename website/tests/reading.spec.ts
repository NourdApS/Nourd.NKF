import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const root = '/Nourd.NKF/';
const pages = ['', 'start-here/the-problem/', 'start-here/who-it-helps/', 'start-here/when-it-fits/', 'start-here/how-it-works/', 'start-here/mechanics/'];

for (const theme of ['light', 'dark'] as const) {
  test(`all Start Here pages remain readable and accessible in ${theme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    for (const path of pages) {
      await page.goto(root + path);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeEnabled();
      for (const width of [1440, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 960 });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow on ${path} at ${width}`).toBe(true);
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(accessibility.violations).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test('a reader finds an export example and follows the search result', async ({ page }) => {
  await page.goto(root);
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Search' });
  await dialog.getByRole('textbox').fill('export');
  const result = dialog.getByRole('link', { name: /From an intention to an implementation/ }).first();
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.locator('h1')).toHaveText('From an intention to an implementation.');
  await expect(dialog).not.toBeVisible();
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeFocused();
});

test('mobile menu, theme persistence, page navigation, and skip link work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(root);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#_top$/);
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  await menu.click();
  const fitLink = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'When it fits', exact: true });
  await expect(fitLink).toBeVisible();
  await page.getByLabel('Select theme').filter({ visible: true }).selectOption('light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await fitLink.click();
  await expect(page.locator('h1')).toHaveText('Use it where the reasoning needs to last.');
  await expect(fitLink).not.toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('link', { name: 'Next How it works' }).click();
  await expect(page.locator('h1')).toHaveText('From an intention to an implementation.');
  await page.getByRole('link', { name: 'Next The mechanics' }).click();
  await expect(page.locator('h1')).toHaveText('The mechanics, at a glance.');
});

test('every internal link and static asset resolves under the GitHub project base path', async ({ page, request }) => {
  const urls = new Set<string>();
  for (const path of pages) {
    await page.goto(root + path);
    for (const url of await page.locator('a[href], img[src], link[href], script[src]').evaluateAll(elements => elements.map(element => element.getAttribute('href') || element.getAttribute('src')!))) {
      const resolved = new URL(url, page.url());
      if (resolved.origin === new URL(page.url()).origin) {
        expect(resolved.pathname.startsWith(root)).toBe(true);
        resolved.hash = '';
        urls.add(resolved.href);
      }
    }
  }
  for (const url of urls) expect((await request.get(url)).ok(), url).toBe(true);
});
