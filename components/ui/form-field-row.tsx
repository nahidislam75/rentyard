"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldMeta {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  recommended?: boolean;
  note?: string;
}

interface FormFieldRowProps {
  field: FormFieldMeta;
  hasData: boolean;
  isMultipleEntry: boolean;
  error?: string;
  showError?: boolean;
  onAdd: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
}

export function FormFieldRow({
  field,
  hasData,
  isMultipleEntry,
  error,
  showError = false,
  onAdd,
  onEdit,
  onDelete,
  children,
}: FormFieldRowProps) {
  const hasError = !!error && showError;

  const labelExtras = () => {
    if (field.required) return "(Required)";
    if (field.recommended) return "(Optional but recommended)";
    if (field.optional) return "(Optional)";
    return "";
  };

  return (
    <div
      className={cn(
        "py-4 border-2 px-2 border-gray-100 rounded-3xl ",
        hasError && "bg-red-50 px-4 rounded-3xl"
      )}
    >
      {/* top row */}
      <div className="flex items-start justify-between mb-2">
        <span
          className={cn(
            "text-sm",
            field.required ? "text-red-500" : "text-gray-600"
          )}
        >
          {field.label} {labelExtras()}
          {field.note && ` (${field.note})`}
        </span>

        <div className="flex space-x-2">
          {hasData ? (
            <>
              {isMultipleEntry ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAdd}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add&nbsp;More
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onEdit}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
              {!field.required && onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdd}
              className="text-blue-600 hover:bg-blue-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      </div>

      {hasData && children && <div className="mt-2">{children}</div>}

      {hasError && (
        <div className="flex items-center space-x-1 mt-2">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-600">{error}</span>
        </div>
      )}
    </div>
  );
}
