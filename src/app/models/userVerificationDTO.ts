import {SimpleUser} from "./simple-user";

export class UserVerificationDTO {
  user!:SimpleUser;
  code!:string;

  constructor(utilisateurSimple: SimpleUser, num: string) {
    this.user = utilisateurSimple;
    this.code = num;
  }
}
