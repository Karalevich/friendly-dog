import { GameEntity, UpdateType } from './GameEntity'
import getPlayerSpriteAnimation from '../utils/player-utils'
import { INPUT_KEYS, InputHandler } from './InputHandler'
import { StateType } from '../types/types'
import player from '../../img/player.png'

export enum PLAYER_SPEED {
  UP = 23,
  DOWN = 5,
  LEFT = -5,
  RIGHT = 5,
}

export enum TYPE_PLAYER_MOVEMENT {
  IDLE = 'IDLE',
  RUN = 'RUN',
  JUMP = 'JUMP',
  FALL = 'FALL',
  DIZZY = 'DIZZY',
  SIT = 'SIT',
  ROLL = 'ROLL',
  BITE = 'BITE',
  KO = 'KO',
  GET_HIT = 'GET_HIT',
}

export const PLAYER_STATES: Array<StateType> = [
  {
    name: TYPE_PLAYER_MOVEMENT.IDLE,
    frames: 7,
  },
  {
    name: TYPE_PLAYER_MOVEMENT.JUMP,
    frames: 7,
  },
  {
    name: TYPE_PLAYER_MOVEMENT.FALL,
    frames: 7,
  },
  {
    name: TYPE_PLAYER_MOVEMENT.RUN,
    frames: 9,
  },

  {
    name: TYPE_PLAYER_MOVEMENT.DIZZY,
    frames: 11,
  },
  {
    name: TYPE_PLAYER_MOVEMENT.SIT,
    frames: 5,
  },
  {
    name: TYPE_PLAYER_MOVEMENT.ROLL,
    frames: 7,
  },
  {
    name: TYPE_PLAYER_MOVEMENT.BITE,
    frames: 7,
  },
  {
    name: TYPE_PLAYER_MOVEMENT.KO,
    frames: 12,
  },
  {
    name: TYPE_PLAYER_MOVEMENT.GET_HIT,
    frames: 4,
  },
]

export const PLAYER_IMG = new Image()
PLAYER_IMG.src = player
export const PLAYER_IMAGE_WIDTH = PLAYER_IMG.naturalWidth
export const PLAYER_IMAGE_HEIGHT = PLAYER_IMG.naturalHeight
export const PLAYER_IMAGE_COLUMNS = 12
export const PLAYER_IMAGE_ROWS = 10
export const SPRITE_WIDTH = Number((PLAYER_IMAGE_WIDTH / PLAYER_IMAGE_COLUMNS).toFixed(2))
export const SPRITE_HEIGHT = Number((PLAYER_IMAGE_HEIGHT / PLAYER_IMAGE_ROWS).toFixed(2))

const playerSpriteAnimation = getPlayerSpriteAnimation(PLAYER_STATES, SPRITE_WIDTH, SPRITE_HEIGHT)

export class Player extends GameEntity {
  private readonly gameWidth: number
  private readonly gameHeight: number
  private frameX: number
  private frameY: number
  private speed: number
  private velocityY: number
  private readonly gravity: number
  private typeMovement: TYPE_PLAYER_MOVEMENT
  private isPlayerLost_: boolean
  private playerStates: Array<StateType>

  constructor(gameWidth: number, gameHeight: number) {
    super(
      0,
      gameHeight - SPRITE_HEIGHT,
      PLAYER_IMG,
      playerSpriteAnimation[TYPE_PLAYER_MOVEMENT.RUN].countFrames,
      SPRITE_WIDTH,
      SPRITE_HEIGHT,
      1
    )
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.frameX = 0
    this.frameY = 0
    this.speed = 0
    this.velocityY = 0
    this.gravity = 0.6
    this.typeMovement = TYPE_PLAYER_MOVEMENT.RUN
    this.isPlayerLost_ = false
    this.playerStates = PLAYER_STATES
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
    input && this.playerMovement(input)
    this.draw(ctx)
  }

  private playerMovement(input: InputHandler) {
    if (input.keys.size === 0) {
      this.speed = 0
    }

    // horizontal movement
    if (input.keys.has(INPUT_KEYS.RIGHT)) {
      this.speed = PLAYER_SPEED.RIGHT
    } else if (input.keys.has(INPUT_KEYS.LEFT)) {
      this.speed = PLAYER_SPEED.LEFT
    }

    this.x += this.speed
    if (this.x < 0) this.x = 0
    else if (this.checkBorder(this.x, this.gameWidth, this.width)) this.x = this.gameWidth - this.width

    // vertical movement
    if (
      (input.keys.has(INPUT_KEYS.UP) || input.keys.has(INPUT_KEYS.SWIPE_UP)) &&
      this.checkBorder(this.y, this.gameHeight, this.height)
    ) {
      this.velocityY -= PLAYER_SPEED.UP
    } else if (input.keys.has(INPUT_KEYS.DOWN)) {
      this.velocityY = PLAYER_SPEED.DOWN
    }

    this.y += this.velocityY
    //player jump
    if (!this.checkBorder(this.y, this.gameHeight, this.height)) {
      const jumpCountFrames = playerSpriteAnimation[TYPE_PLAYER_MOVEMENT.JUMP].countFrames
      this.velocityY += this.gravity
      this.typeMovement = TYPE_PLAYER_MOVEMENT.JUMP
      this.countImageFrames = jumpCountFrames
      this.currentFrame = this.currentFrame > jumpCountFrames ? 0 : this.currentFrame
    } else {
      this.velocityY = 0
      this.typeMovement = TYPE_PLAYER_MOVEMENT.RUN
      this.countImageFrames = playerSpriteAnimation[TYPE_PLAYER_MOVEMENT.RUN].countFrames
    }

    if (this.checkBorder(this.y, this.gameHeight, this.height)) this.y = this.gameHeight - this.height
  }

  private checkBorder(position: number, gameSize: number, playerSize: number): boolean {
    return position >= gameSize - playerSize
  }

  protected draw(ctx: CanvasRenderingContext2D) {
    this.frameX = this.currentFrame * this.width
    this.frameY = playerSpriteAnimation[this.typeMovement].loc[this.currentFrame].y
    ctx.drawImage(
      PLAYER_IMG,
      this.frameX,
      this.frameY,
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
    this.frameY = 0
    this.speed = 0
    this.velocityY = 0
    this.isPlayerLost_ = false
    this.typeMovement = TYPE_PLAYER_MOVEMENT.RUN
  }

  get isPlayerLost() {
    return this.isPlayerLost_
  }
}
