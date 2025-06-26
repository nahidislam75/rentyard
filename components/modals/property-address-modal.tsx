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
import { X, AlertCircle } from "lucide-react";
import { useModalValidation } from "../../hooks/use-modal-validation";
import { cn } from "@/lib/utils";
import { FieldConfig } from "@/types";

interface PropertyAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (data: any) => void;
  editingData?: any;
}

export function PropertyAddressModal({
  isOpen,
  onClose,
  onAdd,
  editingData,
}: PropertyAddressModalProps) {
  const [propertyName, setPropertyName] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [aptUnit, setAptUnit] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Define validation fields
  const validationFields: FieldConfig[] = [
    { id: "propertyName", label: "Property name", required: true },
    { id: "totalUnits", label: "Total units", required: true },
    { id: "country", label: "Country", required: true },
    { id: "streetAddress", label: "Street address", required: true },
    { id: "city", label: "City", required: true },
    { id: "state", label: "State", required: true },
    {
      id: "zipCode",
      label: "Zip code",
      required: true,
      validation: {
        pattern: /^\d{5}(-\d{4})?$/,
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
      setPropertyName(editingData.propertyName || "");
      setTotalUnits(editingData.totalUnits || "");
      setWebsite(editingData.website || "");
      setCountry(editingData.country || "");
      setStreetAddress(editingData.streetAddress || "");
      setAptUnit(editingData.aptUnit || "");
      setCity(editingData.city || "");
      setState(editingData.state || "");
      setZipCode(editingData.zipCode || "");
    } else if (isOpen && !editingData) {
      // Clear form for new entry
      setPropertyName("");
      setTotalUnits("");
      setWebsite("");
      setCountry("");
      setStreetAddress("");
      setAptUnit("");
      setCity("");
      setState("");
      setZipCode("");
      resetValidation();
    }
  }, [editingData, isOpen, resetValidation]);

  const handleSubmit = () => {
    const formData = {
      propertyName,
      totalUnits,
      website,
      country,
      streetAddress,
      aptUnit,
      city,
      state,
      zipCode,
    };

    if (validateForm(formData)) {
      const data = {
        name: `${propertyName}, ${state} / ${website}, Total unit ${totalUnits}`,
        address: `${streetAddress}${
          aptUnit ? `, ${aptUnit}` : ""
        }, ${city}, ${state} ${zipCode}, ${country}`,
        ...formData,
      };
      onAdd?.(data);
      // Reset form
      setPropertyName("");
      setTotalUnits("");
      setWebsite("");
      setCountry("");
      setStreetAddress("");
      setAptUnit("");
      setCity("");
      setState("");
      setZipCode("");
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setPropertyName("");
    setTotalUnits("");
    setWebsite("");
    setCountry("");
    setStreetAddress("");
    setAptUnit("");
    setCity("");
    setState("");
    setZipCode("");
    resetValidation();
    onClose();
  };

  const isFormValid =
    propertyName &&
    totalUnits &&
    country &&
    streetAddress &&
    city &&
    state &&
    zipCode &&
    !errors.propertyName &&
    !errors.totalUnits &&
    !errors.country &&
    !errors.streetAddress &&
    !errors.city &&
    !errors.state &&
    !errors.zipCode;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {editingData ? "Edit Property Address" : "Property address"}
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
              <Label htmlFor="property-name">
                Property name as identifier*
              </Label>
              <Input
                id="property-name"
                placeholder="Dallas apartments complex"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                onBlur={() => handleFieldBlur("propertyName", propertyName)}
                className={cn(
                  errors.propertyName &&
                    (showErrors || touchedFields.propertyName) &&
                    "border-red-500"
                )}
              />
              {errors.propertyName &&
                (showErrors || touchedFields.propertyName) && (
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">
                      {errors.propertyName}
                    </span>
                  </div>
                )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="total-units">Total apartment unit*</Label>
              <Input
                id="total-units"
                placeholder="50"
                value={totalUnits}
                onChange={(e) => setTotalUnits(e.target.value)}
                onBlur={() => handleFieldBlur("totalUnits", totalUnits)}
                className={cn(
                  errors.totalUnits &&
                    (showErrors || touchedFields.totalUnits) &&
                    "border-red-500"
                )}
              />
              {errors.totalUnits &&
                (showErrors || touchedFields.totalUnits) && (
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">
                      {errors.totalUnits}
                    </span>
                  </div>
                )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-website">
                Property website(optional)
              </Label>
              <Input
                id="property-website"
                placeholder="https://"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country/Region*</Label>
              <Select
                value={country}
                onValueChange={(value) => {
                  setCountry(value);
                  handleFieldBlur("country", value);
                }}
              >
                <SelectTrigger
                  className={cn(
                    errors.country &&
                      (showErrors || touchedFields.country) &&
                      "border-red-500"
                  )}
                >
                  <SelectValue placeholder="Choose country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
              {errors.country && (showErrors || touchedFields.country) && (
                <div className="flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">{errors.country}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="street-address">Street address*</Label>
              <Input
                id="street-address"
                placeholder="111 Austin Ave"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                onBlur={() => handleFieldBlur("streetAddress", streetAddress)}
                className={cn(
                  errors.streetAddress &&
                    (showErrors || touchedFields.streetAddress) &&
                    "border-red-500"
                )}
              />
              {errors.streetAddress &&
                (showErrors || touchedFields.streetAddress) && (
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">
                      {errors.streetAddress}
                    </span>
                  </div>
                )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="apt-unit">Apt, suite, unit (if applicable)</Label>
              <Input
                id="apt-unit"
                placeholder="123"
                value={aptUnit}
                onChange={(e) => setAptUnit(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City/Town*</Label>
              <Input
                id="city"
                placeholder="Dallas"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onBlur={() => handleFieldBlur("city", city)}
                className={cn(
                  errors.city &&
                    (showErrors || touchedFields.city) &&
                    "border-red-500"
                )}
              />
              {errors.city && (showErrors || touchedFields.city) && (
                <div className="flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">{errors.city}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Territory*</Label>
              <Select
                value={state}
                onValueChange={(value) => {
                  setState(value);
                  handleFieldBlur("state", value);
                }}
              >
                <SelectTrigger
                  className={cn(
                    errors.state &&
                      (showErrors || touchedFields.state) &&
                      "border-red-500"
                  )}
                >
                  <SelectValue placeholder="Choose state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                </SelectContent>
              </Select>
              {errors.state && (showErrors || touchedFields.state) && (
                <div className="flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">{errors.state}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">Zip code*</Label>
              <Input
                id="zip"
                placeholder="75061"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                onBlur={() => handleFieldBlur("zipCode", zipCode)}
                className={cn(
                  errors.zipCode &&
                    (showErrors || touchedFields.zipCode) &&
                    "border-red-500"
                )}
              />
              {errors.zipCode && (showErrors || touchedFields.zipCode) && (
                <div className="flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">{errors.zipCode}</span>
                </div>
              )}
            </div>
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
