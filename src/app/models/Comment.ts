export class Comment{
  description:string;
  date!:Date;
  id!:number;
  userId!:string;
  profileName!:string;


  constructor(description: string) {
    this.description=description;
  }
}
