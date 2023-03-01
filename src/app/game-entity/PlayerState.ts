import { InputHandler } from './InputHandler'

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
  name: string
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

abstract class State {
  state: PLAYER_STATE

  protected constructor(state: PLAYER_STATE) {
    this.state = state
  }

  protected abstract super(): void

  protected abstract handleInput(input: InputHandler): void
}
