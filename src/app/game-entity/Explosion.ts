import boom from '../../img/boom.png'
import explosion from '../../audio/explosion.wav'

export default class Explosion {
  private readonly x: number
  private readonly y: number
  private readonly width: number
  private readonly height: number
  private readonly spriteWidth: number
  private readonly spriteHeight: number
  private readonly framesChangingFrequency: number
  private timeSinceLastChangeFrame: number
  private readonly angle: number
  private readonly maxFrames: number
  private readonly sizeRation: number
  isReadyDelete: boolean
  private currentFrame: number
  private readonly image: HTMLImageElement
  private readonly sound: HTMLAudioElement

  constructor(x: number, y: number) {
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.sizeRation = 0.5
    this.width = this.spriteWidth * this.sizeRation
    this.height = this.spriteHeight * this.sizeRation
    this.x = x
    this.y = y
    this.framesChangingFrequency = 50
    this.timeSinceLastChangeFrame = 0
    this.currentFrame = 0
    this.maxFrames = 4
    this.angle = Number((Math.random() * Math.PI * 2).toFixed(2))
    this.image = new Image()
    this.image.src = boom
    this.sound = new Audio()
    this.sound.src = explosion
    this.isReadyDelete = false
  }

  update(deltaTime: number, gameFrame: number, ctx: CanvasRenderingContext2D) {
    if (this.currentFrame === 0) this.sound.play()
    this.timeSinceLastChangeFrame += deltaTime
    if (this.timeSinceLastChangeFrame > this.framesChangingFrequency) {
      if (this.currentFrame > this.maxFrames) this.isReadyDelete = true
      else this.currentFrame++
      this.timeSinceLastChangeFrame = 0
    }
    this.draw(ctx)
  }

  private draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.drawImage(
      this.image,
      this.currentFrame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width * 0.5,
      0 - this.height * 0.5,
      this.width,
      this.height
    )
    ctx.restore()
  }
}
