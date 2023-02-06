import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../constants/canvas-const'
import {
  COUNT_ENEMY1_FRAMES,
  COUNT_ENEMY2_FRAMES,
  ENEMY1_SPRITE_HEIGHT,
  ENEMY1_SPRITE_WIDTH,
  ENEMY2_SPRITE_HEIGHT,
  ENEMY2_SPRITE_WIDTH,
  ENEMY_IMG1,
  ENEMY_IMG2,
  SIZE_RATIO,
} from '../../constants/enemy-const'
import { ShakeTypeMovement, MovementInterface, SineWaveTypeMovement } from './Movement'
import { countEnemyWidth } from '../utils/enemy-utils'

class Enemy {
  private x: number
  private y: number
  private readonly width: number
  private readonly height: number
  private readonly spriteWidth: number
  private readonly spriteHeight: number
  private currentFrame: number
  private readonly countImageFrames: number
  private readonly flapSpeed: number
  private readonly sizeRatio: number
  private readonly img: HTMLImageElement
  private readonly movementStrategy: MovementInterface

  constructor(
    movement: MovementInterface,
    image: HTMLImageElement,
    countImageFrames: number,
    spriteWidth: number,
    spriteHeight: number
  ) {
    this.img = image
    this.countImageFrames = countImageFrames
    this.spriteWidth = spriteWidth
    this.spriteHeight = spriteHeight
    this.sizeRatio = SIZE_RATIO
    this.currentFrame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1)
    this.width = countEnemyWidth(this.spriteWidth, this.sizeRatio)
    this.height = this.spriteHeight / this.sizeRatio
    this.x = Math.round(Math.random() * (CANVAS_WIDTH - this.width))
    this.y = Math.round(Math.random() * (CANVAS_HEIGHT - this.height))
    this.movementStrategy = movement
  }

  update(gameFrame: number) {
    const { x, y } = this.movementStrategy.move(this.x, this.y)
    this.x = x
    this.y = y
    if (gameFrame % this.flapSpeed === 0) {
      this.currentFrame < this.countImageFrames ? this.currentFrame++ : (this.currentFrame = 0)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.img,
      this.currentFrame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

export class BatEnemy extends Enemy {
  constructor() {
    super(new ShakeTypeMovement(), ENEMY_IMG1, COUNT_ENEMY1_FRAMES, ENEMY1_SPRITE_WIDTH, ENEMY1_SPRITE_HEIGHT)
  }
}

export class AngryBatEnemy extends Enemy {
  constructor() {
    super(
      new SineWaveTypeMovement(ENEMY2_SPRITE_WIDTH),
      ENEMY_IMG2,
      COUNT_ENEMY2_FRAMES,
      ENEMY2_SPRITE_WIDTH,
      ENEMY2_SPRITE_HEIGHT
    )
  }
}
