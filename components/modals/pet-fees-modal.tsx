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

interface PetFeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (data: any) => void;
  editingData?: any;
}

export function PetFeesModal({
  isOpen,
  onClose,
  onAdd,
  editingData,
}: PetFeesModalProps) {
  const [petType, setPetType] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [oneTimeFee, setOneTimeFee] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");

  useEffect(() => {
    if (editingData && isOpen) {
      // Handle editing a single pet object
      setPetType(editingData.type || "");
      setMaxWeight(editingData.weight?.replace("lb", "") || "");
      setOneTimeFee(editingData.oneTime?.replace("$", "") || "");
      setSecurityDeposit(editingData.deposit?.replace("$", "") || "");
      setMonthlyRent(editingData.monthly?.replace("$", "") || "");
    } else if (isOpen && !editingData) {
      setPetType("");
      setMaxWeight("");
      setOneTimeFee("");
      setSecurityDeposit("");
      setMonthlyRent("");
    }
  }, [editingData, isOpen]);

  const handleSubmit = () => {
    const petData = {
      type: petType,
      weight: `${maxWeight}lb`,
      oneTime: `$${oneTimeFee}`,
      deposit: `$${securityDeposit}`,
      monthly: `$${monthlyRent}`,
    };
    onAdd?.(petData); // Return single object, not array
    // Reset form
    setPetType("");
    setMaxWeight("");
    setOneTimeFee("");
    setSecurityDeposit("");
    setMonthlyRent("");
  };

  const handleClose = () => {
    // Reset form when closing
    setPetType("");
    setMaxWeight("");
    setOneTimeFee("");
    setSecurityDeposit("");
    setMonthlyRent("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {editingData ? "Edit Pet Fees" : "Pet fees"}
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pet-type">Pet type*</Label>
              <Select value={petType} onValueChange={setPetType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dog">Dog</SelectItem>
                  <SelectItem value="Cat">Cat</SelectItem>
                  <SelectItem value="Bird">Bird</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-weight">Max weight(LB)*</Label>
              <Input
                id="max-weight"
                placeholder="100"
                value={maxWeight}
                onChange={(e) => setMaxWeight(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="one-time-fee">One time pet fee*</Label>
              <Input
                id="one-time-fee"
                placeholder="100"
                value={oneTimeFee}
                onChange={(e) => setOneTimeFee(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="security-deposit">Pet Security Deposit*</Label>
              <Input
                id="security-deposit"
                placeholder="100"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthly-rent">Monthly pet rent*</Label>
              <Input
                id="monthly-rent"
                placeholder="100"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={
                !petType ||
                !maxWeight ||
                !oneTimeFee ||
                !securityDeposit ||
                !monthlyRent
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
