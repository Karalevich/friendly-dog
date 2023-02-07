import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  context,
  SPRITE_HEIGHT,
  SPRITE_WIDTH,
  STAGGER_FRAMES,
  START_GAME_SPEED,
} from '../constants/canvas-const'
import { PLAYER_IMG } from '../constants/bcg-const'
import playerSpriteAnimation from './utils/player-utils'
import { bcgAnimations } from './utils/bcg-utils'
import { angryBatEnemies, batEnemies, buzzSawEnemies, ghostEnemies } from './utils/enemy-utils'

let gameFrame = 0
let playerState = 'idle'
let gameSpeed = START_GAME_SPEED

window.addEventListener('load', () => {
  const animate = (): void => {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let position = Math.floor(gameFrame / STAGGER_FRAMES) % playerSpriteAnimation[playerState].loc.length
    let frameX = position * SPRITE_WIDTH
    let frameY = playerSpriteAnimation[playerState].loc[position].y
    //context.drawImage(PLAYER_IMG, frameX, frameY, SPRITE_WIDTH, SPRITE_HEIGHT, 0, 0, SPRITE_WIDTH, SPRITE_HEIGHT)
    // bcgAnimations.forEach((bcg) => {
    //   bcg.update(gameSpeed)
    //   bcg.draw(context)
    // })

    buzzSawEnemies.forEach((enemy) => {
      enemy.update(gameFrame)
      enemy.draw(context)
    })
    // batEnemies.forEach((enemy) => {
    //   enemy.update(gameFrame)
    //   enemy.draw(context)
    // })
    // angryBatEnemies.forEach((enemy) => {
    //   enemy.update(gameFrame)
    //   enemy.draw(context)
    // })
    // ghostEnemies.forEach((enemy) => {
    //   enemy.update(gameFrame)
    //   enemy.draw(context)
    // })

    gameFrame++
    requestAnimationFrame(animate)
  }
  animate()
})
