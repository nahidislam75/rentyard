"use client";

import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SelectOption } from "../../types";

// Selection Card Component
interface SelectionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function SelectionCard({
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
}: SelectionCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-sm",
        isSelected
          ? "border-blue-500 bg-blue-50/30"
          : "border-gray-200 hover:border-gray-300"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Icon
            className={cn(
              "h-6 w-6",
              isSelected ? "text-blue-600" : "text-gray-600"
            )}
          />
          <div>
            <h3
              className={cn(
                "text-sm font-medium mb-1",
                isSelected ? "text-blue-900" : "text-gray-900"
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "text-sm",
                isSelected ? "text-blue-700" : "text-gray-500"
              )}
            >
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Form Input Component
interface FormInputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "tel" | "select";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options?: SelectOption[];
  required?: boolean;
  error?: string;
  showError?: boolean;
}

export function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  options,
  required,
  error,
  showError = false,
}: FormInputProps) {
  const hasError = error && showError;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-bold text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>

      {type === "select" ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            className={cn(
              "bg-white border-gray-200",
              hasError && "border-red-500"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={cn(
            "bg-white border-gray-200",
            hasError && "border-red-500"
          )}
        />
      )}

      {hasError && (
        <div className="flex items-center space-x-1">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-600">{error}</span>
        </div>
      )}
    </div>
  );
}

// File Upload Component
interface FileUploadProps {
  label: string;
}

export function FileUpload({ label }: FileUploadProps) {
  return (
    <Card className="border-dashed border-2 border-gray-200 hover:border-gray-300 bg-gray-50 h-10 cursor-pointer">
      <CardContent className="">
        <div className="flex items-center justify-center space-y-2 text-center">
          <Download className="h-5 w-5 text-gray-400 mt-1" />
          <span className="text-sm ml-2 text-gray-500">(Pdf only)</span>
        </div>
      </CardContent>
    </Card>
  );
}

// App Header Component
interface AppHeaderProps {
  onSaveExit?: () => void;
  showSaveExit?: boolean;
}

export function AppHeader({ onSaveExit, showSaveExit = true }: AppHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b-2">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">R</span>
        </div>
        <span className="text-xl font-semibold text-blue-600">RentYard</span>
      </div>
      {showSaveExit && (
        <Button
          variant="outline"
          className="bg-white text-gray-600 border-gray-300"
          onClick={onSaveExit}
        >
          Save & Exit
        </Button>
      )}
    </div>
  );
}
