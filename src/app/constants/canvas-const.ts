import fire from '../../img/fire.png'

export const STAGGER_FRAMES = 5
export const ROLL_GAME_SPEED = 4
export const START_GAME_SPEED = 2
export const STOP_GAME_SPEED = 0

export const canvas = document.getElementById('canvas1') as HTMLCanvasElement
export const context = canvas?.getContext('2d') as CanvasRenderingContext2D
export const CANVAS_WIDTH = (canvas.width = 800)
export const CANVAS_HEIGHT = (canvas.height = 700)

export const FIRE_IMG = new Image()
FIRE_IMG.src = fire

export const FIRE_SPRITE_WIDTH = 100
export const FIRE_SPRITE_HEIGHT = 90
