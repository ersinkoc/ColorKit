import { describe, it, expect } from 'vitest'
import { getTetradic } from '../../src/harmony/tetradic'

describe('getTetradic', () => {
  it('returns 4 colors', () => {
    const colors = getTetradic('#ff0000')
    expect(colors).toHaveLength(4)
  })

  it('first color is the original', () => {
    const colors = getTetradic('#ff0000')
    expect(colors[0].toHex()).toBe('#ff0000')
  })

  it('returns colors at 90°, 180°, 270° from original', () => {
    const colors = getTetradic('#ff0000')
    expect(colors).toHaveLength(4)
    colors.forEach(c => {
      expect(c.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  it('works with RGB object input', () => {
    const colors = getTetradic({ r: 255, g: 0, b: 0 })
    expect(colors).toHaveLength(4)
  })

  it('preserves alpha', () => {
    const colors = getTetradic('rgba(255, 0, 0, 0.5)')
    colors.forEach(c => {
      expect(c.alpha()).toBe(0.5)
    })
  })

  it('works with different colors', () => {
    const colors = getTetradic('#00ff00')
    expect(colors).toHaveLength(4)
    expect(colors[0].toHex()).toBe('#00ff00')
  })
})
