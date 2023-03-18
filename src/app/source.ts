import { CANVAS_HEIGHT, CANVAS_WIDTH, START_GAME_SPEED } from './constants/canvas-const'
import { context as ctx } from './constants/canvas-const'
import { bcgParallax } from './utils/bcg-utils'
import Explosion from './game-entity/Explosion'
import { AngryBatEnemy, BatEnemy, BuzzSawEnemy, Enemy, GhostEnemy, JellyEnemy } from './game-entity/Enemy'
import { NEW_ENEMY_APPEAR_INTERVAL } from './constants/enemy-const'
import { UpdateType } from './game-entity/GameEntity'
import { InputHandler } from './game-entity/InputHandler'
import { Player } from './game-entity/Player'
import Layer from './game-entity/Layer'
import { BCG_LAYER_SINGLE, CHARACTER_OFFSET, LIVES } from './constants/bcg-const'
import { Particle } from './game-entity/Particle'
import { FloatingMessage } from './game-entity/FloatingMessage'
import explosion from '../audio/explosion.wav'

let gameFrame: number = 0
let timeToNextEnemy = 0
let score = 0
let lastTime = 0
let enemies: Array<Enemy> = []
let explosions: Array<Explosion> = []
let particles: Array<Particle> = []
let floats: Array<FloatingMessage> = []

const input = new InputHandler()
const bcgSingle = new Layer(BCG_LAYER_SINGLE, 1, START_GAME_SPEED)
const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT - CHARACTER_OFFSET)
let animate: (lastTime: number) => void

window.addEventListener('load', () => {
  bcgSingle.update(player, ctx)
  startMessage()
  animate = (timestamp: number): void => {
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
    bcgSingle.update(player, ctx)
    const updateArgs: UpdateType = { deltaTime, ctx, input, enemies, gameFrame, particles, explosions, floats }
    player.update(updateArgs)

    enemies.forEach((enemy) => enemy.update(updateArgs))
    enemies = enemies.filter((enemy) => {
      if (enemy.isKilled) score++
      return !enemy.isReadyDelete
    })
    explosions.forEach((explosion) => explosion.update(updateArgs))
    explosions = explosions.filter((explosion) => {
      return !explosion.isReadyDelete
    })
    particles.forEach(particle => particle.update(ctx))
    particles = particles.filter((particle) => {
      return !particle.isReadyDelete
    })
    floats.forEach(particle => particle.update(ctx))
    floats = floats.filter((float) => {
      return !float.isReadyDelete
    })
    gameFrame++

    if (player.isPlayerLost) {
      gameOverStatus(ctx)
    } else {
      displayStatusText(ctx)
      requestAnimationFrame(animate)
    }
    playerLives(ctx, player.lives)
  }

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
  context.fillText('Game Over! Your Score: ' + score, 150, CANVAS_HEIGHT / 2)
  context.fillStyle = 'white'
  context.fillText('Game Over! Your Score: ' + score, 152, CANVAS_HEIGHT / 1.98)
}

const playerLives = (context: CanvasRenderingContext2D, count: number) => {
  for (let i = 0; i < count; i++) {
    context.drawImage(LIVES, 20 + i * 30, 60, 25, 25)
  }
}

const startMessage = () => {
  const modal = document.getElementById('modal')
  const button = document.getElementById('modal-button')
  if (modal?.style) {
    modal.style.display = 'block'
  }

  button?.addEventListener('click', () => {
    animate(lastTime)
    if (modal?.style) {
      modal.style.display = 'none'
    }
  })

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
  particles = []
  floats = []
}
