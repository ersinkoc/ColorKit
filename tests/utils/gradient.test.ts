import { describe, it, expect } from 'vitest'
import { createGradient, parseGradient } from '../../src/utils/gradient.js'
import { ColorClass } from '../../src/core/color.js'

describe('createGradient', () => {
  it('should create linear gradient by default', () => {
    const stops = [
      { color: '#ff0000', position: 0 },
      { color: '#0000ff', position: 100 }
    ]
    const gradient = createGradient(stops)

    expect(gradient).toContain('linear-gradient')
    expect(gradient).toContain('90deg')
  })

  it('should create radial gradient', () => {
    const stops = [
      { color: '#ff0000', position: 0 },
      { color: '#0000ff', position: 100 }
    ]
    const gradient = createGradient(stops, { type: 'radial' })

    expect(gradient).toContain('radial-gradient')
  })

  it('should use custom angle for linear', () => {
    const stops = [
      { color: '#ff0000', position: 0 },
      { color: '#0000ff', position: 100 }
    ]
    const gradient = createGradient(stops, { type: 'linear', angle: 45 })

    expect(gradient).toContain('45deg')
  })

  it('should sort stops by position', () => {
    const stops = [
      { color: '#ff0000', position: 100 },
      { color: '#00ff00', position: 0 },
      { color: '#0000ff', position: 50 }
    ]
    const gradient = createGradient(stops)

    // Should be ordered 0%, 50%, 100%
    expect(gradient.indexOf('0%')).toBeLessThan(gradient.indexOf('50%'))
  })

  it('should handle single stop', () => {
    const stops = [{ color: '#ff0000', position: 50 }]
    const gradient = createGradient(stops)
    expect(gradient).toContain('#ff0000')
  })

  it('should handle ColorClass inputs', () => {
    const stops = [
      { color: new ColorClass(255, 0, 0), position: 0 },
      { color: new ColorClass(0, 0, 255), position: 100 }
    ]
    const gradient = createGradient(stops)
    expect(gradient).toContain('#ff0000')
  })
})

describe('parseGradient', () => {
  it('should parse linear gradient', () => {
    const css = 'linear-gradient(90deg, #ff0000 0%, #0000ff 100%)'
    const gradient = parseGradient(css)

    expect(gradient).not.toBeNull()
    expect(gradient?.type).toBe('linear')
    expect(gradient?.angle).toBe(90)
  })

  it('should parse radial gradient', () => {
    const css = 'radial-gradient(circle, #ff0000 0%, #0000ff 100%)'
    const gradient = parseGradient(css)

    expect(gradient).not.toBeNull()
    expect(gradient?.type).toBe('radial')
  })

  it('should parse stops', () => {
    const css = 'linear-gradient(90deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)'
    const gradient = parseGradient(css)

    expect(gradient?.stops).toHaveLength(3)
    expect(gradient?.stops[0]?.color).toBe('#ff0000')
    expect(gradient?.stops[0]?.position).toBe(0)
  })

  it('should return null for invalid format', () => {
    const gradient = parseGradient('not a gradient')
    expect(gradient).toBeNull()
  })

  it('should handle missing position', () => {
    const css = 'linear-gradient(90deg, #ff0000, #0000ff)'
    const gradient = parseGradient(css)

    expect(gradient?.stops).toHaveLength(2)
  })
})
