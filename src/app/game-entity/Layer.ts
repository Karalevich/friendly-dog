import { CANVAS_HEIGHT } from '../constants/canvas-const'

export default class Layer {
  private x: number
  private readonly y: number
  private readonly width: number
  private readonly height: number
  private readonly image: HTMLImageElement
  private readonly speedModifier: number
  private speed: number

  constructor(image: HTMLImageElement, speedModifier: number, gameSpeed: number) {
    this.x = 0
    this.y = 0
    this.width = 2400
    this.height = CANVAS_HEIGHT
    this.image = image
    this.speedModifier = speedModifier
    this.speed = gameSpeed * this.speedModifier
  }

  update(gameSpeed: number, ctx: CanvasRenderingContext2D) {
    this.speed = gameSpeed * this.speedModifier
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x = Math.floor(this.x - this.speed)
    this.draw(ctx)
  }

  private draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }
}
