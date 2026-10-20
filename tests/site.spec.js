import { test, expect } from '@playwright/test'

const isPhone = testInfo => testInfo.project.name === 'phone'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
})

test('first screen says who and what, with one action', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Yousef Alkhrissat')
  await expect(page.getByText('Senior backend engineer in Amman.')).toBeInViewport()
  const email = page.locator('.hero').getByRole('link', { name: 'Email me' })
  await expect(email).toBeInViewport()
  await expect(email).toHaveAttribute('href', /^mailto:yousef\.alkhrissat@gmail\.com/)
})

test('the name fits the width without wrapping or overflowing', async ({ page }) => {
  const { width, lines, overflow } = await page.evaluate(() => {
    const line = document.querySelectorAll('.monument-line')[1]
    const r = document.createRange()
    r.selectNodeContents(line)
    return {
      width: r.getBoundingClientRect().width / innerWidth,
      lines: r.getClientRects().length,
      overflow: document.documentElement.scrollWidth - innerWidth,
    }
  })
  expect(lines).toBe(1)
  expect(width).toBeGreaterThan(0.6)
  expect(width).toBeLessThanOrEqual(1)
  expect(overflow).toBeLessThanOrEqual(0)
})

test('every section in the navigation exists and has a heading', async ({ page }) => {
  for (const id of ['work', 'stack', 'experience', 'contact']) {
    const section = page.locator(`#${id}`)
    await expect(section).toHaveCount(1)
    await expect(section.getByRole('heading').first()).toBeVisible()
  }
})

test('docked bar appears once the hero has gone', async ({ page }) => {
  const dock = page.locator('.nav-dock')
  await expect(dock).not.toHaveClass(/is-on/)
  await page.locator('#stack').scrollIntoViewIfNeeded()
  await expect(dock).toHaveClass(/is-on/)
})

test('phone menu opens, navigates and closes with Escape', async ({ page }, testInfo) => {
  test.skip(!isPhone(testInfo), 'menu is phone only')
  const menu = page.getByRole('dialog', { name: 'Menu' })
  await page.locator('.nav-over').getByRole('button', { name: 'Menu' }).click()
  await expect(menu).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await page.locator('.nav-over').getByRole('button', { name: 'Menu' }).click()
  await menu.getByRole('link', { name: 'Experience' }).click()
  await expect(menu).toBeHidden()
  await expect(page.locator('#experience')).toBeInViewport()
})

test('work frame follows the name crossing the middle of the screen', async ({ page }) => {
  const current = () => page.locator('.work-frame img.is-current').getAttribute('src')
  await page.locator('.work-list li[data-index="0"]').evaluate(el => el.scrollIntoView({ block: 'center' }))
  await expect.poll(current).toContain('sowtek')
  await page.locator('.work-list li[data-index="4"]').evaluate(el => el.scrollIntoView({ block: 'center' }))
  await expect.poll(current).toContain('zalatimo')
})

test('work names link out, archived ones do not', async ({ page }) => {
  await expect(page.locator('.work-list a.work-name')).toHaveCount(11)
  await expect(page.locator('.work-list a.work-name').first()).toHaveAttribute('target', '_blank')
  await expect(page.locator('.work-list span.work-name', { hasText: 'Baaz' })).toHaveCount(1)
})

test('a trace row opens to the full role', async ({ page }) => {
  const row = page.locator('.trace-row').filter({ hasText: 'Rhinosoft' })
  await expect(row.getByText(/Zalatimo\.com/)).toHaveCount(0)
  await row.locator('summary').click()
  await expect(row.getByText(/Zalatimo\.com/)).toBeVisible()
  await row.locator('summary').click()
  await expect(row.getByText(/Zalatimo\.com/)).toHaveCount(0)
})

test('time-zone overlap answers for the chosen city', async ({ page }) => {
  const out = page.locator('.live-out')
  // The suite runs in Berlin time: Amman is one or two hours ahead, depending on DST.
  await expect(out).toHaveText(/^[78] shared hours$/)
  await page.getByLabel('From').selectOption({ label: 'San Francisco' })
  await expect(out).toHaveText('no shared hours')
  await expect(page.locator('.row-note')).toContainText('don’t meet')
  await page.getByLabel('From').selectOption({ label: 'Amman' })
  await expect(out).toHaveText('9 shared hours')
})

test('contact form validates, then sends', async ({ page }) => {
  let posted = null
  await page.route('https://api.web3forms.com/submit', async route => {
    posted = route.request().postData()
    await route.fulfill({ json: { success: true } })
  })
  const form = page.locator('form.form')
  await form.getByRole('button', { name: 'Send message' }).click()
  expect(posted).toBeNull()

  await form.getByLabel('Name').fill('Ada Lovelace')
  await form.getByLabel('Email').fill('ada@example.com')
  await form.getByLabel('Message').fill('We need a queue that survives Black Friday.')
  await form.getByRole('button', { name: 'Send message' }).click()
  await expect(form.getByRole('status')).toHaveText(/Sent\./)
  expect(posted).toContain('Ada Lovelace')
})

test('contact form recovers from a failed send', async ({ page }) => {
  await page.route('https://api.web3forms.com/submit', route => route.fulfill({ status: 500, json: { success: false } }))
  const form = page.locator('form.form')
  await form.getByLabel('Name').fill('Ada')
  await form.getByLabel('Email').fill('ada@example.com')
  await form.getByLabel('Message').fill('Hello')
  await form.getByRole('button', { name: 'Send message' }).click()
  await expect(form.getByRole('status')).toContainText('Email me at')
})

test('reduced motion keeps every section visible', async ({ browser }, testInfo) => {
  const ctx = await browser.newContext({ ...testInfo.project.use, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto('/')
  await page.keyboard.press('End')
  await page.waitForTimeout(600)
  const hidden = await page.$$eval('[data-reveal]', els => els.filter(e => e.getBoundingClientRect().top < innerHeight && +getComputedStyle(e).opacity < 0.5).length)
  expect(hidden).toBe(0)
  await ctx.close()
})

test('no broken images', async ({ page }) => {
  await page.keyboard.press('End')
  const broken = await page.$$eval('img', imgs => Promise.all(imgs.map(async img => {
    img.loading = 'eager'
    await img.decode().catch(() => {})
    return img.naturalWidth === 0 ? img.src : null
  })).then(r => r.filter(Boolean)))
  expect(broken).toEqual([])
})

test('captures the page for review', async ({ page }, testInfo) => {
  await page.screenshot({ path: testInfo.outputPath('fold.png') })
  await page.screenshot({ path: testInfo.outputPath('full.png'), fullPage: true })
})

test('a visitor on Amman time starts from a city abroad', async ({ browser }, testInfo) => {
  const ctx = await browser.newContext({ ...testInfo.project.use, timezoneId: 'Asia/Amman' })
  const page = await ctx.newPage()
  await page.goto('/')
  await expect(page.getByLabel('From')).toHaveValue('Europe/Berlin')
  await expect(page.locator('.select-label')).toHaveText('Berlin')
  await ctx.close()
})
