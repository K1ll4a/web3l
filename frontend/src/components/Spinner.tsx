import React from "react";
import "./Spinner.css";

interface SpinnerProps {
  label: string;
  value: string | null;
  options: string[];
  onChange: (value: string) => void;
}

export const Spinner: React.FC<SpinnerProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const currentIndex = value ? options.indexOf(value) : -1;

  const handleDecrement = () => {
    if (currentIndex > 0) {
      onChange(options[currentIndex - 1]);
    }
  };

  const handleIncrement = () => {
    if (currentIndex < options.length - 1) {
      onChange(options[currentIndex + 1]);
    }
  };

  return (
    <div className="spinner">
      <label>{label}</label>
      <div className="spinner-controls">
        <button onClick={handleDecrement} disabled={currentIndex <= 0}>
          −
        </button>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Выберите"
        />
        <button onClick={handleIncrement} disabled={currentIndex >= options.length - 1}>
          +
        </button>
      </div>
    </div>
  );
};
