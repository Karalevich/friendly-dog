import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants/canvas-const'

export default class Enemy {
  private x: number
  private y: number
  private readonly width: number
  private readonly height: number
  private readonly spriteWidth: number
  private readonly spriteHeight: number
  private frame: number
  private readonly flapSpeed: number
  private readonly sizeRatio: number
  private readonly img: HTMLImageElement

  constructor(image: HTMLImageElement) {
    this.img = image
    this.spriteWidth = 293
    this.spriteHeight = 155
    this.sizeRatio = 2.5
    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
    this.width = this.spriteWidth / this.sizeRatio
    this.height = this.spriteHeight / this.sizeRatio
    this.x = Math.round(Math.random() * (CANVAS_WIDTH - this.width))
    this.y = Math.round(Math.random() * (CANVAS_HEIGHT - this.height))
  }

  update(gameFrame: number) {
    this.x += Math.round(Math.random() * 5 - 2.5)
    this.y += Math.round(Math.random() * 5 - 2.5)
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? this.frame = 0 : this.frame++
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}
