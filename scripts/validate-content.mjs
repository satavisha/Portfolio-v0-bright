import { createHash } from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const projectRoot = process.cwd()
const contentRoot = path.join(projectRoot, "content")
const publicRoot = path.join(projectRoot, "public")
const sections = ["work", "dance", "drafts"]
const requiredFields = [
  "type", "slug", "title", "subtitle", "summary", "tags", "cover", "coverAlt",
  "createdAt", "updatedAt", "featured", "draft", "artifactLinks",
]
const allowedTypes = new Set(["case-study", "writing", "dance"])
const allowedArtifactKinds = new Set(["pdf", "prototype", "link"])
const publicNotionUrl = /https?:\/\/(?:www\.)?(?:notion\.so|[^/]*notion\.site)/i
const errors = []
const entries = []
const slugs = new Map()

function localPublicFile(url) {
  const cleanPath = decodeURIComponent(url.split(/[?#]/)[0]).replace(/^\/+/, "")
  return path.join(publicRoot, cleanPath)
}

function requireLocalAsset(url, context) {
  if (!url.startsWith("/")) return
  const filePath = localPublicFile(url)
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    errors.push(context + ": local asset does not exist: " + url)
  }
}

for (const section of sections) {
  const directory = path.join(contentRoot, section)
  const files = fs.readdirSync(directory).filter((file) => file.endsWith(".md"))

  for (const file of files) {
    const filePath = path.join(directory, file)
    const source = fs.readFileSync(filePath, "utf8")
    const parsed = matter(source)
    const data = parsed.data
    const content = parsed.content
    const context = section + "/" + file

    for (const field of requiredFields) {
      if (!(field in data)) errors.push(context + ': missing required frontmatter field "' + field + '"')
    }

    if (!allowedTypes.has(data.type)) errors.push(context + ': invalid content type "' + data.type + '"')
    if (section === "work" && data.type === "dance") errors.push(context + ": Dance entry is in the Work directory")
    if (section === "dance" && data.type !== "dance") errors.push(context + ": non-Dance entry is in the Dance directory")
    if (section === "drafts" && data.draft !== true) errors.push(context + ": archived content must have draft: true")
    if (section !== "drafts" && data.draft !== false) errors.push(context + ": published content must have draft: false")
    if (data.slug + ".md" !== file) errors.push(context + ": filename must match slug")
    if (!Array.isArray(data.tags) || data.tags.length === 0) errors.push(context + ": tags must be a non-empty array")
    if (!Array.isArray(data.artifactLinks)) errors.push(context + ": artifactLinks must be an array")
    if (data.cover && !data.coverAlt) errors.push(context + ": coverAlt is required when a cover is provided")

    if (slugs.has(data.slug)) {
      errors.push(context + ": duplicate slug also used by " + slugs.get(data.slug))
    } else {
      slugs.set(data.slug, context)
    }

    if (section !== "drafts" && publicNotionUrl.test(source)) {
      errors.push(context + ": published content contains a public Notion URL")
    }

    if (typeof data.cover === "string") requireLocalAsset(data.cover, context + " cover")

    for (const artifact of data.artifactLinks ?? []) {
      if (!artifact.label || !artifact.href || !allowedArtifactKinds.has(artifact.kind)) {
        errors.push(context + ": invalid artifact link " + JSON.stringify(artifact))
        continue
      }
      if (publicNotionUrl.test(artifact.href)) errors.push(context + ": artifact points to Notion")
      if (artifact.href.startsWith("/")) {
        requireLocalAsset(artifact.href, context + " artifact")
      } else {
        try {
          const url = new URL(artifact.href)
          if (!["http:", "https:"].includes(url.protocol)) throw new Error("invalid protocol")
        } catch {
          errors.push(context + ": invalid external artifact URL " + artifact.href)
        }
      }
    }

    for (const match of content.matchAll(/!?\[[^\]]*\]\((\/[^)\s]+)\)/g)) {
      requireLocalAsset(match[1], context + " Markdown")
    }

    for (const match of content.matchAll(/!\[([^\]]*)\]\([^)]+\)/g)) {
      if (!match[1].trim()) errors.push(context + ": Markdown image is missing alt text")
    }

    entries.push({ section, file, ...data })
  }
}

const published = entries.filter((entry) => entry.section !== "drafts" && !entry.draft)
const work = published.filter((entry) => entry.section === "work")
const dance = published.filter((entry) => entry.section === "dance")

if (published.length !== 12) errors.push("Expected 12 published entries, found " + published.length)
if (work.length !== 7) errors.push("Expected 7 Work entries, found " + work.length)
if (dance.length !== 5) errors.push("Expected 5 Dance entries, found " + dance.length)
if (work.filter((entry) => entry.type === "case-study").length !== 5) errors.push("Expected 5 case studies")
if (work.filter((entry) => entry.type === "writing").length !== 2) errors.push("Expected 2 writing entries")
if (work.some((entry) => entry.slug.includes("qikfox"))) errors.push("Qikfox must not be published")

const publicContentRoot = path.join(publicRoot, "content")
const pdfs = []
function collectPdfs(directory) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const itemPath = path.join(directory, item.name)
    if (item.isDirectory()) collectPdfs(itemPath)
    else if (item.name.endsWith(".pdf")) pdfs.push(itemPath)
  }
}
collectPdfs(publicContentRoot)

if (pdfs.length !== 3) errors.push("Expected exactly 3 promoted project PDFs, found " + pdfs.length)
const pdfHashes = pdfs.map((file) => createHash("sha256").update(fs.readFileSync(file)).digest("hex"))
if (new Set(pdfHashes).size !== pdfHashes.length) errors.push("Promoted project PDFs include a duplicate")

if (errors.length > 0) {
  console.error("Content validation failed with " + errors.length + " error(s):")
  for (const error of errors) console.error("- " + error)
  process.exit(1)
}

console.log("Content validation passed: " + published.length + " published entries, " + pdfs.length + " unique PDFs, and no public Notion URLs.")
