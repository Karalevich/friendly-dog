export enum DIRECTION {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  SWIPE_UP = 'swipe up',
  SWIPE_DOWN = 'swipe down',
}

export class InputHandler {
  readonly keys: Set<DIRECTION>
  readonly supportingInputs: Set<DIRECTION>
  private touchY: number
  private readonly touchThreshold: number

  constructor() {
    this.keys = new Set<DIRECTION>()
    this.touchY = 0
    this.touchThreshold = 30
    this.supportingInputs = new Set<DIRECTION>([DIRECTION.DOWN, DIRECTION.UP, DIRECTION.LEFT, DIRECTION.RIGHT])
    window.addEventListener('keydown', (e) => {
      if (this.supportingInputs.has(e.key as DIRECTION)) {
        this.keys.add(e.key as DIRECTION)
      }
    })
    window.addEventListener('keyup', (e) => {
      if (this.supportingInputs.has(e.key as DIRECTION)) {
        this.keys.delete(e.key as DIRECTION)
      }
    })
    window.addEventListener('touchstart', (e) => {
      this.touchY = e.changedTouches[0].pageY
    })
    window.addEventListener('touchmove', (e) => {
      const swipeDistance = e.changedTouches[0].pageY - this.touchY
      if (swipeDistance < this.touchThreshold) {
        this.keys.add(DIRECTION.SWIPE_UP)
      } else if (swipeDistance > this.touchThreshold) {
        this.keys.add(DIRECTION.SWIPE_DOWN)
      }
    })
    window.addEventListener('touchend', (e) => {
      this.keys.delete(DIRECTION.SWIPE_UP)
      this.keys.delete(DIRECTION.SWIPE_DOWN)
    })
  }
}
