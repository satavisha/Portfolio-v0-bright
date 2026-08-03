#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

const OUTPUT_ROOT = path.resolve("content/notion-import")
const NOTION_ENDPOINT = "https://www.notion.so/api/v3/loadPageChunk"
const NOTION_SIGNED_FILES_ENDPOINT = "https://www.notion.so/api/v3/getSignedFileUrls"

const documents = [
  {
    section: "projects",
    slug: "ott-for-bharat",
    cardTitle: "OTT For Bharat",
    sourceUrl:
      "https://satavisha.notion.site/Lok-Learn-an-OTT-for-Bharat-20c0d6f642c280db872bfa0a675ff0f8",
    pageId: "20c0d6f6-42c2-80db-872b-fa0a675ff0f8",
  },
  {
    section: "projects",
    slug: "defigpt-crypto-traders",
    cardTitle: "DefiGPT: an AI powered tool for Crypto traders",
    sourceUrl:
      "https://satavisha.notion.site/DeCrypt-an-AI-powered-tool-for-Crypto-traders-20c0d6f642c2800094e6c803c5060f39",
    pageId: "20c0d6f6-42c2-8000-94e6-c803c5060f39",
  },
  {
    section: "projects",
    slug: "kphealth",
    cardTitle: "KPHealth - a Health app for Kaiser Permanente",
    sourceUrl:
      "https://satavisha.notion.site/KPHealth-a-Health-app-for-Kaiser-Permanente-e93e6093cc1c478b90607728e8c18943",
    pageId: "e93e6093-cc1c-478b-9060-7728e8c18943",
  },
  {
    section: "blogs",
    slug: "qikfox-feature-enhancement",
    cardTitle: "Feature enhancement | Qikfox",
    sourceUrl:
      "https://satavisha.notion.site/Navigating-the-Product-Maze-A-Guide-to-Being-an-Outstanding-Product-Manager-5b0eea81c36b425797c9da317c927b13",
    pageId: "5b0eea81-c36b-4257-97c9-da317c927b13",
  },
  {
    section: "blogs",
    slug: "parentry-feature-enhancement",
    cardTitle: "Parentry.com feature enhancement | CoinedOne",
    sourceUrl:
      "https://satavisha.notion.site/Product-Management-Parentry-app-Challenge-CoinedOne-7189c474fa8e4e1798d8edd51db111e2",
    pageId: "7189c474-fa8e-4e17-98d8-edd51db111e2",
  },
  {
    section: "blogs",
    slug: "anti-sniping-anti-rug-pull-tool",
    cardTitle: "Anti-sniping anti-rug pull tool for crypto launchpads",
    sourceUrl:
      "https://satavisha.notion.site/Anti-Sniper-and-rug-pull-tool-2400d6f642c280c2b45ffaf08dc74d45?source=copy_link",
    pageId: "2400d6f6-42c2-80c2-b45f-faf08dc74d45",
  },
  {
    section: "blogs",
    slug: "favorite-product-breakdown",
    cardTitle: "Favorite product breakdown",
    sourceUrl:
      "https://satavisha.notion.site/Favourite-Product-breakdown-b37c68d85aaa4ca880be504778edb400?source=copy_link",
    pageId: "b37c68d8-5aaa-4ca8-80be-504778edb400",
  },
  {
    section: "blogs",
    slug: "porters-five-for-crypto",
    cardTitle: "Porter's 5 for Crypto industry",
    sourceUrl:
      "https://satavisha.notion.site/Porter-s-5-for-Crypto-industry-84a59bcba0324b3f8ae135733a5b9f52",
    pageId: "84a59bcb-a032-4b3f-8ae1-35733a5b9f52",
  },
  {
    section: "dance",
    slug: "olga-meos-tribal-kazakhstan-2025",
    cardTitle: "Performed with Olga Meos at Tribal Kazakhstan 2025",
    sourceUrl:
      "https://satavisha.notion.site/Performed-with-the-legendary-Olga-Meos-at-Tribal-Kazaksthan-2025-20c0d6f642c280369d8cc128e4ec71d9",
    pageId: "20c0d6f6-42c2-8036-9d8c-c128e4ec71d9",
  },
  {
    section: "dance",
    slug: "ode-to-resilience-nrityakosh",
    cardTitle: "An ode to Resilience",
    sourceUrl:
      "https://satavisha.notion.site/Performed-at-NrityaKosh-Bengaluru-2070d6f642c2808eaba1ce3b91a3fcd1",
    pageId: "2070d6f6-42c2-808e-aba1-ce3b91a3fcd1",
  },
  {
    section: "dance",
    slug: "tribal-revival-2025",
    cardTitle: "Tribal Revival 2025",
    sourceUrl:
      "https://satavisha.notion.site/Performed-and-collaborated-at-Tribal-Revival-Bengaluru-2025-20c0d6f642c280b180c1c915da2b0f60",
    pageId: "20c0d6f6-42c2-80b1-80c1-c915da2b0f60",
  },
  {
    section: "dance",
    slug: "tfbd-map-community-building",
    cardTitle: "Community building in TFBD via TFBD Map",
    sourceUrl:
      "https://satavisha.notion.site/TFBD-Map-23d0d6f642c2803fb8aaed5d4abb0a01",
    pageId: "23d0d6f6-42c2-803f-b8aa-ed5d4abb0a01",
  },
  {
    section: "dance",
    slug: "movement-meditation",
    cardTitle: "Movement Meditation",
    sourceUrl:
      "https://satavisha.notion.site/Dance-Meditation-20c0d6f642c28009869fff538aff9080?pvs=74",
    pageId: "20c0d6f6-42c2-8009-869f-ff538aff9080",
  },
]

