import {
  canvas,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  context,
  SPRITE_HEIGHT,
  SPRITE_WIDTH,
  STAGGER_FRAMES,
  START_GAME_SPEED,
} from './constants/canvas-const'
import { PLAYER_IMG } from './constants/bcg-const'
import playerSpriteAnimation from './utils/player-utils'
import { bcgAnimations } from './utils/bcg-utils'

import Explosion from './game-entity/Explosion'
import { AngryBatEnemy, BatEnemy, BuzzSawEnemy, Enemy, GhostEnemy } from './game-entity/Enemy'
import { NEW_ENEMY_APPEAR_INTERVAL } from './constants/enemy-const'

let gameFrame: number = 0
let timeToNextEnemy = 0

let lastTime = 0
let playerState = 'idle'
const canvasPosition = canvas.getBoundingClientRect()
const explosions: Array<Explosion> = []
const batEnemies: Array<BatEnemy> = []
const angryBatEnemies: Array<AngryBatEnemy> = []
const ghostEnemies: Array<GhostEnemy> = []
const buzzSawEnemies: Array<BuzzSawEnemy> = []

window.addEventListener('load', () => {
  const animate = (timestamp: number): void => {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let deltaTime = timestamp - lastTime
    lastTime = timestamp
    timeToNextEnemy += deltaTime
    if (timeToNextEnemy > NEW_ENEMY_APPEAR_INTERVAL) {
      buzzSawEnemies.push(new BuzzSawEnemy())
      batEnemies.push(new BatEnemy())
      angryBatEnemies.push(new AngryBatEnemy())
      ghostEnemies.push(new GhostEnemy())

      timeToNextEnemy = 0
    }

    let position = Math.floor(gameFrame / STAGGER_FRAMES) % playerSpriteAnimation[playerState].loc.length
    let frameX = position * SPRITE_WIDTH
    let frameY = playerSpriteAnimation[playerState].loc[position].y
    //context.drawImage(PLAYER_IMG, frameX, frameY, SPRITE_WIDTH, SPRITE_HEIGHT, 0, 0, SPRITE_WIDTH, SPRITE_HEIGHT)
    bcgAnimations.forEach((bcg) => {
      bcg.update(START_GAME_SPEED, context)
    })

    const gameObjects: Array<Enemy | Explosion> = [
      ...explosions,
      ...buzzSawEnemies,
      ...batEnemies,
      ...angryBatEnemies,
      ...ghostEnemies,
    ]
    gameObjects.forEach((obj) => obj.update(deltaTime, gameFrame, context))
    gameObjects.filter((obj) => !obj.isReadyDelete)

    gameFrame++
    requestAnimationFrame(animate)
  }
  animate(lastTime)

  window.addEventListener('click', (e) => {
    let positionX = e.x - canvasPosition.left
    let positionY = e.y - canvasPosition.top
    explosions.push(new Explosion(positionX, positionY))
  })
})
