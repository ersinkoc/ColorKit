import { describe, it, expect } from 'vitest'
import { fade, fadeIn, fadeOut, opaque, transparent } from '../../src/manipulation/alpha'

describe('fade', () => {
  it('sets alpha to specific value', () => {
    const result = fade('#ff0000', 0.5)
    expect(result.alpha()).toBe(0.5)
  })

  it('clamps alpha to 0-1 range', () => {
    expect(fade('#ff0000', 1.5).alpha()).toBe(1)
    expect(fade('#ff0000', -0.5).alpha()).toBe(0)
  })

  it('preserves RGB values', () => {
    const result = fade('#ff0000', 0.5)
    expect(result.red()).toBe(255)
    expect(result.green()).toBe(0)
    expect(result.blue()).toBe(0)
  })
})

describe('fadeIn', () => {
  it('increases alpha by amount', () => {
    const result = fadeIn('rgba(255, 0, 0, 0.5)', 0.3)
    expect(result.alpha()).toBeCloseTo(0.8)
  })

  it('clamps to max 1', () => {
    const result = fadeIn('rgba(255, 0, 0, 0.8)', 0.5)
    expect(result.alpha()).toBe(1)
  })
})

describe('fadeOut', () => {
  it('decreases alpha by amount', () => {
    const result = fadeOut('rgba(255, 0, 0, 0.5)', 0.3)
    expect(result.alpha()).toBeCloseTo(0.2)
  })

  it('clamps to min 0', () => {
    const result = fadeOut('rgba(255, 0, 0, 0.2)', 0.5)
    expect(result.alpha()).toBe(0)
  })
})

describe('opaque', () => {
  it('sets alpha to 1', () => {
    const result = opaque('rgba(255, 0, 0, 0.5)')
    expect(result.alpha()).toBe(1)
  })

  it('preserves RGB values', () => {
    const result = opaque('rgba(100, 150, 200, 0.5)')
    expect(result.red()).toBe(100)
    expect(result.green()).toBe(150)
    expect(result.blue()).toBe(200)
  })
})

describe('transparent', () => {
  it('sets alpha to 0', () => {
    const result = transparent('#ff0000')
    expect(result.alpha()).toBe(0)
  })

  it('preserves RGB values', () => {
    const result = transparent('rgba(100, 150, 200, 0.5)')
    expect(result.red()).toBe(100)
    expect(result.green()).toBe(150)
    expect(result.blue()).toBe(200)
  })
})
