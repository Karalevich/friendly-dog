import { canvas, CANVAS_HEIGHT, CANVAS_WIDTH, START_GAME_SPEED } from './constants/canvas-const'
import { context as ctx } from './constants/canvas-const'
import { bcgParallax } from './utils/bcg-utils'
import Explosion from './game-entity/Explosion'
import { AngryBatEnemy, BatEnemy, BuzzSawEnemy, GhostEnemy, JellyEnemy } from './game-entity/Enemy'
import { NEW_ENEMY_APPEAR_INTERVAL } from './constants/enemy-const'
import { GameEntity } from './game-entity/GameEntity'
import { InputHandler } from './game-entity/InputHandler'
import { Player } from './game-entity/Player'
import Layer from './game-entity/Layer'
import { BCG_LAYER_SINGLE } from './constants/bcg-const'

let gameFrame: number = 0
let timeToNextEnemy = 0
let score = 0
let lastTime = 0
let gameObjects: Array<GameEntity> = []

const canvasPosition = canvas.getBoundingClientRect()
const input = new InputHandler()
const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT)
const bcgSingle = new Layer(BCG_LAYER_SINGLE, 1, START_GAME_SPEED)

window.addEventListener('load', () => {
  const animate = (timestamp: number): void => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let deltaTime = timestamp - lastTime
    lastTime = timestamp
    timeToNextEnemy += deltaTime
    if (timeToNextEnemy > NEW_ENEMY_APPEAR_INTERVAL) {
      // gameObjects.push(new BuzzSawEnemy())
      // gameObjects.push(new BatEnemy())
      // gameObjects.push(new AngryBatEnemy())
      // gameObjects.push(new GhostEnemy())
      gameObjects.push(new JellyEnemy())

      timeToNextEnemy = 0
    }
    // bcgParallax.forEach((bcg) => {
    //   bcg.update(START_GAME_SPEED, ctx)
    // })
    bcgSingle.update(START_GAME_SPEED, ctx)

    player.update({ deltaTime, ctx, gameFrame, input })

    gameObjects.forEach((obj) => obj.update({ deltaTime, ctx, gameFrame }))
    gameObjects = gameObjects.filter((obj) => {
      if (obj.isReadyDelete && obj.constructor.name.includes('Enemy')) score++
      return !obj.isReadyDelete
    })
    displayStatusText(ctx)
    gameFrame++
    requestAnimationFrame(animate)
  }
  animate(lastTime)

  window.addEventListener('click', (e) => {
    let positionX = e.x - canvasPosition.left
    let positionY = e.y - canvasPosition.top
    gameObjects.push(new Explosion(positionX, positionY))
  })
})

const displayStatusText = (context: CanvasRenderingContext2D) => {
  context.font = '40px Helvetica'
  context.fillStyle = 'black'
  context.fillText('Score: ' + score, 20, 50)
  context.fillStyle = 'white'
  context.fillText('Score: ' + score, 22, 52)
}
