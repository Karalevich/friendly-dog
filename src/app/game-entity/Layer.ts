import { CANVAS_HEIGHT, ROLL_GAME_SPEED, START_GAME_SPEED, STOP_GAME_SPEED } from '../constants/canvas-const'
import { Player } from './Player'
import { PLAYER_STATE } from './PlayerState'

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
    this.height = 720
    this.image = image
    this.speedModifier = speedModifier
    this.speed = gameSpeed * this.speedModifier
  }

  public update(player: Player, ctx: CanvasRenderingContext2D) {
    this.speed = this.getBcgSpeed(player) * this.speedModifier
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

  private getBcgSpeed(player: Player) {
    if (player.playerState.state === PLAYER_STATE.SIT) {
      return STOP_GAME_SPEED
    } else if (player.playerState.state === PLAYER_STATE.ROLL) {
      return ROLL_GAME_SPEED
    } else {
      return START_GAME_SPEED
    }
  }
}
