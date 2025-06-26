"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LandmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (data: any) => void;
  editingData?: any;
}

export function LandmarkModal({
  isOpen,
  onClose,
  onAdd,
  editingData,
}: LandmarkModalProps) {
  const [landmarkType, setLandmarkType] = useState("");
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("");
  const [landmarkName, setLandmarkName] = useState("");

  useEffect(() => {
    if (editingData && isOpen) {
      // Handle editing a single landmark object
      setLandmarkType(editingData.type || "");
      setLandmarkName(editingData.name?.split(",")[0] || "");
      const distancePart = editingData.distance?.split(" ");
      setDistance(distancePart?.[0] || "");
      setDistanceUnit(distancePart?.[1] || "");
    } else if (isOpen && !editingData) {
      setLandmarkType("");
      setDistance("");
      setDistanceUnit("");
      setLandmarkName("");
    }
  }, [editingData, isOpen]);

  const handleSubmit = () => {
    const landmarkData = {
      type: landmarkType,
      name: `${landmarkName}, ${distance}${distanceUnit}`,
      distance: `${distance} ${distanceUnit}`,
    };
    onAdd?.(landmarkData); // Return single object, not array
    // Reset form
    setLandmarkType("");
    setDistance("");
    setDistanceUnit("");
    setLandmarkName("");
  };

  const handleClose = () => {
    // Reset form when closing
    setLandmarkType("");
    setDistance("");
    setDistanceUnit("");
    setLandmarkName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {editingData ? "Edit Landmark" : "Add landmark"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="landmark-type">Landmark type*</Label>
              <Select value={landmarkType} onValueChange={setLandmarkType}>
                <SelectTrigger>
                  <SelectValue placeholder="Museum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Museum">Museum</SelectItem>
                  <SelectItem value="Park">Park</SelectItem>
                  <SelectItem value="Mall">Shopping Mall</SelectItem>
                  <SelectItem value="Hospital">Hospital</SelectItem>
                  <SelectItem value="Library">Library</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance">Distance from property*</Label>
              <Input
                id="distance"
                placeholder="1.5"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance-unit">Mile</Label>
              <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="mile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mile">Mile</SelectItem>
                  <SelectItem value="km">Kilometer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="landmark-name">Landmark name*</Label>
            <Input
              id="landmark-name"
              placeholder="Enter name"
              value={landmarkName}
              onChange={(e) => setLandmarkName(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={
                !landmarkType || !distance || !distanceUnit || !landmarkName
              }
            >
              {editingData ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
