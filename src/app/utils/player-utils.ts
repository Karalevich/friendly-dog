import { AnimationNameType, AnimationType} from '../types/types'
import { StateType } from '../game-entity/PlayerState'

const getPlayerSpriteAnimation = (
  playerStates: Array<StateType>,
  spriteWidth: number,
  spriteHeight: number
): AnimationType => {
  const playerSpriteAnimation: AnimationType = {}
  playerStates.forEach((state, index) => {
    let frames: AnimationNameType = {
      loc: [],
      countFrames: state.frames - 1,
    }
    for (let i = 0; i < state.frames; i++) {
      let positionX = i * spriteWidth
      let positionY = index * spriteHeight
      frames.loc.push({ x: positionX, y: positionY })
    }
    playerSpriteAnimation[state.name] = frames
  })
  return playerSpriteAnimation
}

export default getPlayerSpriteAnimation
