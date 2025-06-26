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

interface NearestStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (data: any) => void;
  editingData?: any;
}

export function NearestStationModal({
  isOpen,
  onClose,
  onAdd,
  editingData,
}: NearestStationModalProps) {
  const [stationType, setStationType] = useState("");
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("");
  const [stationName, setStationName] = useState("");

  useEffect(() => {
    if (editingData && isOpen) {
      // Handle editing a single station object
      setStationType(editingData.type || "");
      setStationName(editingData.name?.split(",")[0] || "");
      const distancePart = editingData.distance?.split(" ");
      setDistance(distancePart?.[0] || "");
      setDistanceUnit(distancePart?.[1] || "");
    } else if (isOpen && !editingData) {
      setStationType("");
      setDistance("");
      setDistanceUnit("");
      setStationName("");
    }
  }, [editingData, isOpen]);

  const handleSubmit = () => {
    const stationData = {
      type: stationType,
      name: `${stationName}, ${distance}${distanceUnit}`,
      distance: `${distance} ${distanceUnit}`,
    };
    onAdd?.(stationData); // Return single object, not array
    // Reset form
    setStationType("");
    setDistance("");
    setDistanceUnit("");
    setStationName("");
  };

  const handleClose = () => {
    // Reset form when closing
    setStationType("");
    setDistance("");
    setDistanceUnit("");
    setStationName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {editingData ? "Edit Station" : "Add nearest station"}
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
              <Label htmlFor="station-type">Nearest station type*</Label>
              <Select value={stationType} onValueChange={setStationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bus Station">Bus Station</SelectItem>
                  <SelectItem value="Train Station">Train Station</SelectItem>
                  <SelectItem value="Subway Station">Subway Station</SelectItem>
                  <SelectItem value="Metro Station">Metro Station</SelectItem>
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
            <Label htmlFor="station-name">Nearest station name*</Label>
            <Input
              id="station-name"
              placeholder="Enter name"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={
                !stationType || !distance || !distanceUnit || !stationName
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