function unwrapRecord(record) {
  return record?.value?.value ?? record?.value ?? null
}

function plainText(richText = []) {
  return richText.map((segment) => String(segment?.[0] ?? "")).join("")
}

function escapeMarkdown(text) {
  return text.replaceAll("\\", "\\\\").replaceAll("[", "\\[").replaceAll("]", "\\]")
}

function richTextToMarkdown(richText = [], links) {
  return richText
    .map((segment) => {
      let text = String(segment?.[0] ?? "")
      const decorations = Array.isArray(segment?.[1]) ? segment[1] : []

      for (const decoration of decorations) {
        const kind = decoration?.[0]
        const value = decoration?.[1]

        if (kind === "a" && typeof value === "string") {
          links.add(value)
          text = `[${escapeMarkdown(text)}](${value})`
        } else if (kind === "b") {
          text = `**${text}**`
        } else if (kind === "i") {
          text = `*${text}*`
        } else if (kind === "c") {
          text = `\`${text}\``
        } else if (kind === "s") {
          text = `~~${text}~~`
        }
      }

      return text
    })
    .join("")
}

function getPropertyText(block, property = "title") {
  return plainText(block?.properties?.[property] ?? [])
}

function getPropertyMarkdown(block, links, property = "title") {
  return richTextToMarkdown(block?.properties?.[property] ?? [], links)
}

function getSource(block) {
  return (
    plainText(block?.properties?.source ?? []) ||
    block?.format?.original_url ||
    block?.format?.uri ||
    block?.format?.display_source ||
    ""
  )
}

function embedLabel(block) {
  const attribute = block?.format?.attributes?.find((item) => item.id === "title")
  return getPropertyText(block) || attribute?.values?.[0] || (block.type === "figma" ? "Open Figma prototype" : "Open embed")
}

function cleanEmbedUrl(source) {
  try {
    const url = new URL(source)
    if (url.pathname.includes("/embed") && url.searchParams.has("url")) {
      return url.searchParams.get("url") || source
    }
  } catch {
    return source
  }
  return source
}

function extensionFromSource(source, fallback = ".bin") {
  const clean = source.split("?")[0]
  const attachmentName = clean.startsWith("attachment:") ? clean.split(":").slice(2).join(":") : clean
  const extension = path.extname(attachmentName).toLowerCase()
  return extension && extension.length <= 8 ? extension : fallback
}

