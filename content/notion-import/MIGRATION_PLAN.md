# Native content migration plan

## Outcome

Replace every public-facing Notion redirect in the portfolio with a statically generated page on the portfolio domain. Notion is used only as the one-time import source; the production site must not fetch from Notion at request time.

The current import contains:

- 13 public documents: 3 project case studies, 5 product/strategy articles, and 5 dance/community stories.
- 398 Notion content blocks.
- 43 locally downloaded assets, including 5 PDFs, with no failed downloads.
- 2 embedded Notion databases converted into Markdown tables (14 rows total).
- Figma and other external links preserved as normal outbound links.
- No unsupported Notion block types remaining in the inventory.

The detailed machine-readable audit is in `inventory.json`. Each document has an `index.md`, `assets.json`, and local `assets/` directory.

## Recommended information architecture

Keep three content types because they need different framing and calls to action:

1. `/projects/[slug]` — portfolio case studies with role, problem, process, artifacts, outcomes, and prototype links.
2. `/blog/[slug]` — authored product/strategy writing with publication metadata and related posts.
3. `/dance/[slug]` — performances, community work, and product explorations related to movement.

The home page cards should use internal Next.js links and open in the same tab. External prototype/source links inside an article may still open in a new tab.

## Proposed native routes

| Section | Route | Imported title |
| --- | --- | --- |
| Project | `/projects/ott-for-bharat` | Lok Learn - an OTT for Bharat |
| Project | `/projects/defigpt-crypto-traders` | Defi GPT: from blockchain noise to actionable insights |
| Project | `/projects/kphealth` | KPHealth - a Health app for Kaiser Permanente |
| Blog | `/blog/qikfox-feature-enhancement` | Navigating the Product Maze: A Guide to Being an Outstanding Product Manager |
| Blog | `/blog/parentry-feature-enhancement` | Product Management (Parentry.app) Challenge |
| Blog | `/blog/anti-sniping-anti-rug-pull-tool` | Anti-Sniper and rug pull tool |
| Blog | `/blog/favorite-product-breakdown` | Favourite Product breakdown |
| Blog | `/blog/porters-five-for-crypto` | Porter’s 5 for Crypto industry |
| Dance | `/dance/olga-meos-tribal-kazakhstan-2025` | Performed with Olga Meos at Tribal Kazakhstan 2025 |
| Dance | `/dance/ode-to-resilience-nrityakosh` | Performed at NrityaKosh, Bengaluru |
| Dance | `/dance/tribal-revival-2025` | Performed and collaborated at Tribal Revival, Bengaluru 2025 |
| Dance | `/dance/tfbd-map-community-building` | TFBD Map |
| Dance | `/dance/movement-meditation` | Dance Meditation |

## Content model

Use local Markdown for the body and a small typed content registry for cards and metadata. Suggested fields:

```ts
type ContentEntry = {
  type: "project" | "blog" | "dance"
  slug: string
  title: string
  cardTitle: string
  summary: string
  publishedAt?: string
  updatedAt?: string
  tags: string[]
  cover: string
  featured?: boolean
  role?: string
  sourceNotionId?: string // migration traceability only; never rendered
}
```

The existing imported frontmatter already provides title, card title, slug, section, source ID, and timestamps. Add editorial summaries, tags, cover selection, and project-specific role/outcome fields during cleanup.

## Implementation shape for this Next.js app

The repository uses Next.js 15 with the App Router. A low-complexity native setup is:

- `content/` for final Markdown files.
- `public/content/<section>/<slug>/` for final images and downloads.
- `lib/content.ts` for typed metadata, file loading, sorting, and related-content selection.
- `react-markdown`, `remark-gfm`, and `gray-matter` for server-rendered Markdown, tables, and frontmatter.
- `app/blog/[slug]/page.tsx`, `app/projects/[slug]/page.tsx`, and `app/dance/[slug]/page.tsx` for statically generated routes.
- A shared article shell for breadcrumbs, cover, metadata, responsive prose, media, next/previous navigation, and related items.
- `generateStaticParams` and `generateMetadata` for static builds, canonical URLs, Open Graph images, and share previews.

Avoid using the unofficial Notion API in production. The checked-in Markdown and local assets make builds deterministic, remove expiring media URLs, and keep the site available if a Notion page is renamed or unpublished.

## Editorial decisions before implementation

1. The home-page label “Feature enhancement | Qikfox” points to a short article titled “Navigating the Product Maze.” Its attached six-page PDF is the third-party “Good Product Manager / Bad Product Manager” essay, not a Qikfox case study. Rename the card/route to match the article, or provide the intended Qikfox document.
2. Standardize “DeCrypt,” “DefiGPT,” and “Defi GPT” to one product name and canonical slug.
3. Decide whether Parentry and the anti-sniping tool belong under Projects instead of Blog; both read like product case studies.
4. Standardize spelling and display titles, including “Favourite/Favorite” and “Kazakhstan” (currently “Kazaksthan” in the source).
5. Decide whether the five imported PDFs are primary artifacts shown as download cards, or source material that should remain available but secondary.
6. The three shortest dance entries are closer to visual notes than long-form articles; use a compact story template or enrich them before launch.

## Delivery sequence

1. Editorial cleanup: resolve title/taxonomy decisions, summaries, tags, and the cover used for each card.
2. Content foundation: move approved Markdown/assets into their final directories and add the typed registry and loader.
3. Templates: build the shared article shell plus project, blog, and dance variants.
4. Navigation: replace the 13 Notion `href` values in `app/page.tsx` with native routes and remove external-link treatment from internal cards.
5. Quality: responsive checks, image optimization, accessible captions, table overflow, PDF download behavior, metadata, sitemap, and broken-link tests.
6. Release: preview deploy on Vercel, compare every native page with its Notion source, then publish.

## Definition of done

- No portfolio card or “Read full blog” action redirects to Notion.
- All 13 documents have native, crawlable URLs on the portfolio domain.
- All page-critical images and downloadable files are served by the portfolio deployment.
- Figma and cited sources remain explicit outbound links.
- Every route has a title, description, canonical URL, social image, and useful empty/404 behavior.
- Mobile typography, wide tables, and image galleries have been visually verified.
