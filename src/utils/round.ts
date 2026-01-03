/**
 * Round a number to specified precision
 */
export function round(value: number, precision: number = 0): number {
  const multiplier = Math.pow(10, precision)
  return Math.round(value * multiplier) / multiplier
}

/**
 * Round to nearest integer (for byte values)
 */
export function roundToByte(value: number): number {
  return Math.round(value)
}

/**
 * Round to 1 decimal place
 */
export function roundTo1(value: number): number {
  return round(value, 1)
}