function notionAssetUrl(block, source) {
  if (!source) return ""
  if (source.startsWith("data:")) return source
  if (source.startsWith("/")) return `https://www.notion.so${source}`

  const spaceId = block.space_id || block.spaceId || ""
  const query = new URLSearchParams({
    table: "block",
    id: block.id,
    spaceId,
    width: "2000",
    userId: "",
    cache: "v2",
  })

  return `https://satavisha.notion.site/image/${encodeURIComponent(source)}?${query}`
}

function addAsset(context, block, { kind, caption, source, preferredName }) {
  if (!source) return null

  const existing = context.assets.find((asset) => asset.blockId === block.id && asset.source === source)
  if (existing) return existing

  const index = context.assets.length + 1
  const extension = extensionFromSource(source, kind === "file" ? ".bin" : ".jpg")
  const filename = preferredName || `${String(index).padStart(2, "0")}-${block.id}${extension}`
  const asset = {
    blockId: block.id,
    kind,
    caption,
    source,
    fetchUrl: kind === "file" && source.startsWith("http") ? source : notionAssetUrl(block, source),
    proposedLocalPath: `assets/${filename}`,
  }
  context.assets.push(asset)
  return asset
}

function collectPageProperties(root, context, notionTitle) {
  const cover = root?.format?.page_cover
  if (cover) {
    addAsset(context, root, {
      kind: "cover",
      caption: `${notionTitle} cover`,
      source: cover,
      preferredName: `00-cover${extensionFromSource(cover, ".jpg")}`,
    })
  }

  for (const richText of Object.values(root?.properties || {})) {
    for (const segment of richText || []) {
      const label = String(segment?.[0] ?? "File")
      const decorations = Array.isArray(segment?.[1]) ? segment[1] : []
      for (const decoration of decorations) {
        if (decoration?.[0] !== "a" || typeof decoration?.[1] !== "string") continue
        const source = decoration[1]
        if (source.startsWith("attachment:") || /\.(pdf|docx?|pptx?|xlsx?|zip)(\?|$)/i.test(source)) {
          addAsset(context, root, { kind: "file", caption: label, source })
        } else {
          context.links.add(source)
        }
      }
    }
  }
}

function blockToMarkdown(block, context, depth = 0) {
  const { assets, links, unsupported } = context
  const title = getPropertyMarkdown(block, links)
  const source = getSource(block)
  const indent = "  ".repeat(depth)

  switch (block.type) {
    case "header":
      return `## ${title}`
    case "sub_header":
      return `### ${title}`
    case "sub_sub_header":
      return `#### ${title}`
    case "text":
      return title
    case "bulleted_list":
      return `${indent}- ${title}`
    case "numbered_list":
      return `${indent}1. ${title}`
    case "quote":
    case "callout":
      return title
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n")
    case "divider":
      return "---"
    case "code": {
      const language = plainText(block?.properties?.language ?? [])
      return `\`\`\`${language}\n${getPropertyText(block)}\n\`\`\``
    }
    case "equation":
      return `$$\n${title}\n$$`
    case "toggle":
      return `#### ${title}`
    case "image": {
      const caption = getPropertyText(block, "caption") || getPropertyText(block) || `Image ${assets.length + 1}`
      const asset = addAsset(context, block, { kind: "image", caption, source })
      return asset ? `![${escapeMarkdown(caption)}](./${asset.proposedLocalPath})` : ""
    }
    case "video":
    case "audio":
    case "file":
    case "pdf": {
      const label = getPropertyText(block) || `${block.type} ${assets.length + 1}`
      const asset = addAsset(context, block, {
        kind: block.type === "file" || block.type === "pdf" ? "file" : block.type,
        caption: label,
        source,
      })
      return asset ? `[${escapeMarkdown(label)}](./${asset.proposedLocalPath})` : ""
    }
    case "embed":
    case "bookmark":
    case "link_preview":
    case "figma":
    case "external_object_instance":
      if (source) {
        const url = cleanEmbedUrl(source)
        links.add(url)
        return `[${escapeMarkdown(embedLabel(block))}](${url})`
      }
      return title
    case "collection_view":
    case "collection_view_page": {
      const collection = context.collections.get(block.id)
      if (collection) return collection.markdown
      unsupported.add(block.type)
      return "<!-- Embedded Notion collection could not be fetched -->"
    }
    case "column_list":
    case "column":
    case "table":
    case "table_row":
    case "transclusion_container":
    case "transclusion_reference":
      return ""
    case "page":
      return title ? `# ${title}` : ""
    default:
      unsupported.add(block.type || "unknown")
      return title ? `<!-- Notion ${block.type || "unknown"} block -->\n${title}` : ""
  }
}

