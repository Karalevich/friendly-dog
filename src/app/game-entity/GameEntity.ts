import { InputHandler } from './InputHandler'
import { Enemy } from './Enemy'

export type UpdateType = {
  deltaTime: number
  ctx: CanvasRenderingContext2D
  gameFrame: number
  input: InputHandler
  enemies: Array<Enemy>
}

export abstract class GameEntity {
  isReadyDelete: boolean
  private x_: number
  private y_: number
  protected currentFrame: number
  private width_: number
  private height_: number
  private readonly spriteWidth: number
  protected readonly spriteHeight: number
  protected countImageFrames: number
  private timeSinceLastChangeFrame: number
  private readonly framesChangingFrequency: number
  protected readonly sizeRatio: number
  private readonly img: HTMLImageElement

  protected constructor(
    x: number,
    y: number,
    image: HTMLImageElement,
    countImageFrames: number,
    spriteWidth: number,
    spriteHeight: number,
    sizeRatio: number
  ) {
    this.x_ = x
    this.y_ = y
    this.img = image
    this.countImageFrames = countImageFrames
    this.spriteWidth = spriteWidth
    this.spriteHeight = spriteHeight
    this.sizeRatio = sizeRatio
    this.currentFrame = 0
    this.framesChangingFrequency = 34
    this.timeSinceLastChangeFrame = 0
    this.width_ = this.spriteWidth * this.sizeRatio
    this.height_ = this.spriteHeight * this.sizeRatio
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

  public get x() {
    return this.x_
  }

  public set x(x: number) {
    this.x_ = x
  }

  public get y() {
    return this.y_
  }

  public set y(y: number) {
    this.y_ = y
  }

  public get width() {
    return this.width_
  }

  public set width(width: number) {
    this.width_ = width
  }

  public get height() {
    return this.height_
  }

  public set height(height: number) {
    this.height_ = height
  }
}
