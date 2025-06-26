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
import { Info, X, AlertCircle } from "lucide-react";
import { useModalValidation } from "../../hooks/use-modal-validation";
import { cn } from "@/lib/utils";
import { FieldConfig } from "@/types";

interface ChargesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (data: any) => void;
  editingData?: any;
}

export function ChargesModal({
  isOpen,
  onClose,
  onAdd,
  editingData,
}: ChargesModalProps) {
  const [applicationFee, setApplicationFee] = useState("");
  const [applicantType, setApplicantType] = useState("");
  const [adminFee, setAdminFee] = useState("");

  // Define validation fields
  const validationFields: FieldConfig[] = [
    { id: "applicationFee", label: "Application fee", required: true },
    { id: "applicantType", label: "Applicant type", required: true },
    { id: "adminFee", label: "Admin fee", required: true },
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
      setApplicationFee(editingData.applicationFee || "");
      setApplicantType(editingData.applicantType || "");
      setAdminFee(editingData.adminFee || "");
    } else if (isOpen && !editingData) {
      // Clear form for new entry
      setApplicationFee("");
      setApplicantType("");
      setAdminFee("");
      resetValidation();
    }
  }, [editingData, isOpen, resetValidation]);

  const handleSubmit = () => {
    const formData = {
      applicationFee,
      applicantType,
      adminFee,
    };

    if (validateForm(formData)) {
      const data = {
        application: `$${applicationFee}/${applicantType}, Admin fee $${adminFee}`,
        ...formData,
      };
      onAdd?.(data);
      // Reset form
      setApplicationFee("");
      setApplicantType("");
      setAdminFee("");
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setApplicationFee("");
    setApplicantType("");
    setAdminFee("");
    resetValidation();
    onClose();
  };

  const isFormValid =
    !errors.applicationFee &&
    !errors.applicantType &&
    !errors.adminFee &&
    applicationFee &&
    applicantType &&
    adminFee;

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                {editingData ? "Edit Charges" : "Charges"}
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
                  <Label htmlFor="application-fee">
                    Application fee(one-time)*
                  </Label>
                  <Input
                    id="application-fee"
                    placeholder="100"
                    value={applicationFee}
                    onChange={(e) => setApplicationFee(e.target.value)}
                    onBlur={() =>
                      handleFieldBlur("applicationFee", applicationFee)
                    }
                    className={cn(
                      errors.applicationFee &&
                        (showErrors || touchedFields.applicationFee) &&
                        "border-red-500"
                    )}
                  />
                  {errors.applicationFee &&
                    (showErrors || touchedFields.applicationFee) && (
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-600">
                          {errors.applicationFee}
                        </span>
                      </div>
                    )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicant-type">All 18+ applicant</Label>
                  <Select
                    value={applicantType}
                    onValueChange={(value) => {
                      setApplicantType(value);
                      handleFieldBlur("applicantType", value);
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        errors.applicantType &&
                          (showErrors || touchedFields.applicantType) &&
                          "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All 18+ applicant">
                        All 18+ applicant
                      </SelectItem>
                      <SelectItem value="Primary applicant only">
                        Primary applicant only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.applicantType &&
                    (showErrors || touchedFields.applicantType) && (
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-600">
                          {errors.applicantType}
                        </span>
                      </div>
                    )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-fee">Admin fee(one-time)*</Label>
                <Input
                  id="admin-fee"
                  placeholder="15"
                  value={adminFee}
                  onChange={(e) => setAdminFee(e.target.value)}
                  onBlur={() => handleFieldBlur("adminFee", adminFee)}
                  className={cn(
                    errors.adminFee &&
                      (showErrors || touchedFields.adminFee) &&
                      "border-red-500"
                  )}
                />
                {errors.adminFee && (showErrors || touchedFields.adminFee) && (
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">
                      {errors.adminFee}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Info className="h-4 w-4" />
                <span>Type 0 if charges not applicable</span>
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
      )}
    </div>
  );
}
