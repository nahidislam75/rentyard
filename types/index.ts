// Core type definitions
export type PropertyType = "single" | "apartments" | "condominiums"
export type UserRole = "landlord" | "realtor" | "property-management"
export type CurrentStep = "form" | "condominiums-info" | "pricing"

export interface SelectOption {
  value: string
  label: string
}

export interface FormData {
  [key: string]: string | boolean
}

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

export interface FieldConfig {
  id: string
  label: string
  required?: boolean
  validation?: ValidationRule
}
