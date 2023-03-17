export class FloatingMessage {
  value: string
  x: number
  y: number
  targetX: number
  targetY: number
  isReadyDelete: boolean
  timer: number

  constructor(value: string, x: number, y: number, targetX: number, targetY: number) {
    this.value = value
    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY
    this.isReadyDelete = false
    this.timer = 0
  }

  public update(ctx: CanvasRenderingContext2D) {
    this.x += (this.targetX - this.x) * 0.03
    this.y += (this.targetY - this.y) * 0.03
    this.timer++
    if (this.timer > 100) this.isReadyDelete = true
    this.draw(ctx)
  }

  private draw(ctx: CanvasRenderingContext2D) {
    ctx.font = '20px Helvetica'
    ctx.fillStyle = 'white'
    ctx.fillText(this.value, this.x, this.y)
    ctx.fillStyle = 'black'
    ctx.fillText(this.value, this.x - 2, this.y - 2)

  }
}
