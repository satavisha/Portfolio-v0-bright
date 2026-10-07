"use client"

import { Mascot } from "page-mascot"

export function SiteMascot() {
  return (
    <Mascot
      className="home-hero__mascot"
      directions="/mascots/satavisha-directions.webp"
      reactions="/mascots/satavisha-reactions.webp"
      size={190}
      label="Chibi Satavisha mascot"
    />
  )
}
