import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Download } from "lucide-react"

const RESUME_PDF = "/Satavisha_Mitra_Product_Lead_CV.pdf"

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Satavisha Mitra, product manager. View it online or download the PDF.",
  alternates: { canonical: "/resume" },
  openGraph: { title: "Resume | Satavisha Mitra", url: "/resume" },
}

export default function ResumePage() {
  return (
    <main className="index-page resume-page page-enter">
      <h1 className="sr-only">Resume</h1>
      <div className="resume-actions">
        <Link className="primary-link" href={RESUME_PDF} download="Satavisha_Mitra_Product_Lead_CV.pdf">
          Download PDF <Download aria-hidden="true" />
        </Link>
      </div>

      <p className="resume-hint">Tap the resume to open it full size, or pinch to zoom.</p>
      <a className="resume-sheet" href={RESUME_PDF} target="_blank" rel="noreferrer" aria-label="Open Satavisha Mitra’s resume PDF in a new tab">
        <Image
          src="/images/resume-product-lead.png"
          alt="Satavisha Mitra’s one-page resume"
          width={1654}
          height={2339}
          priority
          sizes="(max-width: 620px) calc(100vw - 16px), (max-width: 900px) calc(100vw - 32px), 860px"
        />
      </a>
    </main>
  )
}
