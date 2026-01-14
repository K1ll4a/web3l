export function isHit(x: number, y: number, r: number): boolean {
  if (r <= 0) return false;

  if (x >= 0 && x <= r && y <= 0 && y >= -r) {
    return true;
  }

  if (x >= 0 && y >= 0 && y <= (-x + r / 2)) {
    return true;
  }

  if (x <= 0 && y >= 0 && (x * x + y * y) <= (r * r) / 4) {
    return true;
  }

  return false;
}
