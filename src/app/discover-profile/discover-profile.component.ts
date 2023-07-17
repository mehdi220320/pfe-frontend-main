import { Component, OnInit } from '@angular/core';
import {Publication} from "../models/publication";
import {DomSanitizer} from "@angular/platform-browser";
import {PublicationService} from "../service/publication.service";
import {GlobalService} from "../service/global.service";
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArtistService} from "../service/artist.service";
import {ChatService} from "../service/chat.service";
import {error} from "highcharts";

@Component({
  selector: 'app-discover-profile',
  templateUrl: './discover-profile.component.html',
  styleUrls: ['./discover-profile.component.css']
})
export class DiscoverProfileComponent implements OnInit {

  url: any;
  postsByOwner:Publication[] = [];
  profileId="";
  profile:any;
  isFollowed!:boolean;
  display: boolean=true;
  displayGallery: boolean=false;
  currentStar!: number;


  constructor(private sanitizer: DomSanitizer,private globalService : GlobalService,private route: ActivatedRoute,
              private publicationService:PublicationService,private userService:UserService,
              private artistService:ArtistService,private chatService:ChatService,private router:Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.profileId = id;
    });

    this.fetchByIdProfile(this.profileId);

    this.getPubByProfileId(this.profileId);
    console.log(this.postsByOwner)

    this.checkFollowed(this.profileId)

  }

  getPubByProfileId(profileId:string){
    this.publicationService.getPubByProfileId(profileId).subscribe(
      (response:Publication[])=>{
        console.log(response);
        this.postsByOwner = response;
      },error => {
        console.log(error)
      }
    )
  }

  fetchByIdProfile(profileId:string){
    this.userService.fetchByProfileId(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.profile = response;
        this.currentStar=Math.round(response.ratingStars);
      },error => {
        console.log(error)
      }
    )
  }


  follow(profileId: string) {
    this.userService.follow(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.isFollowed=true;
      },error => {
        console.log(error)
      }
    )
  }

  checkFollowed(profileId:string){
    this.userService.checkIfFollowed(profileId).subscribe(
      (response)=>{
        console.log(profileId)
        console.log(response)
        if (response){
          this.isFollowed=true;
        }
      },error=>{
        console.log(error)
      }
    )

  }

  unfollowArtist(profileId: string) {
    this.artistService.unfollow(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.isFollowed=false;
      },error => {
        console.log(error)
      }
    )

  }

  OpenChat(profileId: string) {
    this.chatService.openChat(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.router.navigate(["/messages"])
      },error=>{
        console.log(error)
      }
    )
  }

  showGallery() {
    this.display=false;
    this.displayGallery=true;

    const elements = document.querySelectorAll('.header-link-item');
    elements.forEach(element => {
      element.classList.remove('active');
    });
    const timeLine = document.getElementById("gallery");
    // @ts-ignore
    timeLine.classList.add("active")
  }

  displayTimeLine() {
    this.display=true;
    this.displayGallery=false;
    const elements = document.querySelectorAll('.header-link-item');
    elements.forEach(element => {
      element.classList.remove('active');
    });
    const timeLine = document.getElementById("timeLine");
    // @ts-ignore
    timeLine.classList.add("active")
  }

  checkIfChatExist():boolean{
    if (this.profile.chats.length>0){
      for (const profileElement of this.profile.chats) {
        if (profileElement.chatCode){
          return true;
        }
      }
    }
    return false;
  }

  /************* stars ********************/


  highlightStars(starIndex: number): void {
    this.currentStar = starIndex;
  }

  resetStars(): void {
    this.currentStar = Math.round(this.profile.ratingStars);
  }


  rateArtist(i: number) {
    this.currentStar=i;
    this.artistService.rateArtist(this.profileId,i+1).subscribe(
      (response)=>{
        console.log(response)
        this.fetchByIdProfile(this.profileId)
      },error=>{
        console.log(error)
      }
    )
  }
}


