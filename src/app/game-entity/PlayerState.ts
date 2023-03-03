import { INPUT_KEYS, InputHandler } from './InputHandler'
import { Player, PLAYER_SPEED } from './Player'

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
  state: PLAYER_STATE

  protected constructor(state: PLAYER_STATE) {
    this.state = state
  }

  public abstract enter(): void

  public abstract handleInput(input: InputHandler): void
}

export class Sit extends State {
  private readonly player: Player

  constructor(player: Player) {
    super(PLAYER_STATE.SIT)
    this.player = player
  }

  public enter() {
    this.player.frameY = 5
  }

  public handleInput(input: InputHandler) {
    if (input.keys.has(INPUT_KEYS.LEFT) || input.keys.has(INPUT_KEYS.RIGHT)) {
      this.player.setState(PLAYER_STATE.RUN)
    }
  }
}


export class Run extends State {
  private readonly player: Player

  constructor(player: Player) {
    super(PLAYER_STATE.RUN)
    this.player = player
  }

  public enter() {
    this.player.frameY = 3
  }

  public handleInput(input: InputHandler) {
    if (input.keys.has(INPUT_KEYS.DOWN)) {
      this.player.setState(PLAYER_STATE.SIT)
    } else if (input.keys.has(INPUT_KEYS.UP) || input.keys.has(INPUT_KEYS.SWIPE_UP)) {
      this.player.setState(PLAYER_STATE.JUMP)
    }
  }
}

export class Jump extends State {
  private readonly player: Player

  constructor(player: Player) {
    super(PLAYER_STATE.JUMP)
    this.player = player
  }

  public enter() {
    if (this.player.checkBorder()) this.player.velocityY -= PLAYER_SPEED.UP
    this.player.frameY = 1
  }

  public handleInput(input: InputHandler) {
    if (this.player.velocityY > this.player.weight) {
      this.player.setState(PLAYER_STATE.FALL)
    }
  }
}

export class Fall extends State {
  private readonly player: Player

  constructor(player: Player) {
    super(PLAYER_STATE.FALL)
    this.player = player
  }

  public enter() {
    this.player.frameY = 2
  }

  public handleInput(input: InputHandler) {
    if (this.player.checkBorder()) {
      this.player.setState(PLAYER_STATE.RUN)
    }
  }
}

