"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CondominiumsInfoForm } from "./condominiums-info-form";
import { PricingPage } from "./pricing-page";
import {
  SelectionCard,
  FormInput,
  FileUpload,
  AppHeader,
} from "./ui/core-components";
import { useFormState } from "../hooks/use-form-state";
import {
  PROPERTY_TYPES,
  USER_ROLES,
  COUNTRY_OPTIONS,
  STATE_OPTIONS,
} from "../config/constants";
import type { CurrentStep } from "../types";

export function MainForm() {
  const [currentStep, setCurrentStep] = useState<CurrentStep>("form");
  const {
    formData,
    propertyType,
    userRole,
    acceptTerms,
    errors,
    showErrors,
    touchedFields,
    isValid,
    updateField,
    handleFieldBlur,
    setPropertyType,
    setUserRole,
    setAcceptTerms,
    validateForm,
  } = useFormState();

  const handleSubmit = () => {
    if (validateForm()) setCurrentStep("condominiums-info");
  };

  if (currentStep === "condominiums-info") {
    return (
      <CondominiumsInfoForm
        onBack={() => setCurrentStep("form")}
        onNext={() => setCurrentStep("pricing")}
      />
    );
  }

  if (currentStep === "pricing") {
    return <PricingPage onBack={() => setCurrentStep("condominiums-info")} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto p-6">
        <AppHeader />

        {/* Property Type Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Property type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROPERTY_TYPES.map((type) => (
              <SelectionCard
                key={type.id}
                icon={type.icon}
                title={type.title}
                description={type.description}
                isSelected={propertyType === type.id}
                onClick={() => setPropertyType(type.id)}
              />
            ))}
          </div>
          {showErrors && errors.propertyType && (
            <p className="text-sm text-red-600 mt-2">{errors.propertyType}</p>
          )}
        </div>

        {/* User Role Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Select your role
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {USER_ROLES.map((role) => (
              <SelectionCard
                key={role.id}
                icon={role.icon}
                title={role.title}
                description={role.description}
                isSelected={userRole === role.id}
                onClick={() => setUserRole(role.id)}
              />
            ))}
          </div>
          {showErrors && errors.userRole && (
            <p className="text-sm text-red-600 mt-2">{errors.userRole}</p>
          )}
        </div>

        {/* Role-specific Fields */}
        {userRole === "landlord" && (
          <div className=" rounded-xl  border-2 border-solid">
            <h3 className="text-base content-center w-full h-12 pl-4 bg-gray-50 border-b-2 font-medium text-gray-900">
              Proof of ownership
            </h3>
            <div className="mt-4 pb-4 px-4">
              <Label className="text-sm font-bold text-gray-700">
                Ownership doc*
              </Label>
              <div className="mt-2 w-[400px]">
                <FileUpload label="Ownership doc" />
              </div>
            </div>
          </div>
        )}

        {userRole === "realtor" && (
          <div className=" rounded-xl border-2 border-solid">
            <h3 className=" text-base content-center w-full h-12 pl-4 bg-gray-50 font-medium text-gray-900 border-b-2 mb-4">
              Realtor verification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pb-4 px-4">
              <FormInput
                id="realtorLicenseNumber"
                label="License number"
                placeholder="000000000000"
                value={(formData.realtorLicenseNumber as string) || ""}
                onChange={(value) => updateField("realtorLicenseNumber", value)}
                onBlur={() => handleFieldBlur("realtorLicenseNumber")}
                required
                error={errors.realtorLicenseNumber}
                showError={showErrors || touchedFields.realtorLicenseNumber}
              />
              <div>
                <Label className="text-sm font-bold text-gray-700">
                  Additional documents for realtor
                </Label>
                <div className="mt-2">
                  <FileUpload label="Additional documents" />
                </div>
              </div>
              <div>
                <Label className="text-sm font-bold text-gray-700">
                  Agreement with landlord*
                </Label>
                <div className="mt-2">
                  <FileUpload label="Agreement" />
                </div>
              </div>
            </div>
          </div>
        )}

        {userRole === "property-management" && (
          <div className="rounded-xl  border-2 border-solid">
            <h3 className="text-base content-center w-full h-12 pl-4 bg-gray-50 border-b-2 font-medium  text-gray-900 mb-4">
              Company & office info
            </h3>
            <div className="space-y-6 mt-4 pb-4 px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    id: "companyName",
                    label: "Company name",
                    placeholder: "Runyan trade center",
                  },
                  {
                    id: "companyId",
                    label: "Company ID (EIN/TIN)",
                    placeholder: "Name",
                  },
                  {
                    id: "jobTitle",
                    label: "Your job title",
                    placeholder: "Manager",
                  },
                ].map((field) => (
                  <FormInput
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={(formData[field.id] as string) || ""}
                    onChange={(value) => updateField(field.id, value)}
                    onBlur={() => handleFieldBlur(field.id)}
                    required
                    error={errors[field.id]}
                    showError={showErrors || touchedFields[field.id]}
                  />
                ))}
                <div>
                  <Label className="text-sm font-bold text-gray-700">
                    Agreement*
                  </Label>
                  <div className="mt-2">
                    <FileUpload label="Agreement" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormInput
                  id="country"
                  label="Country/Region"
                  type="select"
                  placeholder="Choose country"
                  value={(formData.country as string) || ""}
                  onChange={(value) => updateField("country", value)}
                  onBlur={() => handleFieldBlur("country")}
                  options={COUNTRY_OPTIONS}
                  required
                  error={errors.country}
                  showError={showErrors || touchedFields.country}
                />
                <FormInput
                  id="streetAddress"
                  label="Street address"
                  placeholder="111 Austin Ave"
                  value={(formData.streetAddress as string) || ""}
                  onChange={(value) => updateField("streetAddress", value)}
                  onBlur={() => handleFieldBlur("streetAddress")}
                  required
                  error={errors.streetAddress}
                  showError={showErrors || touchedFields.streetAddress}
                />
                <FormInput
                  id="aptUnit"
                  label="Apt, suite, unit"
                  placeholder="3050"
                  value={(formData.aptUnit as string) || ""}
                  onChange={(value) => updateField("aptUnit", value)}
                />
                <FormInput
                  id="zipCode"
                  label="Zip code"
                  placeholder="75061"
                  value={(formData.zipCode as string) || ""}
                  onChange={(value) => updateField("zipCode", value)}
                  onBlur={() => handleFieldBlur("zipCode")}
                  required
                  error={errors.zipCode}
                  showError={showErrors || touchedFields.zipCode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    id: "phone",
                    label: "Phone number",
                    type: "tel" as const,
                    placeholder: "+1-234-567-8900",
                  },
                  {
                    id: "email",
                    label: "Contact email",
                    type: "email" as const,
                    placeholder: "contact@company.com",
                  },
                  { id: "city", label: "City/Town", placeholder: "Dallas" },
                ].map((field) => (
                  <FormInput
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={(formData[field.id] as string) || ""}
                    onChange={(value) => updateField(field.id, value)}
                    onBlur={() => handleFieldBlur(field.id)}
                    required
                    error={errors[field.id]}
                    showError={showErrors || touchedFields[field.id]}
                  />
                ))}
                <FormInput
                  id="state"
                  label="State/Territory"
                  type="select"
                  placeholder="Choose state"
                  value={(formData.state as string) || ""}
                  onChange={(value) => updateField("state", value)}
                  onBlur={() => handleFieldBlur("state")}
                  options={STATE_OPTIONS}
                  required
                  error={errors.state}
                  showError={showErrors || touchedFields.state}
                />
              </div>
            </div>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="my-8">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              Accept RentYard property adding terms & condition
            </Label>
          </div>
          {showErrors && errors.acceptTerms && (
            <p className="text-sm text-red-600 mt-2">{errors.acceptTerms}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" className="text-gray-600">
            Back
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}
