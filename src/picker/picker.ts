import type {
  ColorPickerConfig,
  ColorPickerState,
  Position,
  PickerEvent,
  PickerEventHandler,
  ColorInput,
  HsvaColor
} from '../types.js'
import { parseColor, ColorClass } from '../core/index.js'
import { rgbToHsv, hsvToRgb } from '../conversion/hsv.js'

/**
 * Headless Color Picker class
 */
export class ColorPicker {
  private _config: ColorPickerConfig
  private _state: ColorPickerState
  private _listeners: Map<string, Set<any>>
  private _container: HTMLElement | null = null
  private _isDragging = false
  private _dragArea: 'saturation' | 'hue' | 'alpha' | null = null

  constructor(config: ColorPickerConfig = {}) {
    this._config = { ...config }
    this._listeners = new Map()

    // Initialize state
    const defaultColor = this._config.value || this._config.defaultValue || '#ff0000'
    const color = parseColor(defaultColor)!

    const rgb = color.toRgb()
    const hsv = rgbToHsv(rgb)

    this._state = {
      color,
      hue: hsv.h,
      saturation: hsv.s,
      brightness: hsv.v,
      alpha: this._config.defaultAlpha ?? color.alpha(),
      inputValue: color.toString(this._config.inputFormat || 'hex'),
      inputFormat: this._config.inputFormat || 'hex',
      isDragging: false,
      activeArea: null
    }
  }

  // ============ MOUNT/UNMOUNT ============

  mount(container: HTMLElement): void {
    if (this._container) this.unmount()
    this._container = container
    container.dataset.colorkit = 'picker'
  }

  unmount(): void {
    if (this._container) {
      delete this._container.dataset.colorkit
    }
    this._container = null
  }

  isMounted(): boolean {
    return this._container !== null
  }

  // ============ STATE ============

  getState(): ColorPickerState {
    return { ...this._state }
  }

  subscribe(callback: (color: ColorClass) => void): () => void {
    const event = 'change'
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set())
    }
    this._listeners.get(event)!.add(callback)
    return () => this.off(event, callback as any)
  }

  // ============ VALUE ============

  getValue(): ColorClass {
    return this._state.color as ColorClass
  }

  setValue(color: ColorInput): void {
    const c = parseColor(color)
    if (!c) return

    const rgb = c.toRgb()
    const hsv = rgbToHsv(rgb)
    this._state.color = c
    this._state.hue = hsv.h
    this._state.saturation = hsv.s
    this._state.brightness = hsv.v
    this._state.alpha = c.alpha()
    this._state.inputValue = c.toString(this._state.inputFormat)

    this.emit('change', c)
    this._config.onChange?.(c)
  }

  // ============ COMPONENT CONTROL ============

  setHue(hue: number): void {
    this._state.hue = Math.max(0, Math.min(360, hue))
    this.updateColorFromHsv()
  }

  setSaturation(saturation: number): void {
    this._state.saturation = Math.max(0, Math.min(100, saturation))
    this.updateColorFromHsv()
  }

  setBrightness(brightness: number): void {
    this._state.brightness = Math.max(0, Math.min(100, brightness))
    this.updateColorFromHsv()
  }

  setAlpha(alpha: number): void {
    this._state.alpha = Math.max(0, Math.min(1, alpha))
    this.updateColorFromHsv()
  }

  setFromPosition(area: 'saturation' | 'hue' | 'alpha', position: Position): void {
    const x = Math.max(0, Math.min(1, position.x))
    const y = Math.max(0, Math.min(1, position.y))

    switch (area) {
      case 'saturation':
        this.setSaturation(x * 100)
        this.setBrightness((1 - y) * 100)
        break
      case 'hue':
        this.setHue(x * 360)
        break
      case 'alpha':
        this.setAlpha(x)
        break
    }
  }

  // ============ INPUT ============

  setInputValue(value: string): void {
    this._state.inputValue = value
  }

  setInputFormat(format: string): void {
    this._state.inputFormat = format as any
  }

  parseInput(): void {
    const color = parseColor(this._state.inputValue)
    if (color) {
      this.setValue(color)
    }
  }

  // ============ EYE DROPPER ============

  isEyeDropperSupported(): boolean {
    return typeof (window as any).EyeDropper !== 'undefined'
  }

  async pickFromScreen(): Promise<ReturnType<typeof parseColor> | null> {
    if (!this.isEyeDropperSupported()) return null

    try {
      const eyeDropper = new (window as any).EyeDropper()
      const result = await eyeDropper.open()
      const color = parseColor(result.sRGBHex)
      if (color) {
        this.setValue(color)
      }
      return color
    } catch {
      return null
    }
  }

  // ============ EVENTS ============

  on<E extends PickerEvent>(event: E, handler: PickerEventHandler<E>): () => void {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, new Set())
    }
    this._listeners.get(event)!.add(handler)
    return () => this.off(event, handler)
  }

  off<E extends PickerEvent>(event: E, handler: PickerEventHandler<E>): void {
    this._listeners.get(event)?.delete(handler)
  }

  emit<E extends PickerEvent>(event: E, ...args: any[]): void {
    this._listeners.get(event)?.forEach(handler => handler(...args))
  }

  // ============ CONFIG ============

  getConfig(): ColorPickerConfig {
    return { ...this._config }
  }

  setConfig(config: Partial<ColorPickerConfig>): void {
    this._config = { ...this._config, ...config }
  }

  // ============ PROPS GETTERS ============

  getInputProps(): { value: string; onChange: (e: Event) => void } {
    return {
      value: this._state.inputValue,
      onChange: (e: Event) => {
        const target = e.target as HTMLInputElement
        this.setInputValue(target.value)
        this.parseInput()
      }
    }
  }

  getColorAreaProps(): { onPointerDown: (e: PointerEvent) => void } {
    return {
      onPointerDown: (e: PointerEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        this.setFromPosition('saturation', { x, y })
      }
    }
  }

  getHueSliderProps(): { value: number; onChange: (hue: number) => void } {
    return {
      value: this._state.hue,
      onChange: (hue: number) => this.setHue(hue)
    }
  }

  getAlphaSliderProps(): { value: number } {
    return {
      value: this._state.alpha
    }
  }

  // ============ CLEANUP ============

  destroy(): void {
    this.unmount()
    this._listeners.clear()
  }

  // ============ PRIVATE METHODS ============

  private updateColorFromHsv(): void {
    const hsva: HsvaColor = {
      h: this._state.hue,
      s: this._state.saturation,
      v: this._state.brightness,
      a: this._state.alpha
    }
    const rgb = hsvToRgb(hsva)

    this._state.color = new ColorClass(rgb.r, rgb.g, rgb.b, rgb.a)
    this._state.inputValue = this._state.color.toString(this._state.inputFormat)

    this.emit('change', this._state.color)
    this._config.onChange?.(this._state.color)
  }
}

/**
 * Factory function to create a color picker
 */
export function createColorPicker(config?: ColorPickerConfig): ColorPicker {
  return new ColorPicker(config)
}
