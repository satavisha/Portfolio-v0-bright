import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Github, Linkedin } from "lucide-react"
import { SITE_DESCRIPTION, SITE_URL, SOCIAL_LINKS } from "@/lib/site"

export const metadata: Metadata = {
  title: "Product Manager",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
}

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") return <Linkedin aria-hidden="true" />
  if (label === "GitHub") return <Github aria-hidden="true" />
  return <span className="x-icon" aria-hidden="true">𝕏</span>
}

export default function HomePage() {
  const personData = {
    "@context": "https://schema.org", "@type": "Person", name: "Satavisha Mitra", url: SITE_URL,
    jobTitle: "Product Manager", image: `${SITE_URL}/images/profile.jpeg`,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  }

  return (
    <main className="home-page page-enter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personData).replace(/</g, "\\u003c") }} />
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__copy">
          <p className="kicker"><span>Portfolio</span> Product · Strategy · Practice</p>
          <h1 id="home-title">Hi, I’m <em>Satavisha.</em></h1>
          <p className="home-hero__intro">
            I’m a product manager who brings research, strategy, and technical understanding together to build useful
            products. Dance is my creative practice outside work.
          </p>
          <Link className="primary-link" href="/work">Explore my work <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="home-portrait">
          <div className="home-portrait__number" aria-hidden="true">01 / 04</div>
          <div className="home-portrait__frame">
            <Image src="/images/profile.jpeg" alt="Satavisha Mitra smiling in front of a brick wall" fill priority sizes="(max-width: 767px) 70vw, 330px" />
          </div>
          <p>Product manager in Bengaluru, India</p>
        </div>
      </section>
      <nav className="home-socials" aria-label="Social links">
        {SOCIAL_LINKS.map((link) => (
          <Link key={link.label} href={link.href} target="_blank" rel="noreferrer">
            <SocialIcon label={link.label} /><span>{link.label}</span><ArrowUpRight aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </Link>
        ))}
      </nav>
    </main>
  )
}
