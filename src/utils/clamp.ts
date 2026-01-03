/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Clamp a number between 0 and 1
 */
export function clamp01(value: number): number {
  return clamp(value, 0, 1)
}

/**
 * Clamp a number between 0 and 255
 */
export function clamp0255(value: number): number {
  return clamp(value, 0, 255)
}

/**
 * Clamp a number between 0 and 100
 */
export function clamp0100(value: number): number {
  return clamp(value, 0, 100)
}

/**
 * Clamp a number between 0 and 360
 */
export function clamp0360(value: number): number {
  return clamp(value, 0, 360)
}
