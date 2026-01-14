import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export const SpinnerY: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="field">
      <label>Y (от -3 до 3)</label>
      <input
        className="input"
        type="text"
        value={value}
        placeholder="-3 ... 3"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
