import { AnimationNameType, AnimationType } from '../../types/types'
import { PLAYER_STATES, SPRITE_HEIGHT, SPRITE_WIDTH } from '../../constants/canvas-const'

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

export default playerSpriteAnimation
