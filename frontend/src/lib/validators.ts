// ============================================
// FORM VALIDATION UTILITIES
// ============================================

export type ValidationResult = { valid: boolean; message?: string }

// Email
export function validateEmail(email: string): ValidationResult {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) return { valid: false, message: 'Email is required' }
  if (!re.test(email)) return { valid: false, message: 'Enter a valid email address' }
  return { valid: true }
}

// Password strength
export function validatePassword(password: string): ValidationResult & { strength: number } {
  if (!password) return { valid: false, message: 'Password is required', strength: 0 }
  if (password.length < 8) return { valid: false, message: 'At least 8 characters required', strength: 1 }

  let strength = 1
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  if (password.length >= 12) strength++

  return { valid: strength >= 3, message: strength < 3 ? 'Add uppercase, numbers, or symbols' : undefined, strength }
}

// Name
export function validateName(name: string): ValidationResult {
  if (!name?.trim()) return { valid: false, message: 'Name is required' }
  if (name.trim().length < 2) return { valid: false, message: 'Name must be at least 2 characters' }
  if (name.trim().length > 100) return { valid: false, message: 'Name must be less than 100 characters' }
  return { valid: true }
}

// Phone
export function validatePhone(phone: string): ValidationResult {
  if (!phone) return { valid: true } // Phone optional
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length < 10 || cleaned.length > 15) return { valid: false, message: 'Enter a valid phone number' }
  return { valid: true }
}

// Price range
export function validatePriceRange(min: number, max: number): ValidationResult {
  if (min < 0) return { valid: false, message: 'Minimum price cannot be negative' }
  if (max < min) return { valid: false, message: 'Maximum price must be greater than minimum' }
  return { valid: true }
}

// Required field
export function validateRequired(value: string | undefined | null, fieldName = 'This field'): ValidationResult {
  if (!value?.trim()) return { valid: false, message: `${fieldName} is required` }
  return { valid: true }
}

// Quantity
export function validateQuantity(value: number, max = 99): ValidationResult {
  if (!Number.isInteger(value) || value < 1) return { valid: false, message: 'Quantity must be at least 1' }
  if (value > max) return { valid: false, message: `Maximum quantity is ${max}` }
  return { valid: true }
}

// Budget
export function validateBudget(value: number): ValidationResult {
  if (value < 0) return { valid: false, message: 'Budget cannot be negative' }
  if (value > 100_000) return { valid: false, message: 'Budget exceeds maximum allowed' }
  return { valid: true }
}

// Multi-field form validator
export type FormFields = Record<string, string | number | undefined>
export type FormErrors = Record<string, string>

export function validateForm(
  fields: FormFields,
  rules: Record<string, (value: string | number | undefined) => ValidationResult>
): { valid: boolean; errors: FormErrors } {
  const errors: FormErrors = {}
  for (const [key, validate] of Object.entries(rules)) {
    const result = validate(fields[key])
    if (!result.valid && result.message) {
      errors[key] = result.message
    }
  }
  return { valid: Object.keys(errors).length === 0, errors }
}
