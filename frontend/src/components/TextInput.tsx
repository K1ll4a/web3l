import React from "react";
import "./TextInput.css";

interface TextInputProps {
  label: string;
  value: string;
  min?: number;
  max?: number;
  onChange: (value: string) => void;
  onError?: (error: string | null) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  min = -3,
  max = 3,
  onChange,
  onError,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(input);

    if (input === "") {
      onError?.(null);
      return;
    }

    const num = parseFloat(input);
    if (isNaN(num)) {
      onError?.("Введите число");
      return;
    }
    if (num < min || num > max) {
      onError?.(`Число должно быть от ${min} до ${max}`);
      return;
    }
    onError?.(null);
  };

  return (
    <div className="text-input">
      <label>{label}</label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder="От -3 до 3"
        min={min}
        max={max}
        step="0.1"
      />
    </div>
  );
};
