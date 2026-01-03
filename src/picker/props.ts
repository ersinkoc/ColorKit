import type {
  PickerProps,
  SaturationAreaProps,
  SliderProps,
  ThumbProps,
  InputProps,
  SelectProps,
  PresetProps,
  EyeDropperProps,
  ColorInput
} from '../types.js'
import { parseColor } from '../core/index.js'
import { rgbToHsv } from '../conversion/hsv.js'
import type { ColorPicker } from './picker.js'

/**
 * Props getters for ColorPicker
 */
export class PropsGetters {
  constructor(private picker: ColorPicker) {}

  getPickerProps(): PickerProps {
    return {
      ref: (el: HTMLElement | null) => {
        if (el) this.picker.mount(el)
      },
      role: 'application',
      'aria-label': this.picker.getConfig().ariaLabel || 'Color picker',
      'aria-roledescription': 'color picker',
      'data-colorkit': ''
    }
  }

  getSaturationAreaProps(): SaturationAreaProps {
    const state = this.picker.getState()
    return {
      ref: () => {},
      role: 'slider',
      'aria-label': 'Saturation and brightness',
      'aria-valuetext': `${Math.round(state.saturation)}% saturation, ${Math.round(state.brightness)}% brightness`,
      tabIndex: 0,
      style: {
        backgroundColor: `hsl(${state.hue}, 100%, 50%)`
      },
      onMouseDown: (e: MouseEvent) => this.handleSaturationMouseDown(e),
      onTouchStart: (e: TouchEvent) => this.handleSaturationTouchStart(e),
      onKeyDown: (e: KeyboardEvent) => this.handleSaturationKeyDown(e)
    }
  }

  getSaturationThumbProps(): ThumbProps {
    const state = this.picker.getState()
    return {
      role: 'presentation',
      style: {
        left: `${state.saturation}%`,
        top: `${100 - state.brightness}%`,
        backgroundColor: state.color.toHex()
      }
    }
  }

  getHueSliderProps(): SliderProps {
    const state = this.picker.getState()
    return {
      ref: () => {},
      role: 'slider',
      'aria-label': 'Hue',
      'aria-valuemin': 0,
      'aria-valuemax': 360,
      'aria-valuenow': Math.round(state.hue),
      'aria-valuetext': `${Math.round(state.hue)} degrees`,
      tabIndex: 0,
      style: {} as any,
      onMouseDown: (e: MouseEvent) => this.handleHueMouseDown(e),
      onTouchStart: (e: TouchEvent) => this.handleHueTouchStart(e),
      onKeyDown: (e: KeyboardEvent) => this.handleHueKeyDown(e)
    }
  }

  getHueThumbProps(): ThumbProps {
    const state = this.picker.getState()
    return {
      role: 'presentation',
      style: {
        left: `${(state.hue / 360) * 100}%`,
        backgroundColor: `hsl(${state.hue}, 100%, 50%)`
      }
    }
  }

  getAlphaSliderProps(): SliderProps {
    const state = this.picker.getState()
    return {
      ref: () => {},
      role: 'slider',
      'aria-label': 'Alpha',
      'aria-valuemin': 0,
      'aria-valuemax': 1,
      'aria-valuenow': state.alpha,
      'aria-valuetext': `${Math.round(state.alpha * 100)}%`,
      tabIndex: 0,
      style: {} as any,
      onMouseDown: (e: MouseEvent) => this.handleAlphaMouseDown(e),
      onTouchStart: (e: TouchEvent) => this.handleAlphaTouchStart(e),
      onKeyDown: (e: KeyboardEvent) => this.handleAlphaKeyDown(e)
    }
  }

  getAlphaThumbProps(): ThumbProps {
    const state = this.picker.getState()
    return {
      role: 'presentation',
      style: {
        left: `${state.alpha * 100}%`,
        backgroundColor: state.color.toHex()
      }
    }
  }

  getInputProps(): InputProps {
    const state = this.picker.getState()
    return {
      ref: () => {},
      type: 'text',
      value: state.inputValue,
      'aria-label': 'Color value',
      onChange: (e: Event) => this.handleInputChange(e),
      onBlur: () => this.handleInputBlur(),
      onKeyDown: (e: KeyboardEvent) => this.handleInputKeyDown(e)
    }
  }

  getFormatSelectProps(): SelectProps {
    const state = this.picker.getState()
    return {
      ref: () => {},
      value: state.inputFormat,
      'aria-label': 'Color format',
      onChange: (e: Event) => this.handleFormatChange(e)
    }
  }

