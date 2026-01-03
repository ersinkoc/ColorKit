import { describe, it, expect } from 'vitest'
import { lerp } from '../../src/utils/lerp.js'

describe('lerp', () => {
  it('should interpolate at t=0.5', () => {
    expect(lerp(0, 100, 0.5)).toBe(50)
  })

  it('should return start value at t=0', () => {
    expect(lerp(0, 100, 0)).toBe(0)
    expect(lerp(50, 100, 0)).toBe(50)
  })

  it('should return end value at t=1', () => {
    expect(lerp(0, 100, 1)).toBe(100)
    expect(lerp(50, 100, 1)).toBe(100)
  })

  it('should handle negative values', () => {
    expect(lerp(-100, 100, 0.5)).toBe(0)
  })

  it('should handle reversed range', () => {
    expect(lerp(100, 0, 0.5)).toBe(50)
  })

  it('should extrapolate for t < 0', () => {
    expect(lerp(0, 100, -0.5)).toBe(-50)
  })

  it('should extrapolate for t > 1', () => {
    expect(lerp(0, 100, 1.5)).toBe(150)
  })

  it('should handle decimals', () => {
    expect(lerp(0, 1, 0.25)).toBe(0.25)
  })
})
