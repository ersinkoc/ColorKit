import { describe, it, expect } from 'vitest'
import { clamp, clamp01, clamp0255, clamp0100, clamp0360 } from '../../src/utils/clamp.js'

describe('clamp', () => {
  it('should return value when within range', () => {
    expect(clamp(50, 0, 100)).toBe(50)
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it('should clamp to min when below range', () => {
    expect(clamp(-10, 0, 100)).toBe(0)
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('should clamp to max when above range', () => {
    expect(clamp(150, 0, 100)).toBe(100)
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('should handle edge values', () => {
    expect(clamp(0, 0, 100)).toBe(0)
    expect(clamp(100, 0, 100)).toBe(100)
  })

  it('should handle negative ranges', () => {
    expect(clamp(-5, -10, 10)).toBe(-5)
    expect(clamp(-15, -10, 10)).toBe(-10)
    expect(clamp(15, -10, 10)).toBe(10)
  })
})

describe('clamp01', () => {
  it('should clamp values between 0 and 1', () => {
    expect(clamp01(0.5)).toBe(0.5)
    expect(clamp01(-0.1)).toBe(0)
    expect(clamp01(1.5)).toBe(1)
  })

  it('should handle boundary values', () => {
    expect(clamp01(0)).toBe(0)
    expect(clamp01(1)).toBe(1)
  })
})

describe('clamp0255', () => {
  it('should clamp values between 0 and 255', () => {
    expect(clamp0255(128)).toBe(128)
    expect(clamp0255(-10)).toBe(0)
    expect(clamp0255(300)).toBe(255)
  })

  it('should handle boundary values', () => {
    expect(clamp0255(0)).toBe(0)
    expect(clamp0255(255)).toBe(255)
  })
})

describe('clamp0100', () => {
  it('should clamp values between 0 and 100', () => {
    expect(clamp0100(50)).toBe(50)
    expect(clamp0100(-10)).toBe(0)
    expect(clamp0100(150)).toBe(100)
  })

  it('should handle boundary values', () => {
    expect(clamp0100(0)).toBe(0)
    expect(clamp0100(100)).toBe(100)
  })
})

describe('clamp0360', () => {
  it('should clamp values between 0 and 360', () => {
    expect(clamp0360(180)).toBe(180)
    expect(clamp0360(-10)).toBe(0)
    expect(clamp0360(400)).toBe(360)
  })

  it('should handle boundary values', () => {
    expect(clamp0360(0)).toBe(0)
    expect(clamp0360(360)).toBe(360)
  })
})
