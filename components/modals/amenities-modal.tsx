"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  Wind,
  Tv,
  Fan,
  Home,
  Users,
  Refrigerator,
  MapPin,
  Wrench,
  Shield,
  Flame,
  Car,
  Utensils,
  X,
} from "lucide-react"

interface AmenitiesModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: (data: any) => void
  editingData?: any
}

const amenities = [
  { id: "air-conditioning", label: "Air conditioning", icon: Wind },
  { id: "cable-ready", label: "Cable ready", icon: Tv },
  { id: "ceiling-fan", label: "Ceiling fan", icon: Fan },
  { id: "high-ceilings", label: "High ceilings", icon: Home },
  { id: "private-balcony", label: "Private balcony", icon: Users },
  { id: "refrigerator", label: "Refrigerator", icon: Refrigerator },
  { id: "wooded-views", label: "Wooded views", icon: MapPin },
  { id: "wd-hookup", label: "W/D hookup", icon: Wrench },
  { id: "hardwood-floor", label: "Hardwood Floor (home)", icon: Home },
  { id: "fireplace", label: "Fireplace (home)", icon: Flame },
  { id: "first-aid", label: "First aid kit", icon: Shield },
  { id: "carbon-monoxide", label: "Carbon monoxide alarm", icon: Shield },
  { id: "expanded-patios", label: "Expanded patios (home)", icon: Home },
  { id: "free-parking", label: "Free parking on premises", icon: Car },
  { id: "fire-extinguisher", label: "Fire extinguisher", icon: Utensils },
]

export function AmenitiesModal({ isOpen, onClose, onAdd, editingData }: AmenitiesModalProps) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAmenities = amenities.filter((amenity) =>
    amenity.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    )
  }

  const handleSubmit = () => {
    const selectedAmenityLabels = selectedAmenities.map(
      (id) => amenities.find((amenity) => amenity.id === id)?.label || "",
    )
    onAdd?.(selectedAmenityLabels)
    setSelectedAmenities([])
    setSearchTerm("")
  }

  const handleClose = () => {
    setSelectedAmenities([])
    setSearchTerm("")
    onClose()
  }

  useEffect(() => {
    if (editingData && isOpen) {
      // Convert amenity labels back to IDs for selection
      const selectedIds = editingData
        .map((label: string) => amenities.find((amenity) => amenity.label === label)?.id)
        .filter(Boolean)
      setSelectedAmenities(selectedIds)
    } else if (isOpen && !editingData) {
      setSelectedAmenities([])
      setSearchTerm("")
    }
  }, [editingData, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">{editingData ? "Edit Amenities" : "Community's amenity/features"}</h2>
          <Button variant="ghost" size="sm" onClick={handleClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search amenities"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
            {filteredAmenities.map((amenity) => {
              const Icon = amenity.icon
              const isSelected = selectedAmenities.includes(amenity.id)
              return (
                <Badge
                  key={amenity.id}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer p-2 justify-start ${
                    isSelected ? "bg-blue-100 text-blue-800 border-blue-300" : "hover:bg-gray-50"
                  }`}
                  onClick={() => toggleAmenity(amenity.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="text-xs">{amenity.label}</span>
                </Badge>
              )
            })}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={selectedAmenities.length === 0}
            >
              {editingData ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
