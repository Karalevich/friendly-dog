import Layer from '../game-entity/Layer'
import { BCG_LAYER1, BCG_LAYER2, BCG_LAYER3, BCG_LAYER4, BCG_LAYER5 } from '../../constants/bcg-const'
import { START_GAME_SPEED } from '../../constants/canvas-const'

const layer1 = new Layer(BCG_LAYER1, 0.2, START_GAME_SPEED)
const layer2 = new Layer(BCG_LAYER2, 0.4, START_GAME_SPEED)
const layer3 = new Layer(BCG_LAYER3, 0.6, START_GAME_SPEED)
const layer4 = new Layer(BCG_LAYER4, 0.8, START_GAME_SPEED)
const layer5 = new Layer(BCG_LAYER5, 1, START_GAME_SPEED)

export const bcgAnimations: Array<Layer> = [layer1, layer2, layer3, layer4, layer5]
