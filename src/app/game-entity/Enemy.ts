import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants/canvas-const'
import {
  COUNT_ENEMY1_FRAMES,
  COUNT_ENEMY2_FRAMES,
  COUNT_ENEMY3_FRAMES,
  COUNT_ENEMY4_FRAMES,
  ENEMY1_SPRITE_HEIGHT,
  ENEMY1_SPRITE_WIDTH,
  ENEMY2_SPRITE_HEIGHT,
  ENEMY2_SPRITE_WIDTH,
  ENEMY3_SPRITE_HEIGHT,
  ENEMY3_SPRITE_WIDTH,
  ENEMY4_SPRITE_HEIGHT,
  ENEMY4_SPRITE_WIDTH,
  ENEMY_IMG1,
  ENEMY_IMG2,
  ENEMY_IMG3,
  ENEMY_IMG4,
  SIZE_RATIO,
} from '../constants/enemy-const'
import {
  ShakeTypeMovement,
  MovementInterface,
  SineWaveTypeMovement,
  SnakeTypeMovement,
  RandomJumpMovement,
} from './Movement'
import { countEnemySize } from '../utils/enemy-utils'

class Enemy {
  private x: number
  private y: number
  private readonly width: number
  private readonly height: number
  private readonly spriteWidth: number
  private readonly spriteHeight: number
  private currentFrame: number
  private readonly countImageFrames: number
  private readonly framesChangingFrequency: number
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
    this.framesChangingFrequency = Math.floor(Math.random() * 3 + 1)
    this.width = countEnemySize(this.spriteWidth, this.sizeRatio)
    this.height = countEnemySize(this.spriteHeight, this.sizeRatio)
    this.x = Math.round(Math.random() * (CANVAS_WIDTH - this.width))
    this.y = Math.round(Math.random() * (CANVAS_HEIGHT - this.height))
    this.movementStrategy = movement
  }

  update(gameFrame: number, ctx: CanvasRenderingContext2D) {
    const arg = {
      x: this.x,
      y: this.y,
      gameFrame,
      width: this.width,
      height: this.height,
    }
    const { x, y } = this.movementStrategy.move(arg)
    this.x = x
    this.y = y
    if (gameFrame % this.framesChangingFrequency === 0) {
      this.currentFrame < this.countImageFrames ? this.currentFrame++ : (this.currentFrame = 0)
    }
    this.draw(ctx)
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
    super(new SineWaveTypeMovement(), ENEMY_IMG2, COUNT_ENEMY2_FRAMES, ENEMY2_SPRITE_WIDTH, ENEMY2_SPRITE_HEIGHT)
  }
}

export class GhostEnemy extends Enemy {
  constructor() {
    super(new SnakeTypeMovement(), ENEMY_IMG3, COUNT_ENEMY3_FRAMES, ENEMY3_SPRITE_WIDTH, ENEMY3_SPRITE_HEIGHT)
  }
}

export class BuzzSawEnemy extends Enemy {
  constructor() {
    super(new RandomJumpMovement(), ENEMY_IMG4, COUNT_ENEMY4_FRAMES, ENEMY4_SPRITE_WIDTH, ENEMY4_SPRITE_HEIGHT)
  }
}
