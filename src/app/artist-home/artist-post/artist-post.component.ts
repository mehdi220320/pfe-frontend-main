import {Component, Input, OnInit} from '@angular/core';
import {Publication} from "../../models/publication";
import {Artist} from "../../models/artist";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-artist-post',
  templateUrl: './artist-post.component.html',
  styleUrls: ['./artist-post.component.css']
})
export class ArtistPostComponent implements OnInit {
  @Input('postsByOwner') postsByOwner!:Publication[]
  @Input('currentArtist') currentArtist!:Artist
  connectedUser:any
  path:string='';
  urls !: string[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.sortByTimeDifference()
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
    this.postsByOwner.sort((a, b) => {
      const differenceA = new Date().getTime() - new Date(a.date).getTime();
      const differenceB = new Date().getTime() - new Date(b.date).getTime();
      return differenceA - differenceB;
    });
  }

  /****************************************************************************************************************/

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
