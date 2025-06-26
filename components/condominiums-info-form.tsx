"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { AppHeader } from "./ui/core-components";
import { FormFieldRow } from "./ui/form-field-row";
import { PhotoUploadGrid } from "./ui/photo-upload-grid";
import {
  useFormValidation,
  type ValidationRules,
} from "../hooks/use-form-validation";

// Import all modals
import { ChargesModal } from "./modals/charges-modal";
import { PropertyAddressModal } from "./modals/property-address-modal";
import { LeasingInfoModal } from "./modals/leasing-info-modal";
import { RentFrequencyModal } from "./modals/rent-frequency-modal";
import { ApplicationAgreementModal } from "./modals/application-agreement-modal";
import { AboutPropertyModal } from "./modals/about-property-modal";
import { PetFeesModal } from "./modals/pet-fees-modal";
import { AmenitiesModal } from "./modals/amenities-modal";
import { ParkingModal } from "./modals/parking-modal";
import { LandmarkModal } from "./modals/landmark-modal";
import { NearestStationModal } from "./modals/nearest-station-modal";
import { EducationalInstitutionModal } from "./modals/educational-institution-modal";
import { UtilitiesProviderModal } from "./modals/utilities-provider-modal";

interface CondominiumsInfoFormProps {
  onBack: () => void;
  onNext?: () => void;
}

interface FormField {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  recommended?: boolean;
  note?: string;
}

const LEFT_COLUMN_FIELDS: FormField[] = [
  { id: "property-address", label: "Property address", required: true },
  { id: "leasing-info", label: "Leasing info", required: true },
  { id: "charges", label: "Charges", required: true },
  {
    id: "rent-frequency",
    label: "Rent frequency & payment reminder",
    required: true,
  },
  {
    id: "application-agreement",
    label: "Application agreement",
    optional: true,
  },
  { id: "about-property", label: "About the property", optional: true },
  {
    id: "community-amenity",
    label: "Community's amenity/features",
    recommended: true,
  },
];

const RIGHT_COLUMN_FIELDS: FormField[] = [
  {
    id: "pet-fees",
    label: "Pet fees",
    optional: true,
    note: "add fees if you allow pet",
  },
  { id: "parking", label: "Parking", optional: true },
  {
    id: "educational-institution",
    label: "Nearest educational institution",
    recommended: true,
  },
  { id: "nearest-stations", label: "Nearest stations", recommended: true },
  { id: "nearest-landmark", label: "Nearest landmark", recommended: true },
  { id: "utilities-provider", label: "Utilities provider", recommended: true },
];

const MULTIPLE_ENTRY_FIELDS = [
  "pet-fees",
  "educational-institution",
  "nearest-stations",
  "nearest-landmark",
  "utilities-provider",
];

