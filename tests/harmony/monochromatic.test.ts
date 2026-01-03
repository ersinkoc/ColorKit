import { describe, it, expect } from 'vitest'
import { getMonochromatic } from '../../src/harmony/monochromatic'

describe('getMonochromatic', () => {
  it('returns original color plus count variations', () => {
    const colors = getMonochromatic('#ff0000', 4)
    expect(colors.length).toBeGreaterThanOrEqual(1)
  })

  it('first color is the original', () => {
    const colors = getMonochromatic('#ff0000', 2)
    expect(colors[0].toHex()).toBe('#ff0000')
  })

  it('works with different input formats', () => {
    const colors = getMonochromatic('rgb(255, 0, 0)', 3)
    expect(colors[0].toHex()).toBe('#ff0000')
  })

  it('preserves alpha', () => {
    const colors = getMonochromatic('rgba(255, 0, 0, 0.5)', 2)
    expect(colors[0].alpha()).toBe(0.5)
  })

  it('generates different lightness variations', () => {
    const colors = getMonochromatic('#ff0000', 4)
    const hexValues = colors.map(c => c.toHex())
    // Should have some variety
    const uniqueValues = new Set(hexValues)
    expect(uniqueValues.size).toBeGreaterThan(1)
  })
})
