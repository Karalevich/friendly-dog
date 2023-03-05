import { canvas, CANVAS_HEIGHT, CANVAS_WIDTH, START_GAME_SPEED } from './constants/canvas-const'
import { context as ctx } from './constants/canvas-const'
import { bcgParallax } from './utils/bcg-utils'
import Explosion from './game-entity/Explosion'
import { AngryBatEnemy, BatEnemy, BuzzSawEnemy, Enemy, GhostEnemy, JellyEnemy } from './game-entity/Enemy'
import { NEW_ENEMY_APPEAR_INTERVAL } from './constants/enemy-const'
import { GameEntity } from './game-entity/GameEntity'
import { InputHandler } from './game-entity/InputHandler'
import { Player } from './game-entity/Player'
import Layer from './game-entity/Layer'
import { BCG_LAYER_SINGLE, CHARACTER_OFFSET } from './constants/bcg-const'

let gameFrame: number = 0
let timeToNextEnemy = 0
let score = 0
let lastTime = 0
let enemies: Array<Enemy> = []
let explosions: Array<Explosion> = []

const canvasPosition = canvas.getBoundingClientRect()
const input = new InputHandler()
const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT - CHARACTER_OFFSET)
const bcgSingle = new Layer(BCG_LAYER_SINGLE, 1, START_GAME_SPEED)

window.addEventListener('load', () => {
  const animate = (timestamp: number): void => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let deltaTime = timestamp - lastTime
    lastTime = timestamp
    timeToNextEnemy += deltaTime
    if (timeToNextEnemy > NEW_ENEMY_APPEAR_INTERVAL) {
      // gameObjects.push(new BuzzSawEnemy())
      enemies.push(new BatEnemy())
      // gameObjects.push(new AngryBatEnemy())
      // gameObjects.push(new GhostEnemy())
      enemies.push(new JellyEnemy())

      timeToNextEnemy = 0
    }
    // bcgParallax.forEach((bcg) => {
    //   bcg.update(START_GAME_SPEED, ctx)
    // })
    bcgSingle.update(START_GAME_SPEED, ctx)
    player.update({ deltaTime, ctx, input, enemies })

    enemies.forEach((enemy) => enemy.update({ deltaTime, ctx, gameFrame, input }))
    enemies = enemies.filter((enemy) => {
      if (enemy.isReadyDelete && enemy.constructor.name.includes('Enemy')) score++
      return !enemy.isReadyDelete
    })
    explosions.forEach((explosion) => explosion.update({ deltaTime, ctx, gameFrame }))
    explosions = explosions.filter((explosion) => {
      if (explosion.isReadyDelete && explosion.constructor.name.includes('Enemy')) score++
      return !explosion.isReadyDelete
    })
    gameFrame++

    if (player.isPlayerLost) {
      gameOverStatus(ctx)
    } else {
      displayStatusText(ctx)
      requestAnimationFrame(animate)
    }
  }
  animate(lastTime)

  window.addEventListener('click', (e) => {
    let positionX = e.x - canvasPosition.left
    let positionY = e.y - canvasPosition.top
    explosions.push(new Explosion(positionX, positionY))
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && player.isPlayerLost) {
      restartGame()
      animate(lastTime)
    }
  })
})

const displayStatusText = (context: CanvasRenderingContext2D) => {
  context.font = '40px Helvetica'
  context.fillStyle = 'black'
  context.fillText('Score: ' + score, 20, 50)
  context.fillStyle = 'white'
  context.fillText('Score: ' + score, 22, 52)
}

const gameOverStatus = (context: CanvasRenderingContext2D) => {
  context.font = '40px Helvetica'
  context.fillStyle = 'black'
  context.textAlign = 'center'
  context.fillText('Game Over! Your Score: ' + score, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
  context.fillStyle = 'white'
  context.fillText('Game Over! Your Score: ' + score, CANVAS_WIDTH / 1.98, CANVAS_HEIGHT / 1.98)
}

const restartGame = () => {
  player.restart()
  bcgSingle.restart()
  gameFrame = 0
  timeToNextEnemy = 0
  score = 0
  lastTime = 0
  enemies = []
  explosions = []
}
