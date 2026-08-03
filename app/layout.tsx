import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans, Newsreader } from "next/font/google"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site"
import "./globals.css"

const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap" })
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Product Manager`, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: `${SITE_NAME} Portfolio`,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", url: SITE_URL, siteName: SITE_NAME, title: `${SITE_NAME} — Product Manager`,
    description: SITE_DESCRIPTION, locale: "en_IN",
    images: [{ url: "/images/profile.jpeg", width: 509, height: 655, alt: "Satavisha Mitra" }],
  },
  twitter: {
    card: "summary_large_image", title: `${SITE_NAME} — Product Manager`, description: SITE_DESCRIPTION,
    creator: "@satavishaMitra", images: ["/images/profile.jpeg"],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { colorScheme: "light", themeColor: "#f3eee4" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plexSans.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}
