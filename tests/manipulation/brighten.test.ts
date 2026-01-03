import { describe, it, expect } from 'vitest'
import { brighten } from '../../src/manipulation/brighten'

describe('brighten', () => {
  it('brightens a color by default 10%', () => {
    const result = brighten('#800000')
    expect(result.red()).toBeGreaterThan(128)
  })

  it('brightens by custom amount', () => {
    const result = brighten('#800000', 50)
    expect(result.red()).toBeGreaterThan(128)
  })

  it('preserves alpha', () => {
    const result = brighten('rgba(128, 0, 0, 0.5)', 20)
    expect(result.alpha()).toBe(0.5)
  })

  it('does not exceed 255', () => {
    const result = brighten('#ffffff', 50)
    expect(result.red()).toBeLessThanOrEqual(255)
    expect(result.green()).toBeLessThanOrEqual(255)
    expect(result.blue()).toBeLessThanOrEqual(255)
  })

  it('works with RGB object input', () => {
    const result = brighten({ r: 100, g: 100, b: 100 }, 20)
    expect(result.red()).toBeGreaterThan(100)
  })

  it('brightens all channels proportionally', () => {
    const result = brighten('#404040', 50)
    expect(result.red()).toBe(result.green())
    expect(result.green()).toBe(result.blue())
  })
})
