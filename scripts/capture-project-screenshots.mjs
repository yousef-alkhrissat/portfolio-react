/**
 * Captures landing-page screenshots for each project URL using Playwright.
 * Run: npx playwright install chromium && node scripts/capture-project-screenshots.mjs
 */

import { chromium } from 'playwright'
import { writeFile, mkdir } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'images', 'projects')

const PROJECTS = [
  { id: 'epic-academy', url: 'https://aspire.jo/careers/epic-academy/' },
  { id: 'weight-watchers', url: 'https://www.weightwatchers.com/us' },
  { id: 'scholastic', url: 'https://export.scholastic.com/en' },
  { id: 'zalatimo', url: 'https://zalatimo.com/en' },
  { id: 'himam', url: 'https://hla.himam.com/landing-page' },
  { id: 'hellocode', url: 'https://hellocode.me/en/' },
  { id: 'baaz-portal', url: 'https://www.baaz.com/' },
  { id: 'shooty', url: 'https://shooty.com/' },
  { id: 'sowtek', url: 'https://sowtek.com/' },
  { id: 'point-trader-group', url: 'https://www.pointfxltd.com/' },
  { id: 'yousef-alkhrissat', url: 'https://yousefalkhrissat.com/' },
  { id: 'null-tech', url: 'https://null-tech.net/' },
  { id: 'rateme', url: 'https://rateme.gaztech.io/' },
]

const VIEWPORT = { width: 1280, height: 800 }
const TIMEOUT_MS = 20000

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: VIEWPORT,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ignoreHTTPSErrors: true,
  })

  for (const { id, url } of PROJECTS) {
    const filepath = join(OUT_DIR, `${id}.jpg`)
    try {
      const page = await context.newPage()
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: TIMEOUT_MS,
      })
      await page.waitForTimeout(2000)
      await page.screenshot({
        path: filepath,
        type: 'jpeg',
        quality: 88,
      })
      await page.close()
      console.log(`[${id}] Saved ${filepath}`)
    } catch (err) {
      console.error(`[${id}] ${err.message}`)
    }
  }

  await browser.close()
}

main()
