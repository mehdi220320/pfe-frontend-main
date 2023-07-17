import {Image} from "./image";
import {Comment} from "./Comment";
import {Like} from "./like";

export class contenue {
  id!:number;
  description!: string;
  likes!: Like [];
  imgs!:Image [];
  comments!:Comment[]


    constructor(idContPub:number,description: string, likes: Like[], imgs: Image[],comments:Comment[]) {
    this.id=idContPub
    this.description = description;
    this.likes = likes;
    this.imgs = imgs;
    this.comments =comments
  }

}
