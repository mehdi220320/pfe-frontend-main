import {contenue} from "./contenue";

export class Publication{
  contenu!: contenue;
  date!: Date;

  constructor(contenuePub:contenue) {
    this.contenu =contenuePub
  }


}
