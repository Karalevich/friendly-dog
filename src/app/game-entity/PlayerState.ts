import { INPUT_KEYS, InputHandler } from './InputHandler'
import { Player, PLAYER_SPEED } from './Player'
import { CANVAS_WIDTH } from '../constants/canvas-const'
import fire from '../../audio/fire2.wav'
import hit from '../../audio/hit.wav'
import scream from '../../audio/scream.wav'

export enum PLAYER_STATE {
  IDLE = 'IDLE',
  RUN = 'RUN',
  JUMP = 'JUMP',
  FALL = 'FALL',
  DIZZY = 'DIZZY',
  SIT = 'SIT',
  ROLL = 'ROLL',
  DIVE = 'DIVE',
  BITE = 'BITE',
  KO = 'KO',
  GET_HIT = 'GET_HIT',
}

export type StateType = {
  name: PLAYER_STATE
  frames: number
}

export abstract class State {
  protected state_: PLAYER_STATE
  protected player: Player
  row: number
  countFrames: number

  protected constructor(state: PLAYER_STATE, player: Player, row: number, countFrames: number) {
    this.player = player
    this.state_ = state
    this.row = row
    this.countFrames = countFrames
  }

  public abstract enter(): void

  public abstract handleInput(input: InputHandler): void

  protected horizontalMove(input: InputHandler): void {
    if (input.keys.has(INPUT_KEYS.RIGHT)) {
      this.player.speed = PLAYER_SPEED.RIGHT
    } else if (input.keys.has(INPUT_KEYS.LEFT)) {
      this.player.speed = PLAYER_SPEED.LEFT
    } else if (!input.keys.has(INPUT_KEYS.RIGHT) && !input.keys.has(INPUT_KEYS.LEFT)) {
      this.player.speed = 0
    }

    this.player.x += this.player.speed
    if (this.player.x < 0) this.player.x = 0
    else if (this.player.checkBorder(this.player.x, CANVAS_WIDTH, this.player.width)) this.player.x = CANVAS_WIDTH - this.player.width
  }

  public get state() {
    return this.state_
  }
}

export class Sit extends State {
  constructor(player: Player) {
    super(PLAYER_STATE.SIT, player, 5, 4)
  }

  public enter(): void {
    this.player.frameY = this.row
  }

  public handleInput(input: InputHandler): void {
    if (input.keys.has(INPUT_KEYS.LEFT) || input.keys.has(INPUT_KEYS.RIGHT) || input.keys.has(INPUT_KEYS.UP)) {
      this.player.setState(PLAYER_STATE.RUN)
    } else if (input.keys.has(INPUT_KEYS.COMMAND) || input.keys.has(INPUT_KEYS.CONTROL)) {
      this.player.setState(PLAYER_STATE.ROLL)
    }
  }
}


export class Run extends State {
  constructor(player: Player) {
    super(PLAYER_STATE.RUN, player, 3, 8)
    this.player = player
  }

  public enter(): void {
    this.player.frameY = this.row
  }

  public handleInput(input: InputHandler): void {
    this.horizontalMove(input)
    if (input.keys.has(INPUT_KEYS.DOWN) && !input.keys.has(INPUT_KEYS.LEFT) && !input.keys.has(INPUT_KEYS.RIGHT)) {
      this.player.setState(PLAYER_STATE.SIT)
    } else if (input.keys.has(INPUT_KEYS.UP) || input.keys.has(INPUT_KEYS.SWIPE_UP)) {
      this.player.setState(PLAYER_STATE.JUMP)
    } else if (input.keys.has(INPUT_KEYS.COMMAND) || input.keys.has(INPUT_KEYS.CONTROL)) {
      this.player.setState(PLAYER_STATE.ROLL)
    }
  }
}

export class Jump extends State {
  constructor(player: Player) {
    super(PLAYER_STATE.JUMP, player, 1, 6)
    this.player = player
  }

  public enter(): void {
    if (this.player.checkBorder()) this.player.velocityY -= PLAYER_SPEED.UP
    this.player.frameY = this.row
  }

  public handleInput(input: InputHandler): void {
    this.horizontalMove(input)
    if (this.player.velocityY > this.player.weight) {
      this.player.setState(PLAYER_STATE.FALL)
    } else if (input.keys.has(INPUT_KEYS.COMMAND) || input.keys.has(INPUT_KEYS.CONTROL)) {
      this.player.setState(PLAYER_STATE.ROLL)
    } else if (input.keys.has(INPUT_KEYS.DOWN) || input.keys.has(INPUT_KEYS.SWIPE_DOWN)) {
      this.player.setState(PLAYER_STATE.DIVE)
    }
  }
}

