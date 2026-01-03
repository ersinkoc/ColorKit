import { describe, it, expect } from 'vitest'
import { isValidColor, parseColorTyped } from '../../src/core/validate'

describe('isValidColor', () => {
  it('returns true for valid hex', () => {
    expect(isValidColor('#ff0000')).toBe(true)
  })

  it('returns true for valid rgb', () => {
    expect(isValidColor('rgb(255, 0, 0)')).toBe(true)
  })

  it('returns true for valid hsl', () => {
    expect(isValidColor('hsl(0, 100%, 50%)')).toBe(true)
  })

  it('returns true for named colors', () => {
    expect(isValidColor('red')).toBe(true)
  })

  it('returns false for invalid strings', () => {
    expect(isValidColor('invalid')).toBe(false)
    expect(isValidColor('notacolor')).toBe(false)
  })

  it('returns false for non-string input', () => {
    expect(isValidColor(123 as any)).toBe(false)
    expect(isValidColor(null as any)).toBe(false)
  })
})

describe('parseColorTyped', () => {
  it('returns valid:true for valid colors', () => {
    const result = parseColorTyped('#ff0000')
    expect(result.valid).toBe(true)
    expect(result.color).not.toBeNull()
    expect(result.format).toBe('hex')
  })

  it('returns valid:false for invalid colors', () => {
    const result = parseColorTyped('invalid')
    expect(result.valid).toBe(false)
    expect(result.color).toBeNull()
  })

  it('detects rgb format', () => {
    const result = parseColorTyped('rgb(255, 0, 0)')
    expect(result.format).toBe('rgb')
  })

  it('detects hsl format', () => {
    const result = parseColorTyped('hsl(0, 100%, 50%)')
    expect(result.format).toBe('hsl')
  })

  it('detects named color format', () => {
    const result = parseColorTyped('red')
    expect(result.format).toBe('name')
  })
})
