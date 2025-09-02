import { useState, useCallback } from 'react';

export type ValidationSchema<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined;
};

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: ValidationSchema<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const setFieldValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validate = useCallback((): boolean => {
    if (!validationSchema) return true;
    
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.entries(validationSchema).forEach(([field, validator]) => {
      if (validator) {
        const error = validator(values[field as keyof T]);
        if (error) {
          newErrors[field as keyof T] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationSchema]);

  const validateField = useCallback(<K extends keyof T>(field: K): boolean => {
    if (!validationSchema?.[field]) return true;
    
    const validator = validationSchema[field];
    const error = validator!(values[field]);
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  }, [values, validationSchema]);

  const handleSubmit = useCallback(async (
    onSubmit: (values: T) => Promise<void> | void
  ) => {
    if (!validate()) return false;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
      return true;
    } catch (error) {
      console.error('Error en submit:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate]);

  const resetForm = useCallback((newValues?: Partial<T>) => {
    setValues(newValues ? { ...initialValues, ...newValues } : initialValues);
    setErrors({});
    setIsSubmitting(false);
    setIsDirty(false);
  }, [initialValues]);

  const hasErrors = Object.keys(errors).length > 0;
  const isValid = !hasErrors;

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    hasErrors,
    isValid,
    
    setFieldValue,
    setValues,
    validate,
    validateField,
    handleSubmit,
    resetForm
  };
}