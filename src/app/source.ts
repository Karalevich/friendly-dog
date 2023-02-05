import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  context,
  SPRITE_HEIGHT,
  SPRITE_WIDTH, STAGGER_FRAMES, START_GAME_SPEED
} from '../constants/canvas-const'
import { PLAYER_IMG } from '../constants/img-bcg'
import playerSpriteAnimation from './utils/ player-animations'
import { bcgAnimations } from './utils/bcg-animations'
import { enemy1Animations } from './utils/enemy-animations'

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
    // bcgAnimations.forEach(bcg => {
    //   bcg.update(gameSpeed)
    //   bcg.draw(context)
    // })

    enemy1Animations.forEach(enemy => {
      enemy.update(gameFrame)
      enemy.draw(context)
    })

    gameFrame++
    requestAnimationFrame(animate)
  }
  animate()
})


