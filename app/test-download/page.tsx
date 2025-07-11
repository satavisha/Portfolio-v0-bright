import { DownloadTest } from "@/components/download-test"

export default function TestDownloadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resume Download Test</h1>
          <p className="text-gray-600">
            Use this page to test the resume download functionality before deploying to production.
          </p>
        </div>

        <DownloadTest />

        <div className="mt-8 text-center">
          <a href="/" className="text-orange-500 hover:text-orange-600 font-medium">
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
