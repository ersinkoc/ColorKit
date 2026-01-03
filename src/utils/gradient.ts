import type { ColorInput, GradientStop, GradientOptions, Gradient } from '../types.js'
import { parseColor } from '../core/parse.js'

/**
 * Create a CSS gradient string
 */
export function createGradient(
  stops: GradientStop[],
  options: GradientOptions = {}
): string {
  const { type = 'linear', angle = 90 } = options

  const sortedStops = [...stops].sort((a, b) => a.position - b.position)

  const stopsStr = sortedStops
    .map(stop => {
      const c = parseColor(stop.color)
      return c ? `${c.toHex()} ${stop.position}%` : ''
    })
    .filter(Boolean)
    .join(', ')

  if (type === 'radial') {
    return `radial-gradient(circle, ${stopsStr})`
  }

  return `linear-gradient(${angle}deg, ${stopsStr})`
}

/**
 * Parse a CSS gradient string
 */
export function parseGradient(css: string): Gradient | null {
  const linearMatch = css.match(/linear-gradient\((\d+)deg,\s*(.+)\)/)
  const radialMatch = css.match(/radial-gradient\((.+)\)/)

  if (linearMatch) {
    const angle = parseInt(linearMatch[1]!, 10)
    const stops = parseStops(linearMatch[2]!)
    return { type: 'linear', angle, stops }
  }

  if (radialMatch) {
    const stops = parseStops(radialMatch[1]!)
    return { type: 'radial', angle: 0, stops }
  }

  return null
}

function parseStops(stopsStr: string): Array<{ color: string; position: number }> {
  return stopsStr.split(',').map(stop => {
    const parts = stop.trim().split(/\s+/)
    const color = parts[0]!
    const position = parts[1] !== undefined ? parseFloat(parts[1]) : 0
    return {
      color,
      position
    }
  })
}
