import { describe, it, expect } from 'vitest'
import { getSplitComplementary } from '../../src/harmony/split'

describe('getSplitComplementary', () => {
  it('returns 3 colors', () => {
    const colors = getSplitComplementary('#ff0000')
    expect(colors).toHaveLength(3)
  })

  it('first color is the original', () => {
    const colors = getSplitComplementary('#ff0000')
    expect(colors[0].toHex()).toBe('#ff0000')
  })

  it('returns colors at 150° and 210° from original', () => {
    const colors = getSplitComplementary('#ff0000')
    expect(colors).toHaveLength(3)
    // All colors should be valid hex
    colors.forEach(c => {
      expect(c.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  it('works with RGB object input', () => {
    const colors = getSplitComplementary({ r: 255, g: 0, b: 0 })
    expect(colors).toHaveLength(3)
  })

  it('preserves alpha', () => {
    const colors = getSplitComplementary('rgba(255, 0, 0, 0.5)')
    colors.forEach(c => {
      expect(c.alpha()).toBe(0.5)
    })
  })

  it('works with HSL input', () => {
    const colors = getSplitComplementary('hsl(0, 100%, 50%)')
    expect(colors).toHaveLength(3)
  })
})
