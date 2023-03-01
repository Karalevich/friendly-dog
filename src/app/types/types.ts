export type CanvasType = HTMLCanvasElement | null

export type AnimationNameType = {
  loc: Array<{ x: number; y: number }>
  countFrames: number
}

export type AnimationType = {
  [nameState: string]: AnimationNameType
}
