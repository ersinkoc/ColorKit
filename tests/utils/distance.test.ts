import { describe, it, expect } from 'vitest'
import { colorDistance, deltaE } from '../../src/utils/distance.js'
import { ColorClass } from '../../src/core/color.js'

describe('colorDistance', () => {
  it('should return 0 for same colors', () => {
    const color1 = new ColorClass(255, 0, 0)
    const color2 = new ColorClass(255, 0, 0)
    expect(colorDistance(color1, color2)).toBe(0)
  })

  it('should calculate Euclidean distance', () => {
    const red = new ColorClass(255, 0, 0)
    const blue = new ColorClass(0, 0, 255)
    const distance = colorDistance(red, blue)

    expect(distance).toBeGreaterThan(0)
  })

  it('should be symmetric', () => {
    const color1 = new ColorClass(255, 0, 0)
    const color2 = new ColorClass(0, 255, 0)
    const dist1 = colorDistance(color1, color2)
    const dist2 = colorDistance(color2, color1)

    expect(dist1).toBe(dist2)
  })

  it('should accept HEX strings', () => {
    const distance = colorDistance('#ff0000', '#00ff00')
    expect(distance).toBeGreaterThan(0)
  })

  it('should accept RGB objects', () => {
    const distance = colorDistance({ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 })
    expect(distance).toBeGreaterThan(0)
  })

  it('should return larger distance for more different colors', () => {
    const red = new ColorClass(255, 0, 0)
    const darkRed = new ColorClass(200, 0, 0)
    const blue = new ColorClass(0, 0, 255)

    const distClose = colorDistance(red, darkRed)
    const distFar = colorDistance(red, blue)

    expect(distFar).toBeGreaterThan(distClose)
  })
})

describe('deltaE', () => {
  it('should return 0 for same colors', () => {
    const color1 = new ColorClass(255, 0, 0)
    const color2 = new ColorClass(255, 0, 0)
    expect(deltaE(color1, color2)).toBeCloseTo(0, 4)
  })

  it('should calculate perceptual difference', () => {
    const red = new ColorClass(255, 0, 0)
    const blue = new ColorClass(0, 0, 255)
    const diff = deltaE(red, blue)

    expect(diff).toBeGreaterThan(0)
  })

  it('should be symmetric', () => {
    const color1 = new ColorClass(255, 0, 0)
    const color2 = new ColorClass(0, 255, 0)
    const diff1 = deltaE(color1, color2)
    const diff2 = deltaE(color2, color1)

    expect(diff1).toBeCloseTo(diff2, 4)
  })

  it('should accept HEX strings', () => {
    const diff = deltaE('#ff0000', '#00ff00')
    expect(diff).toBeGreaterThan(0)
  })

  it('should use LAB color space', () => {
    // LAB is perceptually uniform
    const color1 = new ColorClass(128, 0, 0)
    const color2 = new ColorClass(130, 0, 0)
    const diff = deltaE(color1, color2)

    expect(diff).toBeLessThan(5) // Very similar colors
  })

  it('should give higher delta for more perceptually different colors', () => {
    const red = new ColorClass(255, 0, 0)
    const darkRed = new ColorClass(200, 0, 0)
    const blue = new ColorClass(0, 0, 255)

    const diffClose = deltaE(red, darkRed)
    const diffFar = deltaE(red, blue)

    expect(diffFar).toBeGreaterThan(diffClose)
  })
})
