import {Artist} from "./artist";

export class ArtisteVerificationDTO {
  artiste!:Artist;
  code!:string;

  constructor(artist: Artist, num: string) {
    this.artiste = artist;
    this.code = num;
  }
}
