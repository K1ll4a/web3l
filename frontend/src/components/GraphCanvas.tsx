import { useEffect, useRef, useState } from "react";

type Props = {
  r: number;
  onPointClick: (x: number, y: number) => void;
};

export const GraphCanvas: React.FC<Props> = ({ r, onPointClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = 300;
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    
    // Рисуем белый фон
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);

    const center = size / 2;

    // Рисуем оси всегда
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, center);
    ctx.lineTo(size, center);
    ctx.moveTo(center, 0);
    ctx.lineTo(center, size);
    ctx.stroke();

    // Рисуем фигуры если r != 0 (используем абсолютное значение для отрисовки)
    const absR = Math.abs(r);
    if (absR > 0) {
      const unit = size / (2 * absR);

      ctx.fillStyle = "rgba(0, 0, 255, 0.4)";

      // Прямоугольник (Q4)
      ctx.fillRect(center, center, absR * unit, absR * unit);

      // Треугольник (Q1)
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(center + (absR / 2) * unit, center);
      ctx.lineTo(center, center - (absR / 2) * unit);
      ctx.closePath();
      ctx.fill();

      // Четверть круга (Q2)
      ctx.beginPath();
      ctx.arc(center, center, (absR / 2) * unit, Math.PI / 2, Math.PI);
      ctx.lineTo(center, center);
      ctx.closePath();
      ctx.fill();
    }

    // Рисуем последнюю нажатую точку
    if (lastPoint && absR > 0) {
      const unit = size / (2 * absR);
      const canvasX = center + lastPoint.x * unit;
      const canvasY = center - lastPoint.y * unit;

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [r, lastPoint]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (r === 0) return; // Игнорируем клики при r = 0

    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    const dx = e.clientX - rect.left - size / 2;
    const dy = size / 2 - (e.clientY - rect.top);

    const absR = Math.abs(r);
    const unit = size / (2 * absR);

    const x = dx / unit;
    const y = dy / unit;

    // Сохраняем точку для отрисовки
    setLastPoint({ x, y });

    onPointClick(x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onClick={handleClick}
      style={{ border: "1px solid #000" }}
    />
  );
};
