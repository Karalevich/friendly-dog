import boom from '../../img/boom.png'
import explosion from '../../audio/explosion.wav'
import { EXPLOSION_SIZE_RATIO, EXPLOSION_SPRITE_HEIGHT, EXPLOSION_SPRITE_WIDTH } from '../../constants/explosion-const'

export default class Explosion {
  private readonly x: number
  private readonly y: number
  private readonly width: number
  private readonly height: number
  private readonly spriteWidth: number
  private readonly spriteHeight: number
  private readonly framesChangingFrequency: number
  private readonly angle: number
  private currentFrame: number
  private readonly image: HTMLImageElement
  private readonly sound: HTMLAudioElement

  constructor(x: number, y: number) {
    this.spriteWidth = EXPLOSION_SPRITE_WIDTH
    this.spriteHeight = EXPLOSION_SPRITE_HEIGHT
    this.width = this.spriteWidth * EXPLOSION_SIZE_RATIO
    this.height = this.spriteHeight * EXPLOSION_SIZE_RATIO
    this.x = x
    this.y = y
    this.currentFrame = 0
    this.framesChangingFrequency = 10
    this.angle = Number((Math.random() * Math.PI * 2).toFixed(2))
    this.image = new Image()
    this.image.src = boom
    this.sound = new Audio()
    this.sound.src = explosion
  }

  update(gameFrame: number, ctx: CanvasRenderingContext2D) {
    if (this.currentFrame === 0) this.sound.play()
    if (gameFrame % this.framesChangingFrequency === 0) {
      this.currentFrame++
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
