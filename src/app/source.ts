import shadowDog from '../img/shadow_dog.png'

const canvas = document.getElementById('canvas1') as HTMLCanvasElement
const context =  canvas?.getContext('2d') as CanvasRenderingContext2D
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600

const playerImg = new Image()
playerImg.src = shadowDog

const animate = (): void => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  context.drawImage(playerImg, 0, 0)
  requestAnimationFrame(animate)
}

animate()

