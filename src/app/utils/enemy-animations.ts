import Enemy from '../game-objects/Enemy'
import { ENEMY1 } from '../../constants/img-enemy'

export const enemy1Animations: Array<Enemy> = []

for (let i = 0; i < 100; i++) {
  enemy1Animations.push(new Enemy(ENEMY1))
}
