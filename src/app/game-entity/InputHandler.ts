export enum DIRECTION {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
}

export class InputHandler {
  readonly keys: Set<string>
  readonly supportingInputs: Set<string>

  constructor() {
    this.keys = new Set<DIRECTION>()
    this.supportingInputs = new Set<DIRECTION>([DIRECTION.DOWN, DIRECTION.UP, DIRECTION.LEFT, DIRECTION.RIGHT])
    window.addEventListener('keydown', (e) => {
      if (this.supportingInputs.has(e.key)) {
        this.keys.add(e.key)
      }
    })
    window.addEventListener('keyup', (e) => {
      if (this.supportingInputs.has(e.key)) {
        this.keys.delete(e.key)
      }
    })
  }
}
