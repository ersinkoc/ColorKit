import { describe, it, expect } from 'vitest'
import { generateTints } from '../../src/palette/tints.js'
import { ColorClass } from '../../src/core/color.js'

describe('generateTints', () => {
  it('should generate default number of tints', () => {
    const color = new ColorClass(100, 0, 0)
    const tints = generateTints(color)

    expect(tints).toHaveLength(11) // default count
  })

  it('should generate lighter colors', () => {
    const color = new ColorClass(100, 0, 0)
    const tints = generateTints(color)

    // First tint should be original
    expect(tints[0]?.toHex()).toBe(color.toHex())

    // Last tint should be lighter (closer to white)
    const originalL = color.toHsl().l
    const lastL = tints[tints.length - 1]?.toHsl().l
    expect(lastL).toBeGreaterThan(originalL)
  })

  it('should accept HEX string', () => {
    const tints = generateTints('#800000')
    expect(tints).toHaveLength(11)
  })

  it('should accept RGB object', () => {
    const tints = generateTints({ r: 128, g: 0, b: 0 })
    expect(tints).toHaveLength(11)
  })

  it('should respect custom count', () => {
    const color = new ColorClass(100, 0, 0)
    const tints = generateTints(color, 5)

    expect(tints).toHaveLength(5)
  })

  it('should preserve alpha', () => {
    const color = new ColorClass(100, 0, 0, 0.5)
    const tints = generateTints(color)

    tints.forEach(tint => {
      expect(tint.alpha()).toBe(0.5)
    })
  })

  it('should return ColorClass instances', () => {
    const color = new ColorClass(100, 0, 0)
    const tints = generateTints(color)

    tints.forEach(tint => {
      expect(tint).toBeInstanceOf(ColorClass)
    })
  })

  it('should approach white at max tint', () => {
    const color = new ColorClass(100, 0, 0)
    const tints = generateTints(color)

    const lastTint = tints[tints.length - 1]
    expect(lastTint?.toHex()).toBe('#ffffff')
  })
})
