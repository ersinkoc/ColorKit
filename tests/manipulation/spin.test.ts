import { describe, it, expect } from 'vitest'
import { spin } from '../../src/manipulation/spin'

describe('spin', () => {
  it('rotates hue by positive degrees', () => {
    const result = spin('#ff0000', 120) // red -> green
    expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    // Hue should be around 120 (green area)
    expect(result.toHsl().h).toBeCloseTo(120, 0)
  })

  it('rotates hue by negative degrees', () => {
    const result = spin('#ff0000', -60) // red -> magenta
    expect(result.toHex()).toMatch(/^#[0-9a-f]{6}$/i)
    // Hue should be around 300 (magenta area)
    expect(result.toHsl().h).toBeCloseTo(300, 0)
  })

  it('wraps around at 360', () => {
    const result = spin('#ff0000', 360)
    // Should come back to red
    expect(result.toHex()).toBe('#ff0000')
  })

  it('handles large positive rotations', () => {
    const result = spin('#ff0000', 720)
    // Full two rotations, should be red
    expect(result.toHex()).toBe('#ff0000')
  })

  it('handles large negative rotations', () => {
    const result = spin('#ff0000', -360)
    // Full negative rotation, should be red
    expect(result.toHex()).toBe('#ff0000')
  })

  it('preserves alpha', () => {
    const result = spin('rgba(255, 0, 0, 0.5)', 120)
    expect(result.alpha()).toBe(0.5)
  })
})
