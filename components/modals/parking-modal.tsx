"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ParkingModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: (data: any) => void
  editingData?: any
}

export function ParkingModal({ isOpen, onClose, onAdd, editingData }: ParkingModalProps) {
  const [guestTime, setGuestTime] = useState("")
  const [overview, setOverview] = useState("")

  useEffect(() => {
    if (editingData && isOpen) {
      setGuestTime(editingData.guestTime || "")
      setOverview(editingData.overview || "")
    } else if (isOpen && !editingData) {
      setGuestTime("")
      setOverview("")
    }
  }, [editingData, isOpen])

  const handleSubmit = () => {
    const data = {
      guestTime: guestTime || "2H",
      overview: overview || "Parking overview not provided",
    }
    onAdd?.(data)
    // Reset form
    setGuestTime("")
    setOverview("")
  }

  const handleClose = () => {
    // Reset form when closing
    setGuestTime("")
    setOverview("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">{editingData ? "Edit Parking" : "Parking"}</h2>
          <Button variant="ghost" size="sm" onClick={handleClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parking-time">Guest vehicle parking time</Label>
            <Select value={guestTime} onValueChange={setGuestTime}>
              <SelectTrigger>
                <SelectValue placeholder="2H" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2H">2H</SelectItem>
                <SelectItem value="4H">4H</SelectItem>
                <SelectItem value="24H">24H</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="parking-overview">Write parking overview</Label>
            <div className="relative">
              <Textarea
                id="parking-overview"
                placeholder="Write parking overview"
                className="min-h-[100px] resize-none pr-12"
                maxLength={200}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
              />
              <span className="absolute bottom-2 right-2 text-xs text-gray-400">{200 - overview.length}</span>
            </div>
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
