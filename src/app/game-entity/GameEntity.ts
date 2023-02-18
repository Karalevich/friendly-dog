import { InputHandler } from './InputHandler'

export type UpdateType = {
  deltaTime: number
  ctx: CanvasRenderingContext2D
  gameFrame?: number
  input?: InputHandler
}

export abstract class GameEntity {
  isReadyDelete: boolean
  protected currentFrame: number
  protected readonly width: number
  protected readonly height: number
  private readonly spriteWidth: number
  protected readonly spriteHeight: number
  protected countImageFrames: number
  private timeSinceLastChangeFrame: number
  private readonly framesChangingFrequency: number
  protected readonly sizeRatio: number
  private readonly img: HTMLImageElement

  protected constructor(
    image: HTMLImageElement,
    countImageFrames: number,
    spriteWidth: number,
    spriteHeight: number,
    sizeRatio: number
  ) {
    this.img = image
    this.countImageFrames = countImageFrames
    this.spriteWidth = spriteWidth
    this.spriteHeight = spriteHeight
    this.sizeRatio = sizeRatio
    this.currentFrame = 0
    this.framesChangingFrequency = 16
    this.timeSinceLastChangeFrame = 0
    this.width = this.spriteWidth * this.sizeRatio
    this.height = this.spriteHeight * this.sizeRatio
    this.isReadyDelete = false
  }

  abstract update(argObj: UpdateType): void
  protected abstract draw(ctx: CanvasRenderingContext2D): void

  frequencyCount(deltaTime: number): void {
    this.timeSinceLastChangeFrame += deltaTime
    if (this.timeSinceLastChangeFrame > this.framesChangingFrequency) {
      this.currentFrame < this.countImageFrames ? this.currentFrame++ : (this.currentFrame = 0)
      this.timeSinceLastChangeFrame = 0
    }
  }

  drawImg(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.drawImage(
      this.img,
      this.currentFrame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      x,
      y,
      this.width,
      this.height
    )
  }
}
