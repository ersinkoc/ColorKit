/**
 * Linear interpolation between two values
 * @param start - Start value
 * @param end - End value
 * @param t - Interpolation factor (0-1)
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}
