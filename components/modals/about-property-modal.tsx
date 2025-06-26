"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface AboutPropertyModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: (data: any) => void
  editingData?: any
}

export function AboutPropertyModal({ isOpen, onClose, onAdd, editingData }: AboutPropertyModalProps) {
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (editingData && isOpen) {
      setDescription(editingData || "")
    } else if (isOpen && !editingData) {
      setDescription("")
    }
  }, [editingData, isOpen])

  const handleSubmit = () => {
    onAdd?.(description)
    setDescription("")
  }

  const handleClose = () => {
    setDescription("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {editingData ? "Edit About Property" : "About the property(optional)"}
          </h2>
          <Button variant="ghost" size="sm" onClick={handleClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Type message here"
            className="min-h-[120px] resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!description.trim()}
            >
              {editingData ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
