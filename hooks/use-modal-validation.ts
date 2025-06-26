"use client";

import { useState, useCallback } from "react";
import type { FieldConfig } from "../types";

export function useModalValidation(fields: FieldConfig[]) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [showErrors, setShowErrors] = useState(false);

  const validateField = useCallback(
    (fieldId: string, value: any, field: FieldConfig): string => {
      if (
        !field.required &&
        (value === "" || value === null || value === undefined)
      )
        return "";
      if (
        field.required &&
        (value === "" || value === null || value === undefined)
      ) {
        return `${field.label} is required`;
      }

      const rules = field.validation;
      if (rules) {
        if (rules.minLength && String(value).length < rules.minLength) {
          return `${field.label} must be at least ${rules.minLength} characters`;
        }
        if (rules.maxLength && String(value).length > rules.maxLength) {
          return `${field.label} must be no more than ${rules.maxLength} characters`;
        }
        if (rules.pattern && !rules.pattern.test(String(value))) {
          return `${field.label} format is invalid`;
        }
        if (rules.custom) {
          const customError = rules.custom(String(value));
          if (customError) return customError;
        }
      }
      return "";
    },
    []
  );

  const validateForm = useCallback(
    (formData: Record<string, any>): boolean => {
      const newErrors: Record<string, string> = {};
      fields.forEach((field) => {
        const value = formData[field.id];
        const error = validateField(field.id, value, field);
        if (error) newErrors[field.id] = error;
      });
      setErrors(newErrors);
      setShowErrors(true);
      return Object.keys(newErrors).length === 0;
    },
    [fields, validateField]
  );

  const handleFieldBlur = useCallback(
    (fieldId: string, value: any) => {
      setTouchedFields((prev) => ({ ...prev, [fieldId]: true }));
      const field = fields.find((f) => f.id === fieldId);
      if (field) {
        const error = validateField(fieldId, value, field);
        setErrors((prev) => ({ ...prev, [fieldId]: error }));
      }
    },
    [fields, validateField]
  );

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouchedFields({});
    setShowErrors(false);
  }, []);

  return {
    errors,
    touchedFields,
    showErrors,
    validateForm,
    handleFieldBlur,
    resetValidation,
  };
}