function walkPage(pageId, blocks, context) {
  const root = blocks.get(pageId)
  const lines = []
  const visited = new Set()

  function visit(blockId, depth = 0) {
    if (visited.has(blockId)) return
    visited.add(blockId)

    const block = blocks.get(blockId)
    if (!block || block.alive === false) return

    context.blockTypes.set(block.type, (context.blockTypes.get(block.type) || 0) + 1)
    if (blockId !== pageId) {
      const markdown = blockToMarkdown(block, context, depth)
      if (markdown.trim()) lines.push(markdown.trimEnd())
    }

    const childDepth = ["bulleted_list", "numbered_list"].includes(block.type) ? depth + 1 : depth
    for (const childId of block.content || []) visit(childId, childDepth)
  }

  for (const childId of root?.content || []) visit(childId)
  return lines.join("\n\n").replace(/\n{3,}/g, "\n\n").trim()
}

async function fetchPage(pageId) {
  const response = await fetch(NOTION_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; portfolio-content-import/1.0)",
    },
    body: JSON.stringify({
      pageId,
      limit: 100,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false,
    }),
  })

  if (!response.ok) throw new Error(`Notion returned ${response.status} ${response.statusText}`)
  return response.json()
}

function reachableBlockIds(pageId, blocks) {
  const ids = []
  const visited = new Set()

  function visit(blockId) {
    if (visited.has(blockId)) return
    visited.add(blockId)
    const block = blocks.get(blockId)
    if (!block || block.alive === false) return
    ids.push(blockId)
    for (const childId of block.content || []) visit(childId)
  }

  visit(pageId)
  return ids
}

function markdownCell(value) {
  return value.replaceAll("|", "\\|").replaceAll("\n", "<br>")
}

