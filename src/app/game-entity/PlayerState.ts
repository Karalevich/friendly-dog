import { INPUT_KEYS, InputHandler } from './InputHandler'
import { Player, PLAYER_SPEED } from './Player'
import { CANVAS_WIDTH } from '../constants/canvas-const'

export enum PLAYER_STATE {
  IDLE = 'IDLE',
  RUN = 'RUN',
  JUMP = 'JUMP',
  FALL = 'FALL',
  DIZZY = 'DIZZY',
  SIT = 'SIT',
  ROLL = 'ROLL',
  BITE = 'BITE',
  KO = 'KO',
  GET_HIT = 'GET_HIT',
}

export type StateType = {
  name: PLAYER_STATE
  frames: number
}
export const PLAYER_MOVEMENT_INFORMATION: Array<StateType> = [
  {
    name: PLAYER_STATE.IDLE,
    frames: 7
  },
  {
    name: PLAYER_STATE.JUMP,
    frames: 7
  },
  {
    name: PLAYER_STATE.FALL,
    frames: 7
  },
  {
    name: PLAYER_STATE.RUN,
    frames: 9
  },

  {
    name: PLAYER_STATE.DIZZY,
    frames: 11
  },
  {
    name: PLAYER_STATE.SIT,
    frames: 5
  },
  {
    name: PLAYER_STATE.ROLL,
    frames: 7
  },
  {
    name: PLAYER_STATE.BITE,
    frames: 7
  },
  {
    name: PLAYER_STATE.KO,
    frames: 12
  },
  {
    name: PLAYER_STATE.GET_HIT,
    frames: 4
  }
]

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
    if (input.keys.has(INPUT_KEYS.DOWN)) {
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
    }
  }
}

export class Roll extends State {
  constructor(player: Player) {
    super(PLAYER_STATE.ROLL, player, 6, 6)
    this.player = player
  }

  public enter(): void {
    this.player.frameY = this.row
  }

  public handleInput(input: InputHandler): void {
    this.horizontalMove(input)
    if (!this.isContrPressed(input) && this.player.checkBorder()) {
      this.player.setState(PLAYER_STATE.RUN)
    } else if (!this.isContrPressed(input) && !this.player.checkBorder()) {
      this.player.setState(PLAYER_STATE.FALL)
    } else if (this.isContrPressed(input) && this.player.checkBorder() && (input.keys.has(INPUT_KEYS.UP) || input.keys.has(INPUT_KEYS.SWIPE_UP))){
      this.player.velocityY -= PLAYER_SPEED.UP
    }
  }

  private isContrPressed(input: InputHandler) {
    return input.keys.has(INPUT_KEYS.CONTROL) || input.keys.has(INPUT_KEYS.COMMAND)
  }
}

