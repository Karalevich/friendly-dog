export type CanvasType = HTMLCanvasElement | null

export type StateType = {
  name: string
  frames: number
}

export type AnimationNameType = {
  loc: Array<{ x: number; y: number }>
}

export type AnimationType = {
  [nameState: string]: AnimationNameType
}
