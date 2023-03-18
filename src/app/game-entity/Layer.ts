import { Player } from './Player'
import { getBcgSpeed } from '../utils/bcg-utils'
import forest from '../../audio/forest.wav'

export default class Layer {
  private x: number
  private readonly y: number
  private readonly width: number
  private readonly height: number
  private readonly image: HTMLImageElement
  private readonly speedModifier: number
  private speed: number
  private isStart: boolean
  private readonly sound: HTMLAudioElement

  constructor(image: HTMLImageElement, speedModifier: number, gameSpeed: number) {
    this.x = 0
    this.y = 0
    this.width = 2400
    this.height = 720
    this.image = image
    this.speedModifier = speedModifier
    this.speed = gameSpeed * this.speedModifier
    this.sound = new Audio()
    this.sound.src = forest
    this.isStart = true
  }

  public update(player: Player, ctx: CanvasRenderingContext2D) {
    this.speed = getBcgSpeed(player.playerState.state) * this.speedModifier
    if(this.isStart) this.sound.play()
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x = Math.floor(this.x - this.speed)
    this.draw(ctx)
  }

  private draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
  }

  public restart = () => {
    this.x = 0
  }
}
