import { GameEntity, UpdateType } from './GameEntity'

abstract class Particle extends GameEntity{
  private readonly gameSpeed: number
  constructor(gameSpeed: number) {
    super();
    this.gameSpeed =gameSpeed
  }

  update(argObj: UpdateType) {
    this.x -= this.speedX + this.gameSpeed
    this.y -= this.speedY
    this.size *= 0.95
    if(this.size < 0.5) this.isReadyDelete = true
  }
}


export class Dust extends Particle{

}

export class Splash extends Particle{

}

export class Fire extends Particle{

}

