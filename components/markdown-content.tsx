import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

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
          img: ({ src = "", alt = "" }) => (
            <span className="article-image">
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={1000}
                sizes="(max-width: 767px) calc(100vw - 32px), 820px"
              />
              {alt && <span className="article-image__caption">{alt}</span>}
            </span>
          ),
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
