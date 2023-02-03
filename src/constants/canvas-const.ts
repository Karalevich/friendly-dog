import { StateType } from '../types/types'

export const PLAYER_IMAGE_WIDTH = 6876
export const PLAYER_IMAGE_HEIGHT = 5230
export const PLAYER_IMAGE_COLUMNS = 12
export const PLAYER_IMAGE_ROWS = 10
export const STAGGER_FRAMES = 5
export const START_GAME_SPEED = 2

const canvas = document.getElementById('canvas1') as HTMLCanvasElement
export const context = canvas?.getContext('2d') as CanvasRenderingContext2D
export const CANVAS_WIDTH = canvas.width = 800
export const CANVAS_HEIGHT = canvas.height = 700

export const SPRITE_WIDTH = 575
export const SPRITE_HEIGHT = PLAYER_IMAGE_HEIGHT / PLAYER_IMAGE_ROWS

export const PLAYER_STATES: Array<StateType> = [
  {
    name: 'idle',
    frames: 7
  },
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 9
  },
  {
    name: 'run',
    frames: 9
  },
  {
    name: 'dizzy',
    frames: 11
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 7
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 12
  },
  {
    name: 'getHit',
    frames: 4
  }
]
