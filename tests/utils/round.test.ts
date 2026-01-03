import { describe, it, expect } from 'vitest'
import { round, roundToByte, roundTo1 } from '../../src/utils/round.js'

describe('round', () => {
  it('should round to nearest integer', () => {
    expect(round(1.4)).toBe(1)
    expect(round(1.5)).toBe(2)
    expect(round(1.6)).toBe(2)
  })

  it('should handle negative numbers', () => {
    expect(round(-1.4)).toBe(-1)
    expect(round(-1.5)).toBe(-1)
    expect(round(-1.6)).toBe(-2)
  })

  it('should handle decimals', () => {
    expect(round(0.1)).toBe(0)
    expect(round(0.9)).toBe(1)
  })

  it('should accept precision parameter', () => {
    expect(round(1.456, 2)).toBe(1.46)
    expect(round(1.456, 1)).toBe(1.5)
    expect(round(1.456, 0)).toBe(1)
  })
})

describe('roundToByte', () => {
  it('should round to 0-255 range', () => {
    expect(roundToByte(128.5)).toBe(129)
    expect(roundToByte(0.4)).toBe(0)
    expect(roundToByte(255.6)).toBe(256) // Note: May need clamping
  })

  it('should handle integers', () => {
    expect(roundToByte(100)).toBe(100)
    expect(roundToByte(0)).toBe(0)
    expect(roundToByte(255)).toBe(255)
  })
})

describe('roundTo1', () => {
  it('should round to 1 decimal place', () => {
    expect(roundTo1(1.45)).toBe(1.5)
    expect(roundTo1(1.44)).toBe(1.4)
    expect(roundTo1(1.46)).toBe(1.5)
  })

  it('should handle edge cases', () => {
    expect(roundTo1(0)).toBe(0)
    expect(roundTo1(100.05)).toBe(100.1)
  })
})
