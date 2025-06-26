"use client"

import { useState, useCallback, useMemo } from "react"
import type { FormData, UserRole, PropertyType } from "../types"
import { validateEmail, validatePhone, validateZip, validateLicense, validateCompanyId } from "../lib/validation"

export function useFormState() {
  const [formData, setFormData] = useState<FormData>({})
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showErrors, setShowErrors] = useState(false)
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})

  const validateField = useCallback((fieldId: string, value: string): string => {
    switch (fieldId) {
      case "realtorLicenseNumber":
        return validateLicense(value) || ""
      case "companyId":
        return validateCompanyId(value) || ""
      case "email":
        return validateEmail(value) || ""
      case "phone":
        return validatePhone(value) || ""
      case "zipCode":
        return validateZip(value) || ""
      default:
        return ""
    }
  }, [])

  const updateField = useCallback(
    (fieldId: string, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [fieldId]: value }))
      if (typeof value === "string") {
        const fieldError = validateField(fieldId, value)
        setErrors((prev) => ({ ...prev, [fieldId]: fieldError }))
      }
    },
    [validateField],
  )

  const handleFieldBlur = useCallback(
    (fieldId: string) => {
      setTouchedFields((prev) => ({ ...prev, [fieldId]: true }))
      const value = formData[fieldId] as string
      if (value !== undefined) {
        const fieldError = validateField(fieldId, value)
        setErrors((prev) => ({ ...prev, [fieldId]: fieldError }))
      }
    },
    [formData, validateField],
  )

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (!propertyType) newErrors.propertyType = "Please select a property type"
    if (!userRole) newErrors.userRole = "Please select your role"
    if (!acceptTerms) newErrors.acceptTerms = "You must accept the terms and conditions"

    if (userRole === "realtor") {
      if (!formData.realtorLicenseNumber) {
        newErrors.realtorLicenseNumber = "License number is required"
      } else {
        const licenseError = validateLicense(formData.realtorLicenseNumber as string)
        if (licenseError) newErrors.realtorLicenseNumber = licenseError
      }
    }

    if (userRole === "property-management") {
      const requiredFields = [
        "companyName",
        "companyId",
        "jobTitle",
        "country",
        "streetAddress",
        "phone",
        "email",
        "city",
        "state",
        "zipCode",
      ]
      requiredFields.forEach((id) => {
        if (!formData[id]) {
          newErrors[id] = `${id.replace(/([A-Z])/g, " $1").toLowerCase()} is required`
        } else {
          const fieldError = validateField(id, formData[id] as string)
          if (fieldError) newErrors[id] = fieldError
        }
      })
    }

    setErrors(newErrors)
    setShowErrors(true)
    return Object.keys(newErrors).length === 0
  }, [propertyType, userRole, acceptTerms, formData, validateField])

  const isValid = useMemo(() => {
    if (!propertyType || !userRole || !acceptTerms) return false
    const hasErrors = Object.values(errors).some((error) => error !== "")
    if (hasErrors) return false

    if (userRole === "realtor") return Boolean(formData.realtorLicenseNumber)
    if (userRole === "property-management") {
      const required = [
        "companyName",
        "companyId",
        "jobTitle",
        "country",
        "streetAddress",
        "phone",
        "email",
        "city",
        "state",
        "zipCode",
      ]
      return required.every((field) => formData[field])
    }
    return true
  }, [propertyType, userRole, acceptTerms, formData, errors])

  return {
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
  }
}
