import { GameEntity, UpdateType } from './GameEntity'
import { INPUT_KEYS, InputHandler } from './InputHandler'
import player from '../../img/player.png'
import { Fall, Jump, PLAYER_STATE, Run, Sit, State } from './PlayerState'

export enum PLAYER_SPEED {
  UP = 23,
  DOWN = 5,
  LEFT = -5,
  RIGHT = 5,
}

export const PLAYER_IMG = new Image()
PLAYER_IMG.src = player
export const PLAYER_IMAGE_WIDTH = PLAYER_IMG.naturalWidth
export const PLAYER_IMAGE_HEIGHT = PLAYER_IMG.naturalHeight
export const PLAYER_IMAGE_COLUMNS = 12
export const PLAYER_IMAGE_ROWS = 10
export const SPRITE_WIDTH = Number((PLAYER_IMAGE_WIDTH / PLAYER_IMAGE_COLUMNS).toFixed(2))
export const SPRITE_HEIGHT = Number((PLAYER_IMAGE_HEIGHT / PLAYER_IMAGE_ROWS).toFixed(2))


export class Player extends GameEntity {
  private readonly gameWidth: number
  private readonly gameHeight: number
  private frameX: number
  private frameY_: number
  speed: number
  velocityY: number
  weight: number
  private readonly gravity: number
  private playerState: State
  private isPlayerLost_: boolean
  private readonly states: {
    [key in PLAYER_STATE]: State
  }

  constructor(gameWidth: number, gameHeight: number) {
    super(
      0,
      gameHeight - SPRITE_HEIGHT,
      PLAYER_IMG,
      0,
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
      1
    )
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.frameX = 0
    this.frameY_ = 0
    this.speed = 0
    this.velocityY = 0
    this.gravity = 0.6
    this.weight = 1
    this.states = {
      [PLAYER_STATE.SIT]: new Sit(this),
      [PLAYER_STATE.RUN]: new Run(this),
      [PLAYER_STATE.JUMP]: new Jump(this),
      [PLAYER_STATE.FALL]: new Fall(this),
      [PLAYER_STATE.DIZZY]: new Sit(this),
      [PLAYER_STATE.ROLL]: new Sit(this),
      [PLAYER_STATE.BITE]: new Sit(this),
      [PLAYER_STATE.KO]: new Sit(this),
      [PLAYER_STATE.GET_HIT]: new Sit(this),
      [PLAYER_STATE.IDLE]: new Sit(this)
    }
    this.playerState = this.states[PLAYER_STATE.SIT]
    this.isPlayerLost_ = false
    this.playerState.enter()
    this.countImageFrames = this.playerState.countFrames
  }

  update(argObj: UpdateType) {
    const { deltaTime, ctx, input, enemies } = argObj
    enemies?.forEach((enemy) => {
      const dx = enemy.x + enemy.width / 2 - 20 - (this.x + this.width / 2)
      const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2 + 20)
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < enemy.width / 3 + this.width / 3) {
        this.isPlayerLost_ = true
      }
    })
    this.frequencyCount(deltaTime)
    if (input) {
      this.playerState.handleInput(input)
      this.playerMovement(input)
    }
    this.draw(ctx)
  }

  private playerMovement(input: InputHandler) {
    // vertical movement
    this.y += this.velocityY

    if (!this.checkBorder()) {
      const jumpCountFrames = this.playerState.countFrames
      this.velocityY += this.gravity
      this.countImageFrames = this.playerState.countFrames
      this.currentFrame = this.currentFrame > jumpCountFrames ? 0 : this.currentFrame
    } else {
      this.velocityY = 0
      this.countImageFrames = this.playerState.countFrames
    }

    if (this.checkBorder()) this.y = this.gameHeight - this.height
  }

  public checkBorder(position: number = this.y, gameSize: number = this.gameHeight, playerSize: number = this.height): boolean {
    return position >= gameSize - playerSize
  }

  public setState(state: PLAYER_STATE) {
    this.playerState = this.states[state]
    this.playerState.enter()
  }

  protected draw(ctx: CanvasRenderingContext2D) {
    this.frameX = this.currentFrame * this.width
    this.frameY_ = SPRITE_HEIGHT * this.playerState.row
    ctx.drawImage(
      PLAYER_IMG,
      this.frameX,
      this.frameY_,
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
      this.x,
      this.y,
      SPRITE_WIDTH,
      SPRITE_HEIGHT
    )
  }

  public restart() {
    this.x = 0
    this.y = this.gameHeight - SPRITE_HEIGHT
    this.frameX = 0
    this.frameY_ = 0
    this.speed = 0
    this.velocityY = 0
    this.isPlayerLost_ = false
    this.setState(PLAYER_STATE.RUN)
  }

  get isPlayerLost() {
    return this.isPlayerLost_
  }

  set frameY(value: number) {
    this.frameY_ = value
  }
}
