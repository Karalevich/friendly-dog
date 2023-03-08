import { FIRE_IMG } from '../constants/canvas-const'

export abstract class Particle {
  private readonly gameSpeed: number
  protected x: number
  protected y: number
  protected speedX: number
  protected speedY: number
  protected size: number
  protected isReadyDelete_: boolean

  protected constructor(x: number, y: number, gameSpeed: number) {
    this.gameSpeed = gameSpeed
    this.x = x
    this.y = y
    this.speedX = Number((Math.random()).toFixed(2))
    this.speedY = Number((Math.random()).toFixed(2))
    this.size = Number((Math.random() * 10 + 10).toFixed(2))
    this.isReadyDelete_ = false
  }

  update(ctx: CanvasRenderingContext2D) {
    this.x = Number((this.x - (this.speedX + this.gameSpeed)).toFixed(2))
    this.y = Number((this.y - this.speedY).toFixed(2))
    this.size = Number((this.size * 0.95).toFixed(2))
    if (this.size < 0.5) this.isReadyDelete_ = true
  }

  public get isReadyDelete() {
    return this.isReadyDelete_
  }
}


export class Dust extends Particle {
  private readonly color: string

  constructor(x: number, y: number, gameSpeed: number) {
    super(x, y, gameSpeed)
    this.color = 'rgba(0,0,0,0.2)'
  }

  public update(ctx: CanvasRenderingContext2D) {
    super.update(ctx)
    this.draw(ctx)
  }

  private draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }

}

export class Splash extends Particle {

}

export class Fire extends Particle {
  private image: HTMLImageElement

  constructor(x: number, y: number, gameSpeed: number) {
    super(x, y, gameSpeed)
    this.image = FIRE_IMG
    this.size = Number((Math.random() * 100 + 50).toFixed(2))
    this.speedX = 1
    this.speedY = 1
  }

  update(ctx: CanvasRenderingContext2D) {
    super.update(ctx)
    this.draw(ctx)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
  }
}

