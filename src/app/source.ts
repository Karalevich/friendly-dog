import shadowDog from '../img/shadow_dog.png'
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  context, PLAYER_STATES,
  SPRITE_HEIGHT,
  SPRITE_WIDTH, STAGGER_FRAMES
} from '../constants/canvas-const'
import { AnimationNameType, AnimationType } from '../types/types'

const playerImg = new Image()
playerImg.src = shadowDog

let gameFrame = 0
let playerState = 'idle'

const playerSpriteAnimation: AnimationType = {}
PLAYER_STATES.forEach((state, index) => {
  let frames: AnimationNameType = {
    loc: []
  }
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * SPRITE_WIDTH
    let positionY = index * SPRITE_HEIGHT
    frames.loc.push({ x: positionX, y: positionY })
  }
  playerSpriteAnimation[state.name] = frames
})

console.log(playerSpriteAnimation)

const animate = (): void => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  let position = Math.floor(gameFrame / STAGGER_FRAMES) % playerSpriteAnimation[playerState].loc.length
  let frameX = position * SPRITE_WIDTH
  let frameY = playerSpriteAnimation[playerState].loc[position].y
  context.drawImage(playerImg, frameX, frameY, SPRITE_WIDTH, SPRITE_HEIGHT, 0, 0, SPRITE_WIDTH, SPRITE_HEIGHT)

  gameFrame++
  requestAnimationFrame(animate)
}

animate()