function collectionToMarkdown(collection, view, rows) {
  const schema = collection?.schema || {}
  const viewProperties =
    view?.format?.table_properties || view?.format?.list_properties || view?.format?.gallery_properties || []
  let propertyIds = viewProperties
    .filter((property) => property.visible !== false && schema[property.property])
    .map((property) => property.property)

  if (!propertyIds.includes("title")) propertyIds.unshift("title")
  if (propertyIds.length === 1) {
    propertyIds = ["title", ...Object.keys(schema).filter((propertyId) => propertyId !== "title")]
  }

  const headers = propertyIds.map((propertyId) => schema[propertyId]?.name || propertyId)
  const lines = [
    `| ${headers.map(markdownCell).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
  ]

  for (const row of rows) {
    lines.push(
      `| ${propertyIds
        .map((propertyId) => markdownCell(plainText(row?.properties?.[propertyId] || [])))
        .join(" | ")} |`,
    )
  }

  return lines.join("\n")
}

async function fetchCollection(collectionId, collectionViewId, view) {
  const query = view?.query2 || view?.query || {}
  const response = await fetch("https://www.notion.so/api/v3/queryCollection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; portfolio-content-import/1.0)",
    },
    body: JSON.stringify({
      collection: { id: collectionId },
      collectionView: { id: collectionViewId },
      loader: {
        type: "reducer",
        reducers: {
          collection_group_results: { type: "results", limit: 999999, loadContentCover: true },
          "table:uncategorized:title:count": {
            type: "aggregation",
            aggregation: { property: "title", aggregator: "count" },
          },
        },
        ...query,
        searchQuery: "",
        userTimeZone: "Asia/Kolkata",
      },
    }),
  })

  if (!response.ok) throw new Error(`Notion collection returned ${response.status} ${response.statusText}`)
  return response.json()
}

async function hydrateCollections(pageId, blocks, recordMap, context) {
  const collections = new Map(
    Object.entries(recordMap?.collection || {})
      .map(([id, record]) => [id, unwrapRecord(record)])
      .filter(([, collection]) => Boolean(collection)),
  )
  const views = new Map(
    Object.entries(recordMap?.collection_view || {})
      .map(([id, record]) => [id, unwrapRecord(record)])
      .filter(([, view]) => Boolean(view)),
  )

  for (const blockId of reachableBlockIds(pageId, blocks)) {
    const block = blocks.get(blockId)
    if (!["collection_view", "collection_view_page"].includes(block?.type)) continue

    const collectionId = block.collection_id || block?.format?.collection_pointer?.id
    const collectionViewId = block.view_ids?.[0]
    const collection = collections.get(collectionId)
    const view = views.get(collectionViewId)
    if (!collectionId || !collectionViewId || !collection || !view) continue

    try {
      const payload = await fetchCollection(collectionId, collectionViewId, view)
      const result = payload?.result?.reducerResults?.collection_group_results
      const rowIds = result?.blockIds || result?.results?.map((item) => item.blockId) || []
      const rowBlocks = new Map(
        Object.entries(payload?.recordMap?.block || {})
          .map(([id, record]) => [id, unwrapRecord(record)])
          .filter(([, row]) => Boolean(row)),
      )
      const rows = rowIds.map((rowId) => rowBlocks.get(rowId)).filter(Boolean)
      context.collections.set(blockId, {
        collectionId,
        collectionViewId,
        name: plainText(collection.name || []),
        rowCount: rows.length,
        markdown: collectionToMarkdown(collection, view, rows),
      })
    } catch (error) {
      context.collectionWarnings.push({ blockId, collectionId, collectionViewId, error: error.message })
    }
  }
}

async function signFileAssets(assets) {
  const files = assets.filter((asset) => asset.kind === "file" && asset.source)
  if (files.length === 0) return

  try {
    const response = await fetch(NOTION_SIGNED_FILES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-content-import/1.0)",
      },
      body: JSON.stringify({
        urls: files.map((asset) => ({
          permissionRecord: { table: "block", id: asset.blockId },
          url: asset.source,
        })),
      }),
    })
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)

    const payload = await response.json()
    if (!Array.isArray(payload.signedUrls) || payload.signedUrls.length !== files.length) {
      throw new Error("Notion returned an incomplete signed URL response")
    }
    files.forEach((asset, index) => {
      asset.fetchUrl = payload.signedUrls[index]
    })
  } catch (error) {
    files.forEach((asset) => {
      asset.signingWarning = error.message
    })
  }
}

async function downloadAssets(outputDirectory, assets) {
  if (assets.length === 0) return

  await mkdir(path.join(outputDirectory, "assets"), { recursive: true })
  for (const asset of assets) {
    if (!asset.fetchUrl) {
      asset.download = { status: "missing-url" }
      continue
    }

    try {
      const response = await fetch(asset.fetchUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-content-import/1.0)" },
      })
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)

      const bytes = Buffer.from(await response.arrayBuffer())
      await writeFile(path.join(outputDirectory, asset.proposedLocalPath), bytes)
      asset.download = {
        status: "ok",
        bytes: bytes.length,
        contentType: response.headers.get("content-type"),
      }
    } catch (error) {
      asset.download = { status: "error", error: error.message }
    }
  }

  for (const asset of assets) {
    delete asset.fetchUrl
    delete asset.signingWarning
  }
}

function frontmatterValue(value) {
  return JSON.stringify(value ?? "")
}

async function fetchDocument(document) {
  const payload = await fetchPage(document.pageId)
  const blockRecords = payload?.recordMap?.block || {}
  const blocks = new Map(
    Object.entries(blockRecords)
      .map(([id, record]) => [id, unwrapRecord(record)])
      .filter(([, block]) => Boolean(block)),
  )
  const root = blocks.get(document.pageId)

  if (!root) throw new Error("Root page block was not returned; the page may not be public")

  const context = {
    assets: [],
    links: new Set(),
    unsupported: new Set(),
    blockTypes: new Map(),
    collections: new Map(),
    collectionWarnings: [],
  }
  const notionTitle = getPropertyText(root) || document.cardTitle
  collectPageProperties(root, context, notionTitle)
  await hydrateCollections(document.pageId, blocks, payload.recordMap, context)
  const body = walkPage(document.pageId, blocks, context)
  await signFileAssets(context.assets)
  const categories = Object.entries(root.properties || {})
    .filter(([key]) => key !== "title")
    .map(([key, value]) => ({ key, value: plainText(value) }))
    .filter((property) => property.value)
  const outputDirectory = path.join(OUTPUT_ROOT, document.section, document.slug)
  const markdown = [
    "---",
    `title: ${frontmatterValue(notionTitle)}`,
    `cardTitle: ${frontmatterValue(document.cardTitle)}`,
    `slug: ${frontmatterValue(document.slug)}`,
    `section: ${frontmatterValue(document.section)}`,
    `sourceUrl: ${frontmatterValue(document.sourceUrl)}`,
    `notionPageId: ${frontmatterValue(document.pageId)}`,
    `createdAt: ${frontmatterValue(root.created_time ? new Date(root.created_time).toISOString() : "")}`,
    `updatedAt: ${frontmatterValue(root.last_edited_time ? new Date(root.last_edited_time).toISOString() : "")}`,
    `assetCount: ${context.assets.length}`,
    "---",
    "",
    `# ${notionTitle}`,
    "",
    body,
    "",
  ].join("\n")

  await mkdir(outputDirectory, { recursive: true })
  await downloadAssets(outputDirectory, context.assets)
  await writeFile(path.join(outputDirectory, "index.md"), markdown, "utf8")
  await writeFile(
    path.join(outputDirectory, "assets.json"),
    `${JSON.stringify(context.assets, null, 2)}\n`,
    "utf8",
  )

  return {
    ...document,
    notionTitle,
    createdAt: root.created_time ? new Date(root.created_time).toISOString() : null,
    updatedAt: root.last_edited_time ? new Date(root.last_edited_time).toISOString() : null,
    markdownPath: path.relative(process.cwd(), path.join(outputDirectory, "index.md")),
    blockCount: [...context.blockTypes.values()].reduce((sum, count) => sum + count, 0),
    blockTypes: Object.fromEntries([...context.blockTypes].sort(([a], [b]) => a.localeCompare(b))),
    assetCount: context.assets.length,
    downloadedAssetCount: context.assets.filter((asset) => asset.download?.status === "ok").length,
    failedAssetCount: context.assets.filter((asset) => asset.download?.status !== "ok").length,
    assets: context.assets,
    externalLinks: [...context.links].sort(),
    unsupportedBlockTypes: [...context.unsupported].sort(),
    embeddedCollections: [...context.collections.values()].map(({ markdown, ...collection }) => collection),
    collectionWarnings: context.collectionWarnings,
    properties: categories,
    fetchComplete: Array.isArray(payload?.cursor?.stack) && payload.cursor.stack.length === 0,
  }
}

