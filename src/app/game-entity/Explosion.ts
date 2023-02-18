import explosion from '../../audio/explosion.wav'
import { GameEntity, UpdateType } from './GameEntity'
import {
  COUNT_EXPLOSION_FRAMES,
  EXPLOSION_IMG,
  EXPLOSION_SIZE_RATIO,
  EXPLOSION_SPRITE_HEIGHT,
  EXPLOSION_SPRITE_WIDTH,
} from '../constants/explosion-const'

export default class Explosion extends GameEntity {
  private readonly angle: number
  private readonly sound: HTMLAudioElement
  private readonly x: number
  private readonly y: number

  constructor(x: number, y: number) {
    super(EXPLOSION_IMG, COUNT_EXPLOSION_FRAMES, EXPLOSION_SPRITE_WIDTH, EXPLOSION_SPRITE_HEIGHT, EXPLOSION_SIZE_RATIO)
    this.x = x
    this.y = y
    this.angle = Number((Math.random() * Math.PI * 2).toFixed(2))
    this.sound = new Audio()
    this.sound.src = explosion
  }

  update(argObj: UpdateType) {
    const { deltaTime, ctx } = argObj
    if (this.currentFrame === 0) this.sound.play()
    this.frequencyCount(deltaTime)
    if (this.currentFrame >= COUNT_EXPLOSION_FRAMES) {
      this.isReadyDelete = true
    }
    this.draw(ctx)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    this.drawImg(ctx, 0 - this.width * this.sizeRatio, 0 - this.height * this.sizeRatio)
    ctx.restore()
  }
}
