import { AngryBatEnemy, BatEnemy, BuzzSawEnemy, GhostEnemy } from '../game-entity/Enemy'

export const countEnemySize = (spriteWidth: number, sizeRatio: number): number => {
  return spriteWidth / sizeRatio
}

export const batEnemies: Array<BatEnemy> = []
export const angryBatEnemies: Array<AngryBatEnemy> = []
export const ghostEnemies: Array<GhostEnemy> = []
export const buzzSawEnemies: Array<BuzzSawEnemy> = []

for (let i = 0; i < 10; i++) {
  batEnemies.push(new BatEnemy())
}

for (let i = 0; i < 10; i++) {
  angryBatEnemies.push(new AngryBatEnemy())
}

for (let i = 0; i < 10; i++) {
  ghostEnemies.push(new GhostEnemy())
}

for (let i = 0; i < 10; i++) {
  buzzSawEnemies.push(new BuzzSawEnemy())
}
