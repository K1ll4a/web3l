import React from "react";

const X_VALUES = [-5, -4, -3, -2, -1, 0, 1, 2, 3];

type Props = {
  value: number | null;
  onChange: (v: number) => void;
};

export const SpinnerX: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="field">
      <label>X</label>
      <div className="chips">
        {X_VALUES.map((x) => (
          <button
            key={x}
            type="button"
            className={`chip ${value === x ? "active" : ""}`}
            onClick={() => onChange(x)}
          >
            {x}
          </button>
        ))}
      </div>
    </div>
  );
};
