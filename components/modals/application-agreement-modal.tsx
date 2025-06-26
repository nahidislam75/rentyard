"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X } from "lucide-react"

interface ApplicationAgreementModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: (data: any) => void
  editingData?: any
}

export function ApplicationAgreementModal({ isOpen, onClose, onAdd, editingData }: ApplicationAgreementModalProps) {
  const [documentName, setDocumentName] = useState("")
  const [acceptImmigrant, setAcceptImmigrant] = useState(false)

  useEffect(() => {
    if (editingData && isOpen) {
      setDocumentName(editingData.document || "")
      setAcceptImmigrant(editingData.acceptImmigrant || false)
    } else if (isOpen && !editingData) {
      setDocumentName("")
      setAcceptImmigrant(false)
    }
  }, [editingData, isOpen])

  const handleSubmit = () => {
    const data = {
      document: documentName || "Agreement.pdf",
      acceptImmigrant,
    }
    onAdd?.(data)
    // Reset form
    setDocumentName("")
    setAcceptImmigrant(false)
  }

  const handleClose = () => {
    // Reset form when closing
    setDocumentName("")
    setAcceptImmigrant(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {editingData ? "Edit Application Agreement" : "Application agreement(optional)"}
          </h2>
          <Button variant="ghost" size="sm" onClick={handleClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Upload agreement</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="h-6 w-6 text-gray-400" />
                <span className="text-sm text-gray-500">(Pdf only)</span>
                <Input
                  placeholder="Enter document name"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="accept-immigrant"
              checked={acceptImmigrant}
              onCheckedChange={(checked) => setAcceptImmigrant(!!checked)}
            />
            <Label htmlFor="accept-immigrant" className="text-sm">
              Accept immigrant & international student application
            </Label>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
              {editingData ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
