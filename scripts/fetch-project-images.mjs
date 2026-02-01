/**
 * Fetches each project URL, extracts og:image (or twitter:image), and saves to public/images/projects/
 * Run: node scripts/fetch-project-images.mjs
 */

import { writeFile, mkdir } from 'fs/promises'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { Readable } from 'stream'
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
]

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

function extractOgImage(html, baseUrl) {
  const base = new URL(baseUrl)
  // property="og:image" content="..." or content="..." property="og:image"
  const re1 = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
  const re2 = /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
  const re3 = /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
  const re4 = /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i
  for (const re of [re1, re2, re3, re4]) {
    const m = html.match(re)
    if (m) {
      const url = m[1].trim()
      if (url.startsWith('http')) return url
      return new URL(url, base).href
    }
  }
  return null
}

function getExtension(url) {
  try {
    const pathname = new URL(url).pathname
    const ext = pathname.split('.').pop()?.toLowerCase()
    if (ext && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return ext
  } catch (_) {}
  return 'jpg'
}

async function downloadImage(url, filepath) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const stream = Readable.fromWeb(res.body)
  const dest = createWriteStream(filepath)
  await pipeline(stream, dest)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  for (const { id, url } of PROJECTS) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } })
      const html = await res.text()
      const imgUrl = extractOgImage(html, url)
      if (!imgUrl) {
        console.log(`[${id}] No og:image found: ${url}`)
        continue
      }
      const ext = getExtension(imgUrl)
      const filepath = join(OUT_DIR, `${id}.${ext}`)
      await downloadImage(imgUrl, filepath)
      console.log(`[${id}] Saved ${filepath}`)
    } catch (err) {
      console.error(`[${id}] ${err.message}`)
    }
  }
}

main()
