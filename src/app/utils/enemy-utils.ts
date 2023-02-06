import { AngryBatEnemy, BatEnemy } from '../game-entity/Enemy'

export const countEnemyWidth = (spriteWidth: number, sizeRatio: number): number => {
  return spriteWidth / sizeRatio
}

export const batEnemies: Array<BatEnemy> = []
export const angryBatEnemies: Array<AngryBatEnemy> = []

for (let i = 0; i < 30; i++) {
  batEnemies.push(new BatEnemy())
}

for (let i = 0; i < 30; i++) {
  angryBatEnemies.push(new AngryBatEnemy())
}
