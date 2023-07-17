import { Injectable } from '@angular/core';
import {SimpleUser} from "../models/simple-user";
import {Artist} from "../models/artist";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  myGlobalVariable:string='';
  utilisateurSimple!:SimpleUser;
  artiste!:Artist;

  constructor() { }
}
