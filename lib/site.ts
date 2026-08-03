export const SITE_NAME = "Satavisha Mitra"
export const SITE_ROLE = "Product Manager"
export const SITE_DESCRIPTION =
  "Satavisha Mitra is a product manager bringing research, strategy, and technical understanding together to build useful products."

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")

export const SITE_URL = configuredSiteUrl || "https://satavisha.xyz"

export const NAVIGATION = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/dance", label: "Dance" },
  { href: "/about", label: "About" },
] as const

export const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/satavisha-mitra/",
    label: "LinkedIn",
  },
  { href: "https://github.com/satavisha", label: "GitHub" },
  { href: "https://x.com/satavishaMitra", label: "X" },
] as const
