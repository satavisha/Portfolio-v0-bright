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
