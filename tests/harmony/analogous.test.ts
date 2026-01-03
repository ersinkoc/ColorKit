import { describe, it, expect } from 'vitest'
import { getAnalogous } from '../../src/harmony/analogous'

describe('getAnalogous', () => {
  it('returns default 3 colors', () => {
    const colors = getAnalogous('#ff0000')
    expect(colors).toHaveLength(3)
  })

  it('returns custom count of colors', () => {
    const colors = getAnalogous('#ff0000', { count: 5 })
    expect(colors).toHaveLength(5)
  })

  it('uses custom angle', () => {
    const colors = getAnalogous('#ff0000', { angle: 45 })
    expect(colors).toHaveLength(3)
    // Middle color should be the original
    expect(colors[1].toHex()).toBe('#ff0000')
  })

  it('works with RGB object input', () => {
    const colors = getAnalogous({ r: 255, g: 0, b: 0 })
    expect(colors).toHaveLength(3)
  })

  it('preserves alpha', () => {
    const colors = getAnalogous('rgba(255, 0, 0, 0.5)')
    colors.forEach(c => {
      expect(c.alpha()).toBe(0.5)
    })
  })

  it('handles hue wrapping correctly', () => {
    const colors = getAnalogous('#ff0000', { angle: 30 })
    expect(colors.length).toBe(3)
    // All colors should be valid
    colors.forEach(c => {
      expect(c.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })
})
