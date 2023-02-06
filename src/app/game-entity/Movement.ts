import { countEnemyWidth } from '../utils/enemy-utils'
import { SIZE_RATIO } from '../../constants/enemy-const'
import { CANVAS_WIDTH } from '../../constants/canvas-const'

export interface MovementInterface {
  move(x: number, y: number): { x: number; y: number }
}

export class ShakeTypeMovement implements MovementInterface {
  public move(x: number, y: number): { x: number; y: number } {
    const newX = x + Math.round(Math.random() * 5 - 2.5)
    const newY = y + Math.round(Math.random() * 5 - 2.5)
    return { x: newX, y: newY }
  }
}

export class SineWaveTypeMovement implements MovementInterface {
  private readonly speed: number
  private readonly width: number
  private angle: number
  private readonly length: number
  private readonly amplitude: number

  constructor(spriteWidth: number) {
    this.speed = Math.random() * 2 + 1
    this.width = countEnemyWidth(spriteWidth, SIZE_RATIO)
    this.angle = Number((Math.random() * 2).toFixed(2))
    this.length = Number((Math.random() * 0.2).toFixed(3))
    this.amplitude = Number((Math.random() * 7).toFixed(2))
  }

  public move(x: number, y: number): { x: number; y: number } {
    let newX = x - this.speed
    const newY = y + this.amplitude * Math.sin(this.angle)
    this.angle += this.length

    if (newX + this.width < 0) newX = CANVAS_WIDTH

    return { x: newX, y: newY }
  }
}