  getPresetProps(color: ColorInput): PresetProps {
    const c = parseColor(color)!
    const state = this.picker.getState()
    return {
      role: 'button',
      'aria-label': `Select color ${c.toHex()}`,
      'aria-pressed': state.color.equals(c),
      tabIndex: 0,
      style: {
        backgroundColor: c.toHex()
      },
      onClick: () => this.picker.setValue(color),
      onKeyDown: (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          this.picker.setValue(color)
        }
      }
    }
  }

  getEyeDropperProps(): EyeDropperProps {
    return {
      type: 'button',
      'aria-label': 'Pick color from screen',
      disabled: !this.picker.isEyeDropperSupported(),
      onClick: () => this.picker.pickFromScreen()
    }
  }

  // ============ EVENT HANDLERS ============

  private handleSaturationMouseDown(e: MouseEvent): void {
    e.preventDefault()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    this.picker.setFromPosition('saturation', { x, y })

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      this.picker.setFromPosition('saturation', { x, y })
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  private handleSaturationTouchStart(e: TouchEvent): void {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (touch.clientX - rect.left) / rect.width
    const y = (touch.clientY - rect.top) / rect.height
    this.picker.setFromPosition('saturation', { x, y })

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const x = (touch.clientX - rect.left) / rect.width
      const y = (touch.clientY - rect.top) / rect.height
      this.picker.setFromPosition('saturation', { x, y })
    }

    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }

    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)
  }

  private handleSaturationKeyDown(e: KeyboardEvent): void {
    const state = this.picker.getState()
    let { saturation, brightness } = state

    switch (e.key) {
      case 'ArrowUp':
        brightness = Math.min(100, brightness + 5)
        break
      case 'ArrowDown':
        brightness = Math.max(0, brightness - 5)
        break
      case 'ArrowLeft':
        saturation = Math.max(0, saturation - 5)
        break
      case 'ArrowRight':
        saturation = Math.min(100, saturation + 5)
        break
      default:
        return
    }

    e.preventDefault()
    this.picker.setSaturation(saturation)
    this.picker.setBrightness(brightness)
  }

  private handleHueMouseDown(e: MouseEvent): void {
    e.preventDefault()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    this.picker.setHue(x * 360)

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - rect.left) / rect.width
      this.picker.setHue(x * 360)
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  private handleHueTouchStart(e: TouchEvent): void {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (touch.clientX - rect.left) / rect.width
    this.picker.setHue(x * 360)

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const x = (touch.clientX - rect.left) / rect.width
      this.picker.setHue(x * 360)
    }

    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }

    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)
  }

  private handleHueKeyDown(e: KeyboardEvent): void {
    const state = this.picker.getState()
    let hue = state.hue

    switch (e.key) {
      case 'ArrowLeft':
        hue = Math.max(0, hue - 5)
        break
      case 'ArrowRight':
        hue = Math.min(360, hue + 5)
        break
      default:
        return
    }

    e.preventDefault()
    this.picker.setHue(hue)
  }

  private handleAlphaMouseDown(e: MouseEvent): void {
    e.preventDefault()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    this.picker.setAlpha(x)

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - rect.left) / rect.width
      this.picker.setAlpha(x)
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  private handleAlphaTouchStart(e: TouchEvent): void {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (touch.clientX - rect.left) / rect.width
    this.picker.setAlpha(x)

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const x = (touch.clientX - rect.left) / rect.width
      this.picker.setAlpha(x)
    }

    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }

    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)
  }

  private handleAlphaKeyDown(e: KeyboardEvent): void {
    const state = this.picker.getState()
    let alpha = state.alpha

    switch (e.key) {
      case 'ArrowLeft':
        alpha = Math.max(0, alpha - 0.05)
        break
      case 'ArrowRight':
        alpha = Math.min(1, alpha + 0.05)
        break
      default:
        return
    }

    e.preventDefault()
    this.picker.setAlpha(alpha)
  }

  private handleInputChange(e: Event): void {
    const input = e.target as HTMLInputElement
    this.picker.setInputValue(input.value)
  }

  private handleInputBlur(): void {
    this.picker.parseInput()
  }

  private handleInputKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.picker.parseInput()
    }
  }

  private handleFormatChange(e: Event): void {
    const select = e.target as HTMLSelectElement
    this.picker.setInputFormat(select.value)
    const state = this.picker.getState()
    this.picker.setInputValue(state.color.toString(select.value as any))
  }
}
