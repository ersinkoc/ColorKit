import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest'

// Mock document and window before importing modules
const mockDocument = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn()
}

const mockWindow = {
  EyeDropper: undefined
}

;(globalThis as any).document = mockDocument
;(globalThis as any).window = mockWindow

import { PropsGetters } from '../../src/picker/props'
import { createColorPicker } from '../../src/picker/picker'

describe('PropsGetters', () => {
  let picker: ReturnType<typeof createColorPicker>
  let propsGetters: PropsGetters

  beforeEach(() => {
    vi.clearAllMocks()
    picker = createColorPicker({ value: '#ff0000' })
    propsGetters = new PropsGetters(picker)
  })

  describe('getPickerProps', () => {
    it('returns picker props with correct attributes', () => {
      const props = propsGetters.getPickerProps()
      expect(props.role).toBe('application')
      expect(props['aria-roledescription']).toBe('color picker')
      expect(props['data-colorkit']).toBe('')
    })

    it('returns ref function', () => {
      const props = propsGetters.getPickerProps()
      expect(typeof props.ref).toBe('function')
    })
  })

  describe('getSaturationAreaProps', () => {
    it('returns saturation area props', () => {
      const props = propsGetters.getSaturationAreaProps()
      expect(props.role).toBe('slider')
      expect(props['aria-label']).toBe('Saturation and brightness')
      expect(props.tabIndex).toBe(0)
    })

    it('includes style with background color', () => {
      const props = propsGetters.getSaturationAreaProps()
      expect(props.style.backgroundColor).toMatch(/^hsl\(/)
    })

    it('has event handlers', () => {
      const props = propsGetters.getSaturationAreaProps()
      expect(typeof props.onMouseDown).toBe('function')
      expect(typeof props.onTouchStart).toBe('function')
      expect(typeof props.onKeyDown).toBe('function')
    })
  })

  describe('getSaturationThumbProps', () => {
    it('returns thumb props with position', () => {
      const props = propsGetters.getSaturationThumbProps()
      expect(props.role).toBe('presentation')
      expect(props.style.left).toMatch(/%$/)
      expect(props.style.top).toMatch(/%$/)
    })
  })

  describe('getHueSliderProps', () => {
    it('returns hue slider props', () => {
      const props = propsGetters.getHueSliderProps()
      expect(props.role).toBe('slider')
      expect(props['aria-label']).toBe('Hue')
      expect(props['aria-valuemin']).toBe(0)
      expect(props['aria-valuemax']).toBe(360)
    })
  })

  describe('getHueThumbProps', () => {
    it('returns thumb props', () => {
      const props = propsGetters.getHueThumbProps()
      expect(props.role).toBe('presentation')
      expect(props.style.left).toMatch(/%$/)
    })
  })

  describe('getAlphaSliderProps', () => {
    it('returns alpha slider props', () => {
      const props = propsGetters.getAlphaSliderProps()
      expect(props.role).toBe('slider')
      expect(props['aria-label']).toBe('Alpha')
      expect(props['aria-valuemin']).toBe(0)
      expect(props['aria-valuemax']).toBe(1)
    })
  })

  describe('getAlphaThumbProps', () => {
    it('returns thumb props', () => {
      const props = propsGetters.getAlphaThumbProps()
      expect(props.role).toBe('presentation')
      expect(props.style.left).toMatch(/%$/)
    })
  })

  describe('getInputProps', () => {
    it('returns input props', () => {
      const props = propsGetters.getInputProps()
      expect(props.type).toBe('text')
      expect(props['aria-label']).toBe('Color value')
      expect(typeof props.onChange).toBe('function')
    })
  })

  describe('getFormatSelectProps', () => {
    it('returns select props', () => {
      const props = propsGetters.getFormatSelectProps()
      expect(props['aria-label']).toBe('Color format')
      expect(typeof props.onChange).toBe('function')
    })
  })

  describe('getPresetProps', () => {
    it('returns preset props for color', () => {
      const props = propsGetters.getPresetProps('#00ff00')
      expect(props.role).toBe('button')
      expect(props.tabIndex).toBe(0)
      expect(props.style.backgroundColor).toBe('#00ff00')
    })

    it('has click handler', () => {
      const props = propsGetters.getPresetProps('#00ff00')
      expect(typeof props.onClick).toBe('function')
    })

    it('has keyboard handler', () => {
      const props = propsGetters.getPresetProps('#00ff00')
      expect(typeof props.onKeyDown).toBe('function')
    })
  })

  describe('getEyeDropperProps', () => {
    it('returns eye dropper props', () => {
      const props = propsGetters.getEyeDropperProps()
      expect(props.type).toBe('button')
      expect(props['aria-label']).toBe('Pick color from screen')
    })
  })

  describe('keyboard handlers', () => {
    it('saturation keyboard events work', () => {
      const props = propsGetters.getSaturationAreaProps()
      const event = { key: 'ArrowUp', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('saturation ignores other keys', () => {
      const props = propsGetters.getSaturationAreaProps()
      const event = { key: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(event.preventDefault).not.toHaveBeenCalled()
    })

    it('hue keyboard events work', () => {
      const props = propsGetters.getHueSliderProps()
      const event = { key: 'ArrowRight', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('hue ignores other keys', () => {
      const props = propsGetters.getHueSliderProps()
      const event = { key: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(event.preventDefault).not.toHaveBeenCalled()
    })

    it('alpha keyboard events work', () => {
      const props = propsGetters.getAlphaSliderProps()
      const event = { key: 'ArrowLeft', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('alpha ignores other keys', () => {
      const props = propsGetters.getAlphaSliderProps()
      const event = { key: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(event.preventDefault).not.toHaveBeenCalled()
    })
  })

  describe('input handlers', () => {
    it('input change handler works', () => {
      const props = propsGetters.getInputProps()
      const event = { target: { value: '#00ff00' } } as unknown as Event
      props.onChange(event)
      expect(picker.getState().inputValue).toBe('#00ff00')
    })

    it('input blur handler works', () => {
      picker.setInputValue('#00ff00')
      const props = propsGetters.getInputProps()
      props.onBlur()
      expect(picker.getState().color.toHex()).toBe('#00ff00')
    })

    it('input keydown enter works', () => {
      picker.setInputValue('#0000ff')
      const props = propsGetters.getInputProps()
      const event = { key: 'Enter' } as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().color.toHex()).toBe('#0000ff')
    })

    it('format select change works', () => {
      const props = propsGetters.getFormatSelectProps()
      const event = { target: { value: 'rgb' } } as unknown as Event
      props.onChange(event)
      expect(picker.getState().inputFormat).toBe('rgb')
    })
  })

  describe('preset handlers', () => {
    it('preset click works', () => {
      const props = propsGetters.getPresetProps('#00ff00')
      props.onClick()
      expect(picker.getState().color.toHex()).toBe('#00ff00')
    })

    it('preset keydown enter works', () => {
      const props = propsGetters.getPresetProps('#0000ff')
      const event = { key: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().color.toHex()).toBe('#0000ff')
    })

    it('preset keydown space works', () => {
      const props = propsGetters.getPresetProps('#ffff00')
      const event = { key: ' ', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().color.toHex()).toBe('#ffff00')
    })

    it('preset keydown ignores other keys', () => {
      const originalColor = picker.getState().color.toHex()
      const props = propsGetters.getPresetProps('#00ff00')
      const event = { key: 'Tab', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().color.toHex()).toBe(originalColor)
    })
  })

  describe('mouse handlers', () => {
    it('saturation mouse down works', () => {
      const props = propsGetters.getSaturationAreaProps()
      const element = {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 })
      }
      const event = {
        preventDefault: vi.fn(),
        currentTarget: element,
        clientX: 50,
        clientY: 50
      } as unknown as MouseEvent
      props.onMouseDown(event)
      expect(event.preventDefault).toHaveBeenCalled()
      expect(mockDocument.addEventListener).toHaveBeenCalled()
    })

    it('hue mouse down works', () => {
      const props = propsGetters.getHueSliderProps()
      const element = {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 20 })
      }
      const event = {
        preventDefault: vi.fn(),
        currentTarget: element,
        clientX: 50,
        clientY: 10
      } as unknown as MouseEvent
      props.onMouseDown(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('alpha mouse down works', () => {
      const props = propsGetters.getAlphaSliderProps()
      const element = {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 20 })
      }
      const event = {
        preventDefault: vi.fn(),
        currentTarget: element,
        clientX: 50,
        clientY: 10
      } as unknown as MouseEvent
      props.onMouseDown(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })
  })

  describe('touch handlers', () => {
    it('saturation touch start works', () => {
      const props = propsGetters.getSaturationAreaProps()
      const element = {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 })
      }
      const event = {
        preventDefault: vi.fn(),
        currentTarget: element,
        touches: [{ clientX: 50, clientY: 50 }]
      } as unknown as TouchEvent
      props.onTouchStart(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('hue touch start works', () => {
      const props = propsGetters.getHueSliderProps()
      const element = {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 20 })
      }
      const event = {
        preventDefault: vi.fn(),
        currentTarget: element,
        touches: [{ clientX: 50, clientY: 10 }]
      } as unknown as TouchEvent
      props.onTouchStart(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('alpha touch start works', () => {
      const props = propsGetters.getAlphaSliderProps()
      const element = {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 20 })
      }
      const event = {
        preventDefault: vi.fn(),
        currentTarget: element,
        touches: [{ clientX: 50, clientY: 10 }]
      } as unknown as TouchEvent
      props.onTouchStart(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })
  })

  describe('saturation keyboard navigation', () => {
    it('ArrowUp increases brightness', () => {
      picker.setBrightness(50)
      const props = propsGetters.getSaturationAreaProps()
      const event = { key: 'ArrowUp', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().brightness).toBe(55)
    })

    it('ArrowDown decreases brightness', () => {
      picker.setBrightness(50)
      const props = propsGetters.getSaturationAreaProps()
      const event = { key: 'ArrowDown', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().brightness).toBe(45)
    })

    it('ArrowLeft decreases saturation', () => {
      picker.setSaturation(50)
      const props = propsGetters.getSaturationAreaProps()
      const event = { key: 'ArrowLeft', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().saturation).toBe(45)
    })

    it('ArrowRight increases saturation', () => {
      picker.setSaturation(50)
      const props = propsGetters.getSaturationAreaProps()
      const event = { key: 'ArrowRight', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().saturation).toBe(55)
    })

    it('respects brightness bounds', () => {
      picker.setBrightness(100)
      const props = propsGetters.getSaturationAreaProps()
      const event = { key: 'ArrowUp', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().brightness).toBe(100)
    })
  })

  describe('hue keyboard navigation', () => {
    it('ArrowLeft decreases hue', () => {
      picker.setHue(180)
      const props = propsGetters.getHueSliderProps()
      const event = { key: 'ArrowLeft', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().hue).toBe(175)
    })

    it('does not go below 0', () => {
      picker.setHue(0)
      const props = propsGetters.getHueSliderProps()
      const event = { key: 'ArrowLeft', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().hue).toBe(0)
    })

    it('does not go above 360', () => {
      picker.setHue(360)
      const props = propsGetters.getHueSliderProps()
      const event = { key: 'ArrowRight', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().hue).toBe(360)
    })
  })

  describe('alpha keyboard navigation', () => {
    it('ArrowRight increases alpha', () => {
      picker.setAlpha(0.5)
      const props = propsGetters.getAlphaSliderProps()
      const event = { key: 'ArrowRight', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().alpha).toBeCloseTo(0.55)
    })

    it('ArrowLeft decreases alpha', () => {
      picker.setAlpha(0.5)
      const props = propsGetters.getAlphaSliderProps()
      const event = { key: 'ArrowLeft', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().alpha).toBeCloseTo(0.45)
    })

    it('does not go below 0', () => {
      picker.setAlpha(0)
      const props = propsGetters.getAlphaSliderProps()
      const event = { key: 'ArrowLeft', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().alpha).toBe(0)
    })

    it('does not go above 1', () => {
      picker.setAlpha(1)
      const props = propsGetters.getAlphaSliderProps()
      const event = { key: 'ArrowRight', preventDefault: vi.fn() } as unknown as KeyboardEvent
      props.onKeyDown(event)
      expect(picker.getState().alpha).toBe(1)
    })
  })
})
