import {Component, Input, OnInit} from '@angular/core';
import {Publication} from "../../models/publication";
import {Artist} from "../../models/artist";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-accueil-post',
  templateUrl: './accueil-post.component.html',
  styleUrls: ['./accueil-post.component.css']
})
export class AccueilPostComponent implements OnInit {

  @Input('followingPosts') followingPosts!:Publication[]
  @Input('following') following!:Artist[]

  path:string='';
  urls !: string[];
  connectedUser:any

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.sortByTimeDifference()
    console.log(this.followingPosts)
    console.log(this.following)
    // @ts-ignore
    this.getConnectedUser(localStorage.getItem("ProfileId"))

  }


  getTimeAgo(post: Publication) {
    const differenceInMilliseconds = new Date().getTime() - new Date(post.date).getTime();
    const differenceInMins = Math.floor(differenceInMilliseconds / (1000 * 60));
    if (differenceInMins==0){
      return `just now`
    }else if (differenceInMins > 59){
      const differenceInHrs = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
      return `${differenceInHrs} hr and ${differenceInMins-(differenceInHrs*60)} min ago`;
    }
    return `${differenceInMins} min ago`;
  }

  sortByTimeDifference() {
    this.followingPosts.sort((a, b) => {
      const differenceA = new Date().getTime() - new Date(a.date).getTime();
      const differenceB = new Date().getTime() - new Date(b.date).getTime();
      return differenceA - differenceB;
    });
  }


   getOwnerPost(post: any):any {
    let ownerUserName = post.owner
    for (const ow of this.following) {
      if (ow.userName === ownerUserName){
        return ow
      }
    }
  }

  getConnectedUser(id:string){
    this.userService.fetchCurrentUser(id).subscribe(
      (response)=>{
        console.log(response)
        this.connectedUser=response
      },error => {
        console.log(error)
      }
    )
  }

}
