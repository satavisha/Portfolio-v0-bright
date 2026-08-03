# Satavisha Mitra — Portfolio

A content-first portfolio built with Next.js 15. The public site is fully native: Work and Dance stories are rendered from checked-in Markdown, and all page-critical media and project documents are hosted under public/content.

## Local development

Run pnpm install, then pnpm dev.

## Quality checks

- pnpm validate:content
- pnpm typecheck
- pnpm build

The content validator checks required frontmatter, unique slugs, local assets, artifact links, PDF uniqueness, the published taxonomy, and the absence of public Notion URLs.

Set NEXT_PUBLIC_SITE_URL on preview deployments to generate preview-specific canonical and structured URLs. Production falls back to https://satavisha.xyz.

## Content traceability

Final sources live in content/work and content/dance. The one-time Notion importer, original inventory, imported Markdown, and migration notes remain under scripts/fetch-notion-content.mjs and content/notion-import for traceability only; they are never queried at runtime.
