import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ArtistService} from "../../service/artist.service";

@Component({
  selector: 'app-follower-artist',
  templateUrl: './follower-artist.component.html',
  styleUrls: ['./follower-artist.component.css']
})
export class FollowerArtistComponent implements OnInit {

  followerArtists:any = [];
  followerUtilisateurSimpleDTOSet:any = [];
  @Output() nbrFollowerArtist = new EventEmitter<number>();

  constructor(private artistService : ArtistService) { }

  ngOnInit(): void {
    this.getFollowing();
  }

  passVariable() {
    const childVariable = this.followerArtists.length+this.followerUtilisateurSimpleDTOSet.length;
    this.nbrFollowerArtist.emit(childVariable);
  }

  getFollowing(){
    this.artistService.getFollowerArtist().subscribe(
      (response)=>{
        console.log(response)
        console.log(response.followedArtistDTOSet)
        this.followerArtists.push(...response.followedArtistDTOSet)
        this.followerUtilisateurSimpleDTOSet.push(...response.followedUtilisateurSimpleDTOSet)
        this.passVariable();
      },error => {
        console.log(error)
      }
    )
  }

  unfollowArtist(profileId: string, i: number) {
    this.artistService.deleteFollower(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.followerArtists.splice(i,1)
        this.passVariable();
      },error => {
        console.log(error)
      }
    )

  }

  unfollowUser(profileId: string, i: number) {
    this.artistService.deleteFollower(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.followerUtilisateurSimpleDTOSet.splice(i,1)
        this.passVariable();
      },error => {
        console.log(error)
      }
    )

  }

}
