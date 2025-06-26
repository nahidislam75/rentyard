"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface RentFrequencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (data: any) => void;
  editingData?: any;
}

export function RentFrequencyModal({
  isOpen,
  onClose,
  onAdd,
  editingData,
}: RentFrequencyModalProps) {
  const [frequency, setFrequency] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingData && isOpen) {
      setFrequency(editingData.frequency || "");
      setReminderDate(editingData.reminder || "");
      setDueDate(editingData.due || "");
    } else if (isOpen && !editingData) {
      setFrequency("");
      setReminderDate("");
      setDueDate("");
    }
  }, [editingData, isOpen]);

  const handleSubmit = () => {
    const data = {
      frequency: frequency || "Monthly",
      reminder: reminderDate || "25th Every month",
      due: dueDate || "5th Every month",
    };
    onAdd?.(data);
    // Reset form
    setFrequency("");
    setReminderDate("");
    setDueDate("");
  };

  const handleClose = () => {
    // Reset form when closing
    setFrequency("");
    setReminderDate("");
    setDueDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {editingData
              ? "Edit Rent Frequency"
              : "Rent frequency & payment reminder"}
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
              <Label htmlFor="payment-frequency">Rent payment frequency*</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Monthly" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminder-date">
                Rent Reminder/Statement date*
              </Label>
              <Input
                id="reminder-date"
                placeholder="25th Every month"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="due-date">Rent due date*</Label>
              <Input
                id="due-date"
                placeholder="5th Every month"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingData ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
