import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const articleImageMetadata: Record<
  string,
  { width: number; height: number; sizes: string; className?: string }
> = {
  "/content/work/gullak-product-teardown/user-personas.png": {
    width: 600,
    height: 400,
    sizes: "(max-width: 620px) calc(100vw - 16px), (max-width: 632px) calc(100vw - 32px), 600px",
    className: "article-image--native-600",
  },
  "/content/work/gullak-product-teardown/user-journey.png": {
    width: 727,
    height: 400,
    sizes: "(max-width: 620px) calc(100vw - 16px), (max-width: 759px) calc(100vw - 32px), 727px",
    className: "article-image--native-727",
  },
  "/content/work/gullak-product-teardown/play-store-reviews.png": {
    width: 600,
    height: 400,
    sizes: "(max-width: 620px) calc(100vw - 16px), (max-width: 632px) calc(100vw - 32px), 600px",
    className: "article-image--native-600",
  },
  "/content/work/ai-benchmarks-guide/mmlu-class-5.jpeg": {
    width: 577,
    height: 433,
    sizes: "(max-width: 620px) calc(100vw - 16px), (max-width: 609px) calc(100vw - 32px), 577px",
    className: "article-image--native-577",
  },
  "/content/work/ai-benchmarks-guide/prompt-injection.jpeg": {
    width: 700,
    height: 429,
    sizes: "(max-width: 620px) calc(100vw - 16px), (max-width: 732px) calc(100vw - 32px), 700px",
    className: "article-image--native-700",
  },
  "/content/work/ai-benchmarks-guide/cost-per-resolution.png": {
    width: 1672,
    height: 941,
    sizes: "(max-width: 767px) calc(100vw - 32px), 820px",
  },
}

export function MarkdownContent({ body }: { body: string }) {
  return (
    <div className="article-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href = "", children }) => {
            const external = /^https?:\/\//.test(href)
            return (
              <Link href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                {children}
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </Link>
            )
          },
          p: ({ node, children }) => {
            const nodes = (node?.children ?? []).filter(
              (child) => !(child.type === "text" && child.value.trim() === ""),
            )
            const imageRow = nodes.length > 1 && nodes.every((child) => child.type === "element" && child.tagName === "img")

            return imageRow ? <span className="article-image-row">{children}</span> : <p>{children}</p>
          },
          img: ({ src = "", alt = "" }) => {
            const metadata = articleImageMetadata[src]
            const className = ["article-image", metadata?.className].filter(Boolean).join(" ")

            return (
              <span className={className}>
                <Image
                  src={src}
                  alt={alt}
                  width={metadata?.width ?? 1600}
                  height={metadata?.height ?? 1000}
                  sizes={metadata?.sizes ?? "(max-width: 767px) calc(100vw - 32px), 820px"}
                />
                {alt && <span className="article-image__caption">{alt}</span>}
              </span>
            )
          },
          table: ({ children }) => (
            <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable data table">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  )
}
