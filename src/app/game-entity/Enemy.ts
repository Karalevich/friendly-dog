import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constants/canvas-const'
import {
  COUNT_ENEMY1_FRAMES,
  COUNT_ENEMY2_FRAMES,
  COUNT_ENEMY3_FRAMES,
  COUNT_ENEMY4_FRAMES,
  COUNT_ENEMY5_FRAMES,
  ENEMY1_SPRITE_HEIGHT,
  ENEMY1_SPRITE_WIDTH,
  ENEMY2_SPRITE_HEIGHT,
  ENEMY2_SPRITE_WIDTH,
  ENEMY3_SPRITE_HEIGHT,
  ENEMY3_SPRITE_WIDTH,
  ENEMY4_SPRITE_HEIGHT,
  ENEMY4_SPRITE_WIDTH,
  ENEMY5_SPRITE_HEIGHT,
  ENEMY5_SPRITE_WIDTH,
  ENEMY_IMG1,
  ENEMY_IMG2,
  ENEMY_IMG3,
  ENEMY_IMG4,
  ENEMY_IMG5,
  JELLY_SIZE_RATIO,
  SIZE_RATIO
} from '../constants/enemy-const'
import {
  ShakeTypeMovement,
  MovementInterface,
  SineWaveTypeMovement,
  SnakeTypeMovement,
  RandomJumpMovement,
  HorizontalMovement
} from './Movement'
import { GameEntity, UpdateType } from './GameEntity'
import { CHARACTER_OFFSET } from '../constants/bcg-const'

export abstract class Enemy extends GameEntity {
  private readonly movementStrategy: MovementInterface

  protected constructor(
    movement: MovementInterface,
    image: HTMLImageElement,
    countImageFrames: number,
    spriteWidth: number,
    spriteHeight: number,
    sizeRatio: number,
    yStartPosition?: number
  ) {
    super(
      CANVAS_WIDTH + spriteWidth,
      yStartPosition || Math.round(Math.random() * (CANVAS_HEIGHT - spriteHeight)),
      image,
      countImageFrames,
      spriteWidth,
      spriteHeight,
      sizeRatio
    )
    this.movementStrategy = movement
  }

  public update(argObj: UpdateType): void {
    const { deltaTime, ctx, gameFrame, input } = argObj
    const arg = {
      x: this.x,
      y: this.y,
      gameFrame: gameFrame || 0,
      width: this.width,
      height: this.height
    }
    const { x, y } = this.movementStrategy.move(arg)
    this.x = x
    this.y = y
    this.frequencyCount(deltaTime)

    if (this.x + this.width < 0) {
      this.isReadyDelete = true
    }
    if (input?.debug) {
      this.drawBorder(ctx)
    }
    this.draw(ctx)
  }

  protected draw(ctx: CanvasRenderingContext2D): void {
    this.drawImg(ctx, this.x, this.y)
  }

  protected drawBorder(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.arc(this.x + this.width / 2 - 20, this.y + this.height / 2, this.width / 3, 0, 2 * Math.PI)
    ctx.stroke()
  }
}

export class BatEnemy extends Enemy {
  constructor() {
    super(
      new SineWaveTypeMovement(),
      ENEMY_IMG1,
      COUNT_ENEMY1_FRAMES,
      ENEMY1_SPRITE_WIDTH,
      ENEMY1_SPRITE_HEIGHT,
      SIZE_RATIO,
      Math.round(Math.random() * (CANVAS_HEIGHT / 2 - ENEMY1_SPRITE_HEIGHT))
    )
  }
}

export class AngryBatEnemy extends Enemy {
  constructor() {
    super(
      new SineWaveTypeMovement(),
      ENEMY_IMG2,
      COUNT_ENEMY2_FRAMES,
      ENEMY2_SPRITE_WIDTH,
      ENEMY2_SPRITE_HEIGHT,
      SIZE_RATIO
    )
  }
}

export class GhostEnemy extends Enemy {
  constructor() {
    super(
      new SineWaveTypeMovement(),
      ENEMY_IMG3,
      COUNT_ENEMY3_FRAMES,
      ENEMY3_SPRITE_WIDTH,
      ENEMY3_SPRITE_HEIGHT,
      SIZE_RATIO
    )
  }
}

export class BuzzSawEnemy extends Enemy {
  constructor() {
    super(
      new SineWaveTypeMovement(),
      ENEMY_IMG4,
      COUNT_ENEMY4_FRAMES,
      ENEMY4_SPRITE_WIDTH,
      ENEMY4_SPRITE_HEIGHT,
      SIZE_RATIO
    )
  }
}

export class JellyEnemy extends Enemy {
  constructor() {
    super(
      new HorizontalMovement(),
      ENEMY_IMG5,
      COUNT_ENEMY5_FRAMES,
      ENEMY5_SPRITE_WIDTH,
      ENEMY5_SPRITE_HEIGHT,
      JELLY_SIZE_RATIO,
      CANVAS_HEIGHT - ENEMY5_SPRITE_HEIGHT * JELLY_SIZE_RATIO - CHARACTER_OFFSET
    )
  }
}