async function main() {
  await mkdir(OUTPUT_ROOT, { recursive: true })
  const results = []

  for (const document of documents) {
    process.stdout.write(`Fetching ${document.section}/${document.slug} ... `)
    try {
      const result = await fetchDocument(document)
      results.push({ status: "ok", ...result })
      console.log(`${result.blockCount} blocks, ${result.assetCount} assets`)
    } catch (error) {
      results.push({ status: "error", ...document, error: error.message })
      console.log(`failed: ${error.message}`)
    }
  }

  const inventory = {
    fetchedAt: new Date().toISOString(),
    source: "Public Notion pages linked from app/page.tsx",
    totals: {
      documents: results.length,
      successful: results.filter((result) => result.status === "ok").length,
      failed: results.filter((result) => result.status === "error").length,
      blocks: results.reduce((sum, result) => sum + (result.blockCount || 0), 0),
      assets: results.reduce((sum, result) => sum + (result.assetCount || 0), 0),
    },
    documents: results,
  }

  await writeFile(path.join(OUTPUT_ROOT, "inventory.json"), `${JSON.stringify(inventory, null, 2)}\n`, "utf8")
  console.log(`\nWrote ${path.relative(process.cwd(), OUTPUT_ROOT)}/inventory.json`)

  if (inventory.totals.failed > 0) process.exitCode = 1
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
