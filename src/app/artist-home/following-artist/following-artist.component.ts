import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SimpleUserService} from "../../service/simple-user.service";
import {ArtistService} from "../../service/artist.service";

@Component({
  selector: 'app-following-artist',
  templateUrl: './following-artist.component.html',
  styleUrls: ['./following-artist.component.css']
})
export class FollowingArtistComponent implements OnInit {

  followingArtists:any = [];
  followedUtilisateurSimpleDTOSet:any = [];
  @Output() nbrFollowingArtist = new EventEmitter<number>();

  constructor(private artistService : ArtistService) { }

  ngOnInit(): void {
    this.getFollowing();
  }

  passVariable() {
    const childVariable = this.followingArtists.length+this.followedUtilisateurSimpleDTOSet.length;
    this.nbrFollowingArtist.emit(childVariable);
  }

  getFollowing(){
    this.artistService.getFollowingArtist().subscribe(
      (response)=>{
        console.log(response)
        console.log(response.followedArtistDTOSet)
        this.followingArtists.push(...response.followedArtistDTOSet)
        this.followedUtilisateurSimpleDTOSet.push(...response.followedUtilisateurSimpleDTOSet)
        this.passVariable();
      },error => {
        console.log(error)
      }
    )
  }

  unfollowArtist(profileId: string, i: number) {
    this.artistService.unfollow(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.followingArtists.splice(i,1)
        this.passVariable();
      },error => {
        console.log(error)
      }
    )

  }

  unfollowUser(profileId: string, i: number) {
    this.artistService.unfollow(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.followedUtilisateurSimpleDTOSet.splice(i,1)
        this.passVariable();
      },error => {
        console.log(error)
      }
    )

  }

}
