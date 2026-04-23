import { mkdir } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { chromium } from "playwright"

const [, , routeArg = "/zh/resume-pdf", outputArg = "public/resume/front-end-engineer_fan-wang.pdf"] =
  process.argv

const route = routeArg.startsWith("/") ? routeArg : `/${routeArg}`
const outputPath = path.resolve(process.cwd(), outputArg)
const baseUrl = process.env.RESUME_PDF_BASE_URL ?? "http://127.0.0.1:4321"
const url = new URL(route, baseUrl).toString()

await mkdir(path.dirname(outputPath), { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage()

await page.goto(url, { waitUntil: "networkidle" })
await page.emulateMedia({ media: "print" })
await page.pdf({
  path: outputPath,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
})

await browser.close()

console.log(`Exported PDF: ${outputPath}`)
