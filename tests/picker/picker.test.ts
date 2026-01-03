import { describe, it, expect, vi } from 'vitest'
import { ColorPicker, createColorPicker } from '../../src/picker/picker.js'

describe('ColorPicker', () => {
  describe('constructor', () => {
    it('should create with default config', () => {
      const picker = new ColorPicker()
      expect(picker.getValue()).toBeInstanceOf(Object)
    })

    it('should create with initial color', () => {
      const picker = new ColorPicker({ value: '#ff0000' })
      const color = picker.getValue()
      expect(color.toHex()).toBe('#ff0000')
    })

    it('should create with default value', () => {
      const picker = new ColorPicker({ defaultValue: '#00ff00' })
      const color = picker.getValue()
      expect(color.toHex()).toBe('#00ff00')
    })

    it('should use value over defaultValue', () => {
      const picker = new ColorPicker({
        value: '#ff0000',
        defaultValue: '#00ff00'
      })
      expect(picker.getValue().toHex()).toBe('#ff0000')
    })
  })

  describe('getValue', () => {
    it('should return current color', () => {
      const picker = new ColorPicker({ value: '#ff0000' })
      const color = picker.getValue()
      expect(color.toHex()).toBe('#ff0000')
    })
  })

  describe('setValue', () => {
    it('should update color', () => {
      const picker = new ColorPicker({ value: '#ff0000' })
      picker.setValue('#00ff00')
      expect(picker.getValue().toHex()).toBe('#00ff00')
    })

    it('should accept RGB object', () => {
      const picker = new ColorPicker()
      picker.setValue({ r: 255, g: 0, b: 0 })
      expect(picker.getValue().toHex()).toBe('#ff0000')
    })

    it('should emit change event', () => {
      const picker = new ColorPicker()
      const mock = vi.fn()
      picker.on('change', mock)

      picker.setValue('#00ff00')
      expect(mock).toHaveBeenCalled()
    })
  })

  describe('event system', () => {
    it('should register change listener', () => {
      const picker = new ColorPicker()
      const mock = vi.fn()
      picker.on('change', mock)

      picker.setValue('#00ff00')
      expect(mock).toHaveBeenCalledTimes(1)
    })

    it('should remove listener with off', () => {
      const picker = new ColorPicker()
      const mock = vi.fn()
      const handler = () => mock()

      picker.on('change', handler)
      picker.off('change', handler)
      picker.setValue('#00ff00')

      expect(mock).not.toHaveBeenCalled()
    })

    it('should support subscribe', () => {
      const picker = new ColorPicker()
      const mock = vi.fn()

      const unsubscribe = picker.subscribe(mock)
      picker.setValue('#00ff00')
      expect(mock).toHaveBeenCalled()

      unsubscribe()
      picker.setValue('#0000ff')
      expect(mock).toHaveBeenCalledTimes(1)
    })
  })

  describe('props getters', () => {
    it('should get input props', () => {
      const picker = new ColorPicker({ value: '#ff0000' })
      const props = picker.getInputProps()

      expect(props).toHaveProperty('value')
      expect(props).toHaveProperty('onChange')
    })

    it('should get color area props', () => {
      const picker = new ColorPicker()
      const props = picker.getColorAreaProps()

      expect(props).toHaveProperty('onPointerDown')
    })

    it('should get hue slider props', () => {
      const picker = new ColorPicker()
      const props = picker.getHueSliderProps()

      expect(props).toHaveProperty('value')
      expect(props).toHaveProperty('onChange')
    })

    it('should get alpha slider props', () => {
      const picker = new ColorPicker()
      const props = picker.getAlphaSliderProps()

      expect(props).toHaveProperty('value')
    })
  })

  describe('validation', () => {
    it('should validate color input', () => {
      const picker = new ColorPicker()
      expect(() => picker.setValue('invalid')).not.toThrow()
    })
  })
})

describe('createColorPicker', () => {
  it('should create ColorPicker instance', () => {
    const picker = createColorPicker({ value: '#ff0000' })
    expect(picker).toBeInstanceOf(ColorPicker)
  })

  it('should accept config', () => {
    const picker = createColorPicker({ value: '#00ff00' })
    expect(picker.getValue().toHex()).toBe('#00ff00')
  })
})
