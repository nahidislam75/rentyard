"use client"

import { useState, useCallback } from "react"

export interface ValidationRule {
  required?: boolean
}

export interface ValidationRules {
  [key: string]: ValidationRule
}

export function useFormValidation(rules: ValidationRules) {
  const [showErrors, setShowErrors] = useState(false)

  const validateForm = useCallback(
    (data: Record<string, any>) => {
      const errs: Record<string, string> = {}
      Object.entries(rules).forEach(([key, rule]) => {
        if (rule.required && (data[key] === undefined || data[key] === null || data[key] === "")) {
          errs[key] = "Required"
        }
      })
      return errs
    },
    [rules],
  )

  return { validateForm, showErrors, setShowErrors }
}
