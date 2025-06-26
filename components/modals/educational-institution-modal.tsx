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

interface EducationalInstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (data: any) => void;
  editingData?: any;
}

export function EducationalInstitutionModal({
  isOpen,
  onClose,
  onAdd,
  editingData,
}: EducationalInstitutionModalProps) {
  const [institutionType, setInstitutionType] = useState("");
  const [distance, setDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("");
  const [institutionName, setInstitutionName] = useState("");

  useEffect(() => {
    if (editingData && isOpen) {
      // Handle editing a single institution object
      setInstitutionType(editingData.type || "");
      setInstitutionName(editingData.name?.split(",")[0] || "");
      const distancePart = editingData.distance?.split(" ");
      setDistance(distancePart?.[0] || "");
      setDistanceUnit(distancePart?.[1] || "");
    } else if (isOpen && !editingData) {
      setInstitutionType("");
      setDistance("");
      setDistanceUnit("");
      setInstitutionName("");
    }
  }, [editingData, isOpen]);

  const handleSubmit = () => {
    const institutionData = {
      type: institutionType,
      name: `${institutionName}, ${distance}${distanceUnit}`,
      distance: `${distance} ${distanceUnit}`,
    };
    onAdd?.(institutionData); // Return single object, not array
    // Reset form
    setInstitutionType("");
    setDistance("");
    setDistanceUnit("");
    setInstitutionName("");
  };

  const handleClose = () => {
    // Reset form when closing
    setInstitutionType("");
    setDistance("");
    setDistanceUnit("");
    setInstitutionName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {editingData
              ? "Edit Educational Institution"
              : "Add nearest educational institution"}
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
              <Label htmlFor="institution-type">
                Educational institution type*
              </Label>
              <Select
                value={institutionType}
                onValueChange={setInstitutionType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="High school" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Elementary school">
                    Elementary School
                  </SelectItem>
                  <SelectItem value="Middle school">Middle School</SelectItem>
                  <SelectItem value="High school">High School</SelectItem>
                  <SelectItem value="College">College</SelectItem>
                  <SelectItem value="University">University</SelectItem>
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
            <Label htmlFor="institution-name">
              Educational institution name*
            </Label>
            <Input
              id="institution-name"
              placeholder="Enter name"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={
                !institutionType ||
                !distance ||
                !distanceUnit ||
                !institutionName
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
