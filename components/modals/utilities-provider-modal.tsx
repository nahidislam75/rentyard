"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface UtilitiesProviderModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: (data: any) => void
  editingData?: any
}

export function UtilitiesProviderModal({ isOpen, onClose, onAdd, editingData }: UtilitiesProviderModalProps) {
  const [utilityType, setUtilityType] = useState("")
  const [providerName, setProviderName] = useState("")

  useEffect(() => {
    if (editingData && isOpen) {
      // Handle editing a single utility object
      setUtilityType(editingData.type || "")
      setProviderName(editingData.name || "")
    } else if (isOpen && !editingData) {
      setUtilityType("")
      setProviderName("")
    }
  }, [editingData, isOpen])

  const handleSubmit = () => {
    const utilityData = {
      type: utilityType,
      name: providerName,
    }
    onAdd?.(utilityData) // Return single object, not array
    // Reset form
    setUtilityType("")
    setProviderName("")
  }

  const handleClose = () => {
    // Reset form when closing
    setUtilityType("")
    setProviderName("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">{editingData ? "Edit Utilities Provider" : "Utilities provider"}</h2>
          <Button variant="ghost" size="sm" onClick={handleClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="utility-type">Utility type*</Label>
              <Select value={utilityType} onValueChange={setUtilityType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Internet/Utilities">Internet/Utilities</SelectItem>
                  <SelectItem value="Cable (XFINITY)">Cable (XFINITY)</SelectItem>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Gas">Gas</SelectItem>
                  <SelectItem value="Water">Water</SelectItem>
                  <SelectItem value="Trash Collection">Trash Collection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="provider-name">Provider company name*</Label>
              <Input
                id="provider-name"
                placeholder="Enter name"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!utilityType || !providerName}
            >
              {editingData ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
