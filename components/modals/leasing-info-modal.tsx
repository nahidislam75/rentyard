"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, AlertCircle } from "lucide-react";
import { useModalValidation } from "../../hooks/use-modal-validation";
import { cn } from "@/lib/utils";
import { FieldConfig } from "@/types";

interface LeasingInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (data: any) => void;
  editingData?: any;
}

export function LeasingInfoModal({
  isOpen,
  onClose,
  onAdd,
  editingData,
}: LeasingInfoModalProps) {
  const [managerName, setManagerName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [sameAddress, setSameAddress] = useState(false);

  // Define validation fields
  const validationFields: FieldConfig[] = [
    { id: "managerName", label: "Manager name", required: true },
    { id: "countryCode", label: "Country code", required: true },
    { id: "phoneNumber", label: "Phone number", required: true },
    {
      id: "email",
      label: "Email",
      required: true,
      validation: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
    },
  ];

  const {
    errors,
    touchedFields,
    showErrors,
    validateForm,
    handleFieldBlur,
    resetValidation,
  } = useModalValidation(validationFields);

  // Pre-fill form when editing
  useEffect(() => {
    if (editingData && isOpen) {
      setManagerName(editingData.managerName || "");
      setCountryCode(editingData.countryCode || "");
      setPhoneNumber(editingData.phoneNumber || "");
      setEmail(editingData.email || "");
      setSameAddress(editingData.sameAddress || false);
    } else if (isOpen && !editingData) {
      // Clear form for new entry
      setManagerName("");
      setCountryCode("");
      setPhoneNumber("");
      setEmail("");
      setSameAddress(false);
      resetValidation();
    }
  }, [editingData, isOpen, resetValidation]);

  const handleSubmit = () => {
    const formData = {
      managerName,
      countryCode,
      phoneNumber,
      email,
    };

    if (validateForm(formData)) {
      const data = {
        manager: `${managerName}, ${email}`,
        phone: `${countryCode}${phoneNumber}`,
        address: sameAddress ? "Address same as property" : "Custom address",
        managerName,
        countryCode,
        phoneNumber,
        email,
        sameAddress,
      };
      onAdd?.(data);
      // Reset form
      setManagerName("");
      setCountryCode("");
      setPhoneNumber("");
      setEmail("");
      setSameAddress(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setManagerName("");
    setCountryCode("");
    setPhoneNumber("");
    setEmail("");
    setSameAddress(false);
    resetValidation();
    onClose();
  };

  const isFormValid =
    managerName &&
    countryCode &&
    phoneNumber &&
    email &&
    !errors.managerName &&
    !errors.countryCode &&
    !errors.phoneNumber &&
    !errors.email;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {editingData ? "Edit Leasing Info" : "Leasing info"}
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
              <Label htmlFor="manager-name">Leasing manager name*</Label>
              <Input
                id="manager-name"
                placeholder="Alex johan"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                onBlur={() => handleFieldBlur("managerName", managerName)}
                className={cn(
                  errors.managerName &&
                    (showErrors || touchedFields.managerName) &&
                    "border-red-500"
                )}
              />
              {errors.managerName &&
                (showErrors || touchedFields.managerName) && (
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">
                      {errors.managerName}
                    </span>
                  </div>
                )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="manager-phone">
                Leasing manager Phone number*
              </Label>
              <div className="flex space-x-2">
                <Select
                  value={countryCode}
                  onValueChange={(value) => {
                    setCountryCode(value);
                    handleFieldBlur("countryCode", value);
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      "w-20",
                      errors.countryCode &&
                        (showErrors || touchedFields.countryCode) &&
                        "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="🇧🇩" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+880">🇧🇩</SelectItem>
                    <SelectItem value="+1">🇺🇸</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="+880"
                  className={cn(
                    "flex-1",
                    errors.phoneNumber &&
                      (showErrors || touchedFields.phoneNumber) &&
                      "border-red-500"
                  )}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={() => handleFieldBlur("phoneNumber", phoneNumber)}
                />
              </div>
              {(errors.countryCode &&
                (showErrors || touchedFields.countryCode)) ||
              (errors.phoneNumber &&
                (showErrors || touchedFields.phoneNumber)) ? (
                <div className="flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">
                    {errors.countryCode || errors.phoneNumber}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="manager-email">Leasing manager email*</Label>
            <Input
              id="manager-email"
              placeholder="leasing@rentyard.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleFieldBlur("email", email)}
              className={cn(
                errors.email &&
                  (showErrors || touchedFields.email) &&
                  "border-red-500"
              )}
            />
            {errors.email && (showErrors || touchedFields.email) && (
              <div className="flex items-center space-x-1">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600">{errors.email}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="same-address"
              checked={sameAddress}
              onCheckedChange={(checked) => setSameAddress(!!checked)}
            />
            <Label htmlFor="same-address" className="text-sm">
              Address(same as property)
            </Label>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!isFormValid}
            >
              {editingData ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
