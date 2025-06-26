// Centralized validation functions
export const validateEmail = (value: string): string | null =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email format"

export const validatePhone = (value: string): string | null =>
  /^[+]?[\d\s\-()]{10,}$/.test(value) ? null : "Invalid phone number"

export const validateZip = (value: string): string | null =>
  /^\d{5}(-\d{4})?$/.test(value) ? null : "Invalid zip code format"

export const validateLicense = (value: string): string | null =>
  value.length >= 6 ? null : "License must be at least 6 characters"

export const validateCompanyId = (value: string): string | null =>
  value.length >= 9 ? null : "EIN/TIN must be at least 9 characters"
