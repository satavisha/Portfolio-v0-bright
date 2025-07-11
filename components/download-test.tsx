"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, CheckCircle, AlertCircle, FileText, ExternalLink } from "lucide-react"
import { useState } from "react"

export function DownloadTest() {
  const [testResults, setTestResults] = useState<{
    fileExists: boolean | null
    downloadWorked: boolean | null
  }>({
    fileExists: null,
    downloadWorked: null,
  })

  const checkFileExists = async () => {
    try {
      const response = await fetch("/resume.pdf", { method: "HEAD" })
      const exists = response.ok
      setTestResults((prev) => ({
        ...prev,
        fileExists: exists,
      }))
    } catch (error) {
      console.error("Error checking file:", error)
      setTestResults((prev) => ({
        ...prev,
        fileExists: false,
      }))
    }
  }

  const testDirectDownload = () => {
    try {
      const link = document.createElement("a")
      link.href = "/resume.pdf"
      link.download = "Satavisha_Mitra_Resume.pdf"
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTestResults((prev) => ({
        ...prev,
        downloadWorked: true,
      }))
    } catch (error) {
      console.error("Download test failed:", error)
      setTestResults((prev) => ({
        ...prev,
        downloadWorked: false,
      }))
    }
  }

  const openPdfInNewTab = () => {
    window.open("/resume.pdf", "_blank")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Direct PDF Download Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Existence Check */}
        <div className="space-y-4">
          <h3 className="font-semibold">1. Check if PDF file exists</h3>
          <Button onClick={checkFileExists} variant="outline">
            Check PDF File
          </Button>

          {testResults.fileExists !== null && (
            <div className="flex items-center gap-2 text-sm">
              {testResults.fileExists ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-700">PDF file found at /resume.pdf</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-700">PDF file not found. Please upload resume.pdf to public folder.</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* View PDF in Browser */}
        <div className="space-y-4">
          <h3 className="font-semibold">2. View PDF in Browser</h3>
          <Button onClick={openPdfInNewTab} className="bg-blue-500 hover:bg-blue-600">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open PDF in New Tab
          </Button>
        </div>

        {/* Test Direct Download */}
        <div className="space-y-4">
          <h3 className="font-semibold">3. Test Direct Download</h3>
          <Button onClick={testDirectDownload} className="bg-orange-500 hover:bg-orange-600">
            <FileText className="h-4 w-4 mr-2" />
            Download PDF (Same as Portfolio Button)
          </Button>

          {testResults.downloadWorked !== null && (
            <div className="flex items-center gap-2 text-sm">
              {testResults.downloadWorked ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-700">Download initiated successfully!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-700">Download failed. Check console for errors.</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm">
          <h4 className="font-semibold mb-2">How it works:</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              The PDF file is stored in the <code>/public/resume.pdf</code> path
            </li>
            <li>When you click download, it creates a link to this file</li>
            <li>The browser downloads the exact file you uploaded</li>
            <li>No PDF generation or modification happens</li>
          </ol>
        </div>

        {/* Troubleshooting */}
        <div className="bg-yellow-50 p-4 rounded-lg text-sm">
          <h4 className="font-semibold mb-2">If download doesn't work:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Make sure the PDF file exists in the public folder</li>
            <li>Check if pop-ups are blocked</li>
            <li>Try the "Open PDF in New Tab" option first</li>
            <li>Some browsers may show the PDF instead of downloading it</li>
            <li>Right-click the download button and select "Save link as..."</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
