import { GameEntity, UpdateType } from './GameEntity'
import { PLAYER_IMG, PLAYER_SPEED, SPRITE_HEIGHT, SPRITE_WIDTH, TYPE_PLAYER_MOVEMENT } from '../constants/canvas-const'
import playerSpriteAnimation from '../utils/player-utils'
import { DIRECTION, InputHandler } from './InputHandler'

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
    this.gravity = 0.8
    this.typeMovement = TYPE_PLAYER_MOVEMENT.RUN
    this.isPlayerLost_ = false
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
    if (input.keys.has(DIRECTION.RIGHT)) {
      this.speed = PLAYER_SPEED.RIGHT
    } else if (input.keys.has(DIRECTION.LEFT)) {
      this.speed = PLAYER_SPEED.LEFT
    }

    this.x += this.speed
    if (this.x < 0) this.x = 0
    else if (this.checkBorder(this.x, this.gameWidth, this.width)) this.x = this.gameWidth - this.width

    // vertical movement
    if (
      (input.keys.has(DIRECTION.UP) || input.keys.has(DIRECTION.SWIPE_UP)) &&
      this.checkBorder(this.y, this.gameHeight, this.height)
    ) {
      this.velocityY -= PLAYER_SPEED.UP
    } else if (input.keys.has(DIRECTION.DOWN)) {
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
