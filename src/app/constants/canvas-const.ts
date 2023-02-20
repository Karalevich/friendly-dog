import { StateType } from '../types/types'
import player from '../../img/player.png'

export const PLAYER_IMAGE_WIDTH = 1800
export const PLAYER_IMAGE_HEIGHT = 400
export const PLAYER_IMAGE_COLUMNS = 9
export const PLAYER_IMAGE_ROWS = 2
export const STAGGER_FRAMES = 5
export const START_GAME_SPEED = 2
export const PLAYER_IMG = new Image()
PLAYER_IMG.src = player

export const canvas = document.getElementById('canvas1') as HTMLCanvasElement
export const context = canvas?.getContext('2d') as CanvasRenderingContext2D
export const CANVAS_WIDTH = (canvas.width = 800)
export const CANVAS_HEIGHT = (canvas.height = 720)

export const SPRITE_WIDTH = PLAYER_IMAGE_WIDTH / PLAYER_IMAGE_COLUMNS
export const SPRITE_HEIGHT = PLAYER_IMAGE_HEIGHT / PLAYER_IMAGE_ROWS

export enum PLAYER_SPEED {
  UP = 25,
  DOWN = 5,
  LEFT = -5,
  RIGHT = 5,
}

export enum TYPE_PLAYER_MOVEMENT {
  RUN = 'RUN',
  JUMP = 'JUMP',
}

export const PLAYER_STATES: Array<StateType> = [
  // {
  //   name: 'idle',
  //   frames: 7,
  // },
  {
    name: TYPE_PLAYER_MOVEMENT.RUN,
    frames: 9,
  },
  // {
  //   name: 'fall',
  //   frames: 9,
  // },
  {
    name: TYPE_PLAYER_MOVEMENT.JUMP,
    frames: 7,
  },
  // {
  //   name: 'dizzy',
  //   frames: 11,
  // },
  // {
  //   name: 'sit',
  //   frames: 5,
  // },
  // {
  //   name: 'roll',
  //   frames: 7,
  // },
  // {
  //   name: 'bite',
  //   frames: 7,
  // },
  // {
  //   name: 'ko',
  //   frames: 12,
  // },
  // {
  //   name: 'getHit',
  //   frames: 4,
  // },
]
