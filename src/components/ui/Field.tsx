import React from 'react';

export interface FieldProps {
  label: string;
  value: string | number | undefined | null;
  onChange: (value: string) => void;
  type?: string;
  options?: string[] | null;
  placeholder?: string;
  rows?: number;
  help?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Field: React.FC<FieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  options,
  placeholder,
  rows = 4,
  help,
  required = false,
  disabled = false,
}) => {
  return (
    <label className="field">
      <span>
        {label}
        {required && <em> *</em>}
      </span>
      {type === 'textarea' ? (
        <textarea
          disabled={disabled}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
        />
      ) : options ? (
        <select
          disabled={disabled}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          disabled={disabled}
          type={type}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      {help && <small>{help}</small>}
    </label>
  );
};

export default Field;
