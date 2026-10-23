"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { ElectricBorder } from "@/components/electric-border"
import type { LiveLink } from "@/lib/content"

// Floats over the first half of the page, then tucks away so it doesn't cover the ending.
export function LiveNotice({ link }: { link: LiveLink }) {
  const [shown, setShown] = useState(true)

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setShown(scrollable <= 0 || window.scrollY / scrollable < 0.5)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div className={`live-notice${shown ? "" : " live-notice--hidden"}`} aria-hidden={!shown}>
      <ElectricBorder
        className="live-notice__frame"
        colors={["#2f6bff", "#ff2d55"]}
        borderRadius={18}
        chaos={0.6}
        glow={0.9}
        intro={false}
      >
        <p className="live-notice__inner">
          <span>{link.label}</span>{" "}
          <a href={link.href} target="_blank" rel="noreferrer" tabIndex={shown ? undefined : -1}>
            {link.href.replace(/^https:\/\//, "").replace(/\/$/, "")}
            <ArrowUpRight aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </ElectricBorder>
    </div>
  )
}
