import { test, expect } from '@playwright/test'

const isPhone = testInfo => testInfo.project.name === 'phone'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
})

test('first screen says who, what, and how to act', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/online stores, phone platforms and learning apps/)
  await expect(page.getByText('Yousef Alkhrissat · Senior backend engineer in Amman')).toBeInViewport()
  await expect(page.locator('.hero').getByRole('link', { name: 'See my work' })).toBeInViewport()
})

test('no horizontal scroll', async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})

test('every section in the navigation exists and has a heading', async ({ page }) => {
  for (const id of ['work', 'experience', 'about', 'contact']) {
    const section = page.locator(`#${id}`)
    await expect(section).toHaveCount(1)
    await expect(section.getByRole('heading').first()).toBeVisible()
  }
})

test('nav turns solid once the hero has gone', async ({ page }) => {
  const nav = page.locator('.nav')
  await expect(nav).not.toHaveClass(/is-solid/)
  await page.locator('#experience').scrollIntoViewIfNeeded()
  await expect(nav).toHaveClass(/is-solid/)
})

test('phone menu opens, navigates and closes with Escape', async ({ page }, testInfo) => {
  test.skip(!isPhone(testInfo), 'menu is phone only')
  const menu = page.getByRole('dialog', { name: 'Menu' })
  const open = page.locator('.nav').getByRole('button', { name: 'Menu' })
  await open.click()
  await expect(menu).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await open.click()
  await menu.getByRole('link', { name: 'Experience' }).click()
  await expect(menu).toBeHidden()
  await expect(page.locator('#experience')).toBeInViewport()
})

test('each case study tells problem, action and result', async ({ page }) => {
  const cases = page.locator('.case')
  await expect(cases).toHaveCount(4)
  for (const label of ['The problem', 'What I did', 'The result']) {
    await expect(cases.first().getByText(label)).toBeVisible()
  }
  await expect(cases.first().getByRole('link', { name: 'Visit Sowtek' })).toHaveAttribute('href', 'https://sowtek.com/')
})

test('more projects excludes the case studies and marks offline sites', async ({ page }) => {
  const grid = page.locator('.project-grid')
  await expect(grid.locator('li')).toHaveCount(8)
  await expect(grid.getByText('Sowtek')).toHaveCount(0)
  await expect(grid.locator('.is-archived')).toContainText('No longer online')
})

test('experience shows five roles, then all ten', async ({ page }) => {
  const jobs = page.locator('.job')
  await expect(jobs).toHaveCount(5)
  await expect(jobs.first()).toContainText('Merit Incentives')
  await expect(jobs.first()).toContainText('Current')
  await page.getByRole('button', { name: 'Show all 10 roles' }).click()
  await expect(jobs).toHaveCount(10)
  await expect(jobs.last()).toContainText('NCIT Solutions')
})

test('time-zone overlap answers for the chosen city', async ({ page }) => {
  const out = page.locator('.live-out')
  // The suite runs in Berlin time: Amman is one or two hours ahead, depending on DST.
  await expect(out).toHaveText(/^[78] shared hours$/)
  await page.getByLabel('Your city').selectOption({ label: 'San Francisco' })
  await expect(out).toHaveText('no shared hours')
  await expect(page.locator('.row-note')).toContainText('don’t meet')
  await page.getByLabel('Your city').selectOption({ label: 'Amman' })
  await expect(out).toHaveText('9 shared hours')
})

test('a visitor on Amman time starts from a city abroad', async ({ browser }, testInfo) => {
  const ctx = await browser.newContext({ ...testInfo.project.use, timezoneId: 'Asia/Amman' })
  const page = await ctx.newPage()
  await page.goto('/')
  await expect(page.getByLabel('Your city')).toHaveValue('Europe/Berlin')
  await ctx.close()
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
