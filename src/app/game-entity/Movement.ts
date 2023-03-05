import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants/canvas-const'

export type MoveArgumentsType = {
  x: number
  y: number
  width: number
  height: number
  gameFrame: number
}

export interface MovementInterface {
  move(arg: MoveArgumentsType): { x: number; y: number }
}

export class ShakeTypeMovement implements MovementInterface {
  public move({ x, y }: MoveArgumentsType): { x: number; y: number } {
    const newX = x + Math.round(Math.random() * 5 - 2.5)
    const newY = y + Math.round(Math.random() * 5 - 2.5)
    return { x: newX, y: newY }
  }
}

export class SnakeTypeMovement implements MovementInterface {
  private angle: number
  private readonly length: number

  constructor() {
    this.angle = Number((Math.random() * 500).toFixed())
    this.length = Number((Math.random() * 0.5 + 0.5).toFixed(3))
  }

  public move({ x, y, width, height }: MoveArgumentsType): { x: number; y: number } {
    const cosAmplitude = Number(Math.cos((this.angle * Math.PI) / 90).toFixed(3))
    const sinAmplitude = Number(Math.sin((this.angle * Math.PI) / 270).toFixed(3))
    const newX = (CANVAS_WIDTH / 2) * cosAmplitude + (CANVAS_WIDTH / 2 - width / 2)
    const newY = (CANVAS_HEIGHT / 2) * sinAmplitude + (CANVAS_HEIGHT / 2 - height / 2)
    this.angle += this.length
    return { x: newX, y: newY }
  }
}

export class RandomJumpMovement implements MovementInterface {
  private readonly interval: number
  private transitionX: number
  private transitionY: number

  constructor() {
    this.transitionX = Math.floor(Math.random() * (CANVAS_WIDTH / 2))
    this.transitionY = Math.floor(Math.random() * (CANVAS_HEIGHT / 2))
    this.interval = Math.floor(Math.random() * 200 + 50)
  }

  public move({ x, y, gameFrame, width, height }: MoveArgumentsType): { x: number; y: number } {
    if (gameFrame % this.interval === 0) {
      this.transitionX = Math.floor(Math.random() * (CANVAS_WIDTH - width))
      this.transitionY = Math.floor(Math.random() * (CANVAS_HEIGHT - height))
    }
    const dx = x - this.transitionX
    const dy = y - this.transitionY
    const newX = x - dx / 70
    const newY = y - dy / 70
    return { x: newX, y: newY }
  }
}

export class SineWaveTypeMovement implements MovementInterface {
  private readonly speed: number
  private angle: number
  private readonly length: number
  private readonly amplitude: number

  constructor() {
    this.speed = Math.random() * 2 + 1
    this.angle = Number((Math.random() * 2).toFixed(2))
    this.length = Number((Math.random() * 0.2).toFixed(3))
    this.amplitude = Number((Math.random() * 5).toFixed(2))
  }

  public move({ x, y, width }: MoveArgumentsType): { x: number; y: number } {
    let newX = x - this.speed
    const newY = y + this.amplitude * Math.sin(this.angle)
    this.angle += this.length

    return { x: newX, y: newY }
  }
}

export class HorizontalMovement implements MovementInterface {
  private readonly speed: number

  constructor() {
    this.speed = 2
  }

  public move({ x, y, width }: MoveArgumentsType): { x: number; y: number } {
    let newX = x - this.speed

    return { x: newX, y }
  }
}
