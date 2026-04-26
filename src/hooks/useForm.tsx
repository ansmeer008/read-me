// src/hooks/useForm.ts
import { useState, useCallback, ChangeEvent } from 'react';

type FieldValues = Record<string, string>;

type FieldErrors<T extends FieldValues> = Partial<Record<keyof T, string>>;

type Validators<T extends FieldValues> = Partial<
  Record<keyof T, (value: string) => string | undefined>
>;

interface UseFormReturn<T extends FieldValues> {
  values: T;
  errors: FieldErrors<T>;
  isValid: boolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (onSubmit: (values: T) => void) => (e: React.FormEvent) => void;
  reset: () => void;
}

export function useForm<T extends Record<keyof T, string>>(
  initialValues: T,
  validators?: Validators<T>,
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FieldErrors<T>>({});

  const validate = useCallback(
    (name: keyof T, value: string): string | undefined => {
      return validators?.[name]?.(value);
    },
    [validators],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // 입력 중 실시간 에러 해제
      const error = validate(name as keyof T, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validate],
  );

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) => (e: React.FormEvent) => {
      e.preventDefault();

      // 전체 필드 유효성 검사
      const newErrors: FieldErrors<T> = {};
      let hasError = false;

      (Object.keys(values) as (keyof T)[]).forEach((key) => {
        const error = validate(key, values[key]);
        if (error) {
          newErrors[key] = error;
          hasError = true;
        }
      });

      if (hasError) {
        setErrors(newErrors);
        return;
      }

      onSubmit(values);
    },
    [values, validate],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const isValid = Object.values(errors).every((e) => !e);

  return { values, errors, isValid, handleChange, handleSubmit, reset };
}