export class Fall extends State {
  constructor(player: Player) {
    super(PLAYER_STATE.FALL, player, 2, 6)
    this.player = player
  }

  public enter(): void {
    this.player.frameY = this.row
  }

  public handleInput(input: InputHandler): void {
    this.horizontalMove(input)
    if (this.player.checkBorder()) {
      this.player.setState(PLAYER_STATE.RUN)
    } else if (input.keys.has(INPUT_KEYS.COMMAND) || input.keys.has(INPUT_KEYS.CONTROL)) {
      this.player.setState(PLAYER_STATE.ROLL)
    } else if (input.keys.has(INPUT_KEYS.DOWN) || input.keys.has(INPUT_KEYS.SWIPE_DOWN)) {
      this.player.setState(PLAYER_STATE.DIVE)
    }
  }
}

export class Roll extends State {
  private readonly sound: HTMLAudioElement

  constructor(player: Player) {
    super(PLAYER_STATE.ROLL, player, 6, 6)
    this.player = player
    this.sound = new Audio()
    this.sound.src = fire
  }

  public enter(): void {
    this.player.frameY = this.row

  }

  public handleInput(input: InputHandler): void {
    this.horizontalMove(input)
    this.sound.play()
    if (!this.isContrPressed(input) && this.player.checkBorder()) {
      this.sound.pause()
      this.player.setState(PLAYER_STATE.RUN)
    } else if (!this.isContrPressed(input) && !this.player.checkBorder()) {
      this.player.setState(PLAYER_STATE.FALL)
      this.sound.pause()
    } else if (this.isContrPressed(input) && this.player.checkBorder() && (input.keys.has(INPUT_KEYS.UP) || input.keys.has(INPUT_KEYS.SWIPE_UP))) {
      this.player.velocityY -= PLAYER_SPEED.UP
    } else if (!this.player.checkBorder() && (input.keys.has(INPUT_KEYS.DOWN) || input.keys.has(INPUT_KEYS.SWIPE_DOWN))) {
      this.player.setState(PLAYER_STATE.DIVE)
      this.sound.pause()
    }
  }

  private isContrPressed(input: InputHandler) {
    return input.keys.has(INPUT_KEYS.CONTROL) || input.keys.has(INPUT_KEYS.COMMAND)
  }
}

export class Dive extends State {
  private readonly sound: HTMLAudioElement

  constructor(player: Player) {
    super(PLAYER_STATE.DIVE, player, 6, 6)
    this.player = player
    this.sound = new Audio()
    this.sound.src = hit
  }

  public enter(): void {
    this.player.velocityY = PLAYER_SPEED.DOWN
    this.player.frameY = this.row
  }

  public handleInput(input: InputHandler): void {
    this.horizontalMove(input)
    this.sound.play()
    if (this.player.checkBorder()) {
      this.player.setState(PLAYER_STATE.RUN)
    } else if (this.isContrPressed(input) && this.player.checkBorder()) {
      this.player.setState(PLAYER_STATE.ROLL)
    }
  }

  private isContrPressed(input: InputHandler) {
    return input.keys.has(INPUT_KEYS.CONTROL) || input.keys.has(INPUT_KEYS.COMMAND)
  }
}


export class Dizzy extends State {
  private readonly timeDizzyState: number
  private counter: number
  private readonly sound: HTMLAudioElement

  constructor(player: Player) {
    super(PLAYER_STATE.DIZZY, player, 4, 10)
    this.player = player
    this.timeDizzyState = 90
    this.counter = 0
    this.sound = new Audio()
    this.sound.src = scream
  }

  public enter(): void {
    this.player.velocityY = PLAYER_SPEED.DOWN
    this.player.frameY = this.row
  }

  public handleInput(input: InputHandler): void {
    this.counter += 1
    this.sound.play()
    if (this.counter >= this.timeDizzyState && this.player.checkBorder()) {
      this.counter = 0
      this.player.setState(PLAYER_STATE.RUN)
    } else if (this.counter >= this.timeDizzyState && !this.player.checkBorder()) {
      this.counter = 0
      this.player.setState(PLAYER_STATE.FALL)
    }
  }
}