export function CondominiumsInfoForm({
  onBack,
  onNext,
}: CondominiumsInfoFormProps) {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<any>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Validation rules
  const validationRules: ValidationRules = {
    "property-address": { required: true },
    "leasing-info": { required: true },
    charges: { required: true },
    "rent-frequency": { required: true },
  };

  const { validateForm, showErrors, setShowErrors } =
    useFormValidation(validationRules);

  const getValidationErrors = () => {
    const errors: Record<string, string> = {};
    const requiredFields = [
      "property-address",
      "leasing-info",
      "charges",
      "rent-frequency",
    ];

    requiredFields.forEach((fieldId) => {
      const data = formData[fieldId];
      if (!data || data === null || data === "") {
        switch (fieldId) {
          case "property-address":
            errors[fieldId] = "Property address information is required";
            break;
          case "leasing-info":
            errors[fieldId] = "Leasing manager information is required";
            break;
          case "charges":
            errors[fieldId] =
              "Application and admin fee information is required";
            break;
          case "rent-frequency":
            errors[fieldId] =
              "Rent payment frequency and due dates are required";
            break;
          default:
            errors[fieldId] = "This field is required";
        }
      }
    });

    return errors;
  };

  const isFormValid = () => {
    const errors = getValidationErrors();
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    setShowErrors(true);
    if (isFormValid()) {
      onNext?.();
    }
  };

  // Modal and data management functions
  const handleAddData = (fieldId: string, data: any) => {
    if (MULTIPLE_ENTRY_FIELDS.includes(fieldId)) {
      if (editingIndex !== null) {
        setFormData((prev) => {
          const currentData = prev[fieldId] || [];
          const newData = [...currentData];
          newData[editingIndex] = Array.isArray(data) ? data[0] : data;
          return { ...prev, [fieldId]: newData };
        });
      } else {
        setFormData((prev) => ({
          ...prev,
          [fieldId]: [
            ...(prev[fieldId] || []),
            ...(Array.isArray(data) ? data : [data]),
          ],
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [fieldId]: data }));
    }
    closeModal();
  };

  const handleDeleteData = (fieldId: string) => {
    setFormData((prev) => {
      const newData = { ...prev };
      delete newData[fieldId];
      return newData;
    });
  };

  const handleDeleteItem = (fieldId: string, index: number) => {
    setFormData((prev) => {
      const currentData = prev[fieldId] || [];
      const newData = currentData.filter((_: any, i: number) => i !== index);
      return { ...prev, [fieldId]: newData.length > 0 ? newData : undefined };
    });
  };

  const openModalForEditItem = (fieldId: string, index: number) => {
    const currentData = formData[fieldId];
    if (currentData && currentData[index]) {
      setEditingData(currentData[index]);
      setEditingIndex(index);
      setOpenModal(fieldId);
    }
  };

  const openModalForEdit = (fieldId: string) => {
    setEditingData(formData[fieldId] || null);
    setEditingIndex(null);
    setOpenModal(fieldId);
  };

  const openModalForAdd = (fieldId: string) => {
    setEditingData(null);
    setEditingIndex(null);
    setOpenModal(fieldId);
  };

  const closeModal = () => {
    setOpenModal(null);
    setEditingData(null);
    setEditingIndex(null);
  };

  // Content rendering functions
  const renderMultipleEntryContent = (fieldId: string, data: any[]) => (
    <div className="space-y-2">
      {data.map((item: any, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 bg-gray-50 rounded"
        >
          <p className="text-sm text-gray-900">
            {getItemDisplayText(fieldId, item)}
          </p>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-blue-600"
              onClick={() => openModalForEditItem(fieldId, index)}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-red-600"
              onClick={() => handleDeleteItem(fieldId, index)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const getItemDisplayText = (fieldId: string, item: any): string => {
    switch (fieldId) {
      case "pet-fees":
        return `${item.type}, Max weight: ${item.weight}, Monthly pet rent: ${item.monthly}`;
      case "educational-institution":
      case "nearest-stations":
      case "nearest-landmark":
        return `${item.type}, ${item.name}`;
      case "utilities-provider":
        return `${item.type} - ${item.name}`;
      default:
        return JSON.stringify(item);
    }
  };

  const renderFieldContent = (fieldId: string) => {
    const data = formData[fieldId];
    if (!data) return null;

    // Handle multiple entry fields
    if (MULTIPLE_ENTRY_FIELDS.includes(fieldId) && Array.isArray(data)) {
      return renderMultipleEntryContent(fieldId, data);
    }

    // Handle single entry fields
    switch (fieldId) {
      case "property-address":
        return (
          <div className="space-y-2">
            <p className="text-sm text-gray-900">{data.name}</p>
            <p className="text-sm text-gray-600">{data.address}</p>
          </div>
        );
      case "leasing-info":
        return (
          <div className="space-y-1">
            <p className="text-sm text-gray-900">
              Leasing manager: {data.manager}
            </p>
            <p className="text-sm text-gray-600">
              {data.phone} | {data.address}
            </p>
          </div>
        );
      case "charges":
        return (
          <p className="text-sm text-gray-900">
            Application fee: {data.application}
          </p>
        );
      case "rent-frequency":
        return (
          <div className="space-y-1">
            <p className="text-sm text-gray-900">
              Rent payment frequency: {data.frequency}
            </p>
            <p className="text-sm text-gray-600">
              Rent reminder date: {data.reminder}
            </p>
            <p className="text-sm text-gray-600">Rent due date: {data.due}</p>
          </div>
        );
      case "application-agreement":
        return (
          <div className="space-y-1">
            <p className="text-sm text-gray-900">{data.document}</p>
            {data.acceptImmigrant && (
              <p className="text-sm text-gray-600">
                Accept immigrant & international student application
              </p>
            )}
          </div>
        );
      case "about-property":
        return <p className="text-sm text-gray-900">{data}</p>;
      case "community-amenity":
        return (
          <div className="flex flex-wrap gap-2">
            {data.map((amenity: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                {amenity}
              </Badge>
            ))}
          </div>
        );
      case "parking":
        return (
          <div className="space-y-1">
            <p className="text-sm text-gray-900">Parking(optional)</p>
            <p className="text-sm text-gray-900">
              Guest vehicle parking time: {data.guestTime}
            </p>
            <p className="text-sm text-gray-600">{data.overview}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderFormColumn = (fields: FormField[]) => {
    const errors = getValidationErrors();

    return (
      <Card className="p-6 !border-0 !shadow-none">
        <div className="space-y-3 ">
          {fields.map((field) => {
            const hasData = formData[field.id];
            const isMultipleEntry = MULTIPLE_ENTRY_FIELDS.includes(field.id);

            return (
              <FormFieldRow
                key={field.id}
                field={field}
                hasData={hasData}
                isMultipleEntry={isMultipleEntry}
                error={errors[field.id]}
                showError={showErrors}
                onAdd={() => openModalForAdd(field.id)}
                onEdit={() => openModalForEdit(field.id)}
                onDelete={
                  !field.required ? () => handleDeleteData(field.id) : undefined
                }
              >
                {renderFieldContent(field.id)}
              </FormFieldRow>
            );
          })}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto p-6">
        <AppHeader />

        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Condominiums information
        </h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {renderFormColumn(LEFT_COLUMN_FIELDS)}
          {renderFormColumn(RIGHT_COLUMN_FIELDS)}
        </div>

        {/* Property Gallery Section */}
        <Card className="p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Property gallery
              <span className="text-red-500">(Its not unit photo)*</span>
            </h3>
          </div>
          <PhotoUploadGrid />
        </Card>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" className="text-gray-600" onClick={onBack}>
            Back
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>

        {/* All Modals */}
        <ChargesModal
          isOpen={openModal === "charges"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("charges", data)}
          editingData={editingData}
        />
        <PropertyAddressModal
          isOpen={openModal === "property-address"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("property-address", data)}
          editingData={editingData}
        />
        <LeasingInfoModal
          isOpen={openModal === "leasing-info"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("leasing-info", data)}
          editingData={editingData}
        />
        <RentFrequencyModal
          isOpen={openModal === "rent-frequency"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("rent-frequency", data)}
          editingData={editingData}
        />
        <ApplicationAgreementModal
          isOpen={openModal === "application-agreement"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("application-agreement", data)}
          editingData={editingData}
        />
        <AboutPropertyModal
          isOpen={openModal === "about-property"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("about-property", data)}
          editingData={editingData}
        />
        <PetFeesModal
          isOpen={openModal === "pet-fees"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("pet-fees", data)}
          editingData={editingData}
        />
        <AmenitiesModal
          isOpen={openModal === "community-amenity"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("community-amenity", data)}
          editingData={editingData}
        />
        <ParkingModal
          isOpen={openModal === "parking"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("parking", data)}
          editingData={editingData}
        />
        <LandmarkModal
          isOpen={openModal === "nearest-landmark"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("nearest-landmark", data)}
          editingData={editingData}
        />
        <NearestStationModal
          isOpen={openModal === "nearest-stations"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("nearest-stations", data)}
          editingData={editingData}
        />
        <EducationalInstitutionModal
          isOpen={openModal === "educational-institution"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("educational-institution", data)}
          editingData={editingData}
        />
        <UtilitiesProviderModal
          isOpen={openModal === "utilities-provider"}
          onClose={closeModal}
          onAdd={(data) => handleAddData("utilities-provider", data)}
          editingData={editingData}
        />
      </div>
    </div>
  );
}
