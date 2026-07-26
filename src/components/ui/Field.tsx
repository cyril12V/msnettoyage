"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

const controlClasses =
  "w-full rounded-md border bg-white px-3.5 text-sm text-ink transition-colors placeholder:text-muted-light focus:border-brand focus:outline-none";

/** Un libellé de champ se lit en casse normale : c'est un mot, pas une étiquette décorative. */
const labelClasses = "text-sm font-medium text-ink-soft";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

function FieldShell({ id, label, error, hint, required, className, children }: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required ? (
          <span className="text-brand ml-1" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-muted text-xs">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-danger text-xs font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Attributs ARIA reliant un champ à son message d'erreur ou à son aide. */
function describedBy(id: string, error?: string, hint?: string): string | undefined {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
};

export function TextField({ label, error, hint, className, required, ...props }: TextFieldProps) {
  const id = useId();

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClasses, "h-12", error ? "border-danger" : "border-line")}
        {...props}
      />
    </FieldShell>
  );
}

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className"> & {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
};

export function SelectField({
  label,
  error,
  hint,
  className,
  options,
  placeholder,
  required,
  ...props
}: SelectFieldProps) {
  const id = useId();

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClasses, "h-12", error ? "border-danger" : "border-line")}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

type TextareaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className"> & {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
};

export function TextareaField({
  label,
  error,
  hint,
  className,
  required,
  ...props
}: TextareaFieldProps) {
  const id = useId();

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(
          controlClasses,
          "min-h-32 resize-y py-3",
          error ? "border-danger" : "border-line",
        )}
        {...props}
      />
    </FieldShell>
  );
}

type CheckboxFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "className" | "type"
> & {
  label: ReactNode;
  error?: string;
  className?: string;
};

export function CheckboxField({ label, error, className, required, ...props }: CheckboxFieldProps) {
  const id = useId();

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "accent-brand mt-0.5 size-4.5 shrink-0 rounded border",
            error ? "border-danger" : "border-line",
          )}
          {...props}
        />
        <label htmlFor={id} className="text-muted text-xs leading-relaxed">
          {label}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-danger text-xs font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}
