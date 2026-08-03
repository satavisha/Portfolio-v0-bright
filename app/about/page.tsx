import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description: "About Satavisha Mitra — product manager, Tribal Fusion Belly Dancer, dance educator, and mythology enthusiast.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About — Satavisha Mitra", url: "/about", images: ["/images/profile.jpeg"] },
}

export default function AboutPage() {
  return (
    <main className="about-page page-enter">
      <header className="about-hero">
        <div className="about-hero__copy">
          <p className="kicker"><span>About</span> Product × Movement</p>
          <h1>Curious about systems.<br /><em>Moved by stories.</em></h1>
          <div className="about-intro">
            <p>
              I’m a developer turned product manager. I bring technical understanding into product strategy and enjoy working from research and problem framing through product definition and prototyping.
            </p>
            <p>
              I’m also a Tribal Fusion Belly Dancer, dance educator, and mythology nerd. Raised in a culturally rich home by an Indian classical singer, I was immersed in the arts early — painting, piano, and, eventually, the form that moved me most: dance.
            </p>
            <p>
              Since discovering Tribal Fusion in 2016, my journey has taken me across India and beyond to learn, perform, and teach. It still feels like a magical forest whose edges I’m only beginning to explore.
            </p>
            <p>
              Outside dance, I love mythology, Devdutt Pattanaik’s work, and illustrating stories.
            </p>
          </div>
          <Link className="primary-link" href="/Satavisha_Mitra_CV.pdf" download="Satavisha_Mitra_CV.pdf">
            Download résumé <Download aria-hidden="true" />
          </Link>
        </div>

        <div className="about-portrait">
          <div className="about-portrait__frame">
            <Image src="/images/profile.jpeg" alt="Portrait of Satavisha Mitra" fill priority sizes="(max-width: 767px) calc(100vw - 32px), 440px" />
          </div>
          <p><span>Bengaluru, India</span><span>Product Manager</span></p>
        </div>
      </header>

      <section className="about-connect" aria-labelledby="connect-title">
        <p>Elsewhere</p>
        <h2 id="connect-title">Let’s stay connected.</h2>
        <div>
          {SOCIAL_LINKS.map((link) => (
            <Link key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}<ArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
