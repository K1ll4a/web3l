import React from "react";

const R_VALUES = [-5, -4, -3, -2, -1, 0, 1, 2, 3];

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export const SpinnerR: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="field">
      <label>R</label>
      <div className="chips">
        {R_VALUES.map((r) => (
          <button
            key={r}
            type="button"
            className={`chip ${value === r ? "active" : ""}`}
            onClick={() => onChange(r)}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
};
