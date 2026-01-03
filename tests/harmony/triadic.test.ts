import { describe, it, expect } from 'vitest'
import { getTriadic } from '../../src/harmony/triadic.js'
import { ColorClass } from '../../src/core/color.js'

describe('getTriadic', () => {
  it('should return 3 colors', () => {
    const color = new ColorClass(255, 0, 0)
    const triadic = getTriadic(color)

    expect(triadic).toHaveLength(3)
    triadic.forEach(c => expect(c).toBeInstanceOf(ColorClass))
  })

  it('should space colors 120 degrees apart', () => {
    const color = new ColorClass(255, 0, 0) // Red (hue 0)
    const triadic = getTriadic(color)

    const hues = triadic.map(c => c.toHsl().h)
    expect(hues[0]).toBe(0) // Red
    expect(hues[1]).toBe(120) // Green
    expect(hues[2]).toBe(240) // Blue
  })

  it('should accept HEX string', () => {
    const triadic = getTriadic('#ff0000')
    expect(triadic).toHaveLength(3)
  })

  it('should preserve saturation', () => {
    const color = new ColorClass(255, 0, 0) // 100% saturated
    const triadic = getTriadic(color)

    triadic.forEach(c => {
      expect(c.toHsl().s).toBe(100)
    })
  })

  it('should preserve lightness', () => {
    const color = new ColorClass(255, 0, 0) // 50% lightness
    const triadic = getTriadic(color)

    triadic.forEach(c => {
      expect(c.toHsl().l).toBe(50)
    })
  })

  it('should preserve alpha', () => {
    const color = new ColorClass(255, 0, 0, 0.5)
    const triadic = getTriadic(color)

    triadic.forEach(c => {
      expect(c.alpha()).toBe(0.5)
    })
  })
})
