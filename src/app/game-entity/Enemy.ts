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
import { GameEntity } from './GameEntity'

export class Enemy extends GameEntity {
  private readonly movementStrategy: MovementInterface
  private x: number
  private y: number

  constructor(
    movement: MovementInterface,
    image: HTMLImageElement,
    countImageFrames: number,
    spriteWidth: number,
    spriteHeight: number
  ) {
    super(image, countImageFrames, spriteWidth, spriteHeight, SIZE_RATIO)
    this.x = CANVAS_WIDTH + this.width
    this.y = Math.round(Math.random() * (CANVAS_HEIGHT - this.height))
    this.movementStrategy = movement
  }

  update(deltaTime: number, ctx: CanvasRenderingContext2D, gameFrame: number) {
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
    this.frequencyCount(deltaTime)

    if (this.x + this.width < 0) {
      this.isReadyDelete = true
    }
    this.draw(ctx)
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawImg(ctx, this.x, this.y)
  }
}

export class BatEnemy extends Enemy {
  constructor() {
    super(new SineWaveTypeMovement(), ENEMY_IMG1, COUNT_ENEMY1_FRAMES, ENEMY1_SPRITE_WIDTH, ENEMY1_SPRITE_HEIGHT)
  }
}

export class AngryBatEnemy extends Enemy {
  constructor() {
    super(new SineWaveTypeMovement(), ENEMY_IMG2, COUNT_ENEMY2_FRAMES, ENEMY2_SPRITE_WIDTH, ENEMY2_SPRITE_HEIGHT)
  }
}

export class GhostEnemy extends Enemy {
  constructor() {
    super(new SineWaveTypeMovement(), ENEMY_IMG3, COUNT_ENEMY3_FRAMES, ENEMY3_SPRITE_WIDTH, ENEMY3_SPRITE_HEIGHT)
  }
}

export class BuzzSawEnemy extends Enemy {
  constructor() {
    super(new SineWaveTypeMovement(), ENEMY_IMG4, COUNT_ENEMY4_FRAMES, ENEMY4_SPRITE_WIDTH, ENEMY4_SPRITE_HEIGHT)
  }
}
