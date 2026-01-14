import { GraphCanvas } from "./GraphCanvas";

type Props = {
  r: number;
  onPointClick: (x: number, y: number) => void;
};

export const Graph: React.FC<Props> = ({ r, onPointClick }) => {
  return <GraphCanvas r={r} onPointClick={onPointClick} />;
};
