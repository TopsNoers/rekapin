'use client'

import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRef, useState } from 'react'
import { triggerN8nWorkflow } from '@/app/actions'

export default function UploadReceipt() {
  const generateUploadUrl = useMutation(api.expenses.generateUploadUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setMessage(null)

    try {
      // Get upload URL from Convex
      const uploadUrl = await generateUploadUrl()

      // Upload file to Convex Storage
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      })

      if (!result.ok) {
        throw new Error('Failed to upload file')
      }

      // Convex Storage returns the storageId in the response
      const storageId = await result.text()

      // Trigger n8n workflow with storageId
      await triggerN8nWorkflow(storageId)

      setMessage({ type: 'success', text: 'File uploaded successfully and workflow triggered!' })
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Upload error:', error)
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to upload file' 
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
      
      {uploading && (
        <p className="text-sm text-gray-600">Uploading...</p>
      )}
      
      {message && (
        <div
          className={`p-3 rounded-md text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  )
}
