export enum INPUT_KEYS {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  CONTROL = 'Control',
  COMMAND = 'Command',
  SWIPE_UP = 'swipe up',
  SWIPE_DOWN = 'swipe down',
}

export class InputHandler {
  readonly keys: Set<INPUT_KEYS>
  readonly supportingInputs: Set<INPUT_KEYS>
  private touchY: number
  private readonly touchThreshold: number
  private debug_: boolean

  constructor() {
    this.keys = new Set<INPUT_KEYS>()
    this.touchY = 0
    this.touchThreshold = 30
    this.debug_ = false
    this.supportingInputs = new Set<INPUT_KEYS>([INPUT_KEYS.DOWN, INPUT_KEYS.UP, INPUT_KEYS.LEFT, INPUT_KEYS.RIGHT, INPUT_KEYS.CONTROL, INPUT_KEYS.COMMAND])

    window.addEventListener('keydown', (e) => {
      if (this.supportingInputs.has(e.key as INPUT_KEYS)) {
        this.keys.add(e.key as INPUT_KEYS)
      }else if(e.key === 'd') this.debug_ = !this.debug_
    })
    window.addEventListener('keyup', (e) => {
      if (this.supportingInputs.has(e.key as INPUT_KEYS)) {
        this.keys.delete(e.key as INPUT_KEYS)
      }
    })
    window.addEventListener('touchstart', (e) => {
      this.touchY = e.changedTouches[0].pageY
    })
    window.addEventListener('touchmove', (e) => {
      const swipeDistance = e.changedTouches[0].pageY - this.touchY
      if (swipeDistance < this.touchThreshold) {
        this.keys.add(INPUT_KEYS.SWIPE_UP)
      } else if (swipeDistance > this.touchThreshold) {
        this.keys.add(INPUT_KEYS.SWIPE_DOWN)
      }
    })
    window.addEventListener('touchend', (e) => {
      this.keys.delete(INPUT_KEYS.SWIPE_UP)
      this.keys.delete(INPUT_KEYS.SWIPE_DOWN)
    })
  }

  get debug() {
    return this.debug_
  }
}
