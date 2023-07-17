import { Component, OnInit } from '@angular/core';
import {FileHandle} from "../models/FileHandle";
import {Publication} from "../models/publication";
import {DomSanitizer} from "@angular/platform-browser";
import {PublicationService} from "../service/publication.service";
import {Image} from "../models/image";
import {contenue} from "../models/contenue";
import {ArtistService} from "../service/artist.service";
import {Artist} from "../models/artist";
import {UserService} from "../service/user.service";
import {SimpleUserService} from "../service/simple-user.service";
import {NgForm} from "@angular/forms";
import {UpdatedUser} from "../models/updatedUser";

@Component({
  selector: 'app-simple-user',
  templateUrl: './simple-user.component.html',
  styleUrls: ['./simple-user.component.css']
})
export class SimpleUserComponent implements OnInit {
  imagesUploads: FileHandle[] = [];
  isEmojiPickerVisible!: boolean;
  textArea = 'add ...';
  url: any;
  postsByOwner:Publication[] = [];
  allArtist:Artist[]=[];
  currentSimpleUser!:any
  display = true;
  displayFollower = false;
  nbrFollowers!: number;
  nbrFollowing!: number;
  displayGallery: boolean =false;
  about: string=' ';
  website: string=' ';


  constructor(private sanitizer: DomSanitizer,
              private publicationService:PublicationService,
              private artistService : ArtistService,
              private userService : UserService,private simpleUserService:SimpleUserService) { }

  ngOnInit(): void {
    const myTextarea = document.getElementById("note");
    const myButton = document.getElementById("publier");
    // @ts-ignore
    myTextarea.addEventListener("input", function() {
      // @ts-ignore
      if (myTextarea.checkValidity()) {
        // @ts-ignore
        myButton.disabled = false;
      } else {
        // @ts-ignore
        myButton.disabled = true;
      }
    });

    this.getPostsByOwner();
    this.getAllArtist();
    this.getFollowers();
    this.getFollowing();

    // @ts-ignore
    this.getCurrentUser(localStorage.getItem("ProfileId"));
    this.displayTimeLine();



  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const url = e.target.result;
          this.imagesUploads.push({file, url});
          console.log(url)
        };
        reader.readAsDataURL(file);
      }
    }
  }





  public addEmoji(event:any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  removeImages(i: number) {
    this.imagesUploads.splice(i,1);
  }



  addPublication() {
    let imgs = [];
    for (const imagesUpload of this.imagesUploads) {
      imgs.push(new Image(imagesUpload.url.toString()))
    }
    let contenuePub = new contenue(0,this.textArea, [],imgs,[])
    let pub = new Publication(contenuePub);
    console.log(pub)
    this.publicationService.addPublication(pub).subscribe(
      (response:any)=>{
        console.log(response);
        location.reload();
      },error => {
        console.log(error)
      }
    );
    this.textArea ='add ...';
    this.imagesUploads=[];

  }

  getPostsByOwner(){
    this.publicationService.getPostsByOwner().subscribe(
      (response:Publication[])=>{
        this.postsByOwner = response;
        console.log(response[0].contenu.comments)
      },error => {
        console.log(error)
      }
    )
  }

  getAllArtist(){
    this.artistService.getAllArtist().subscribe(
      (response:Artist[])=>{
        console.log(response)
        this.allArtist.push(...response)
      },error=>{
        console.log(error)
      }
    )
  }

  getCurrentUser(profileId:string){
    this.userService.fetchCurrentUser(profileId).subscribe(
      (response:any)=>{
        console.log("*******************"+JSON.stringify(response.follower), "Length:", response.follower.length)
        this.currentSimpleUser=response;
        this.about=response.description;
        this.website=response.website;
        console.log(this.about)
      },error=>{
        console.log(error)
      }
    )
  }


  displayFollowing() {
    this.display = false;
    this.displayFollower=false;
    this.displayGallery=false;
    const elements = document.querySelectorAll('.header-link-item');
    elements.forEach(element => {
      element.classList.remove('active');
    });
    const following = document.getElementById("following");
    // @ts-ignore
    following.classList.add("active")
  }

  displayTimeLine() {
    this.display=true;
    this.displayFollower=false
    this.displayGallery=false;
    const elements = document.querySelectorAll('.header-link-item');
    elements.forEach(element => {
      element.classList.remove('active');
    });
    const timeLine = document.getElementById("timeLine");
    // @ts-ignore
    timeLine.classList.add("active")

  }


  displayFollowers() {
    this.display=false;
    this.displayFollower=true
    this.displayGallery=false;
    const elements = document.querySelectorAll('.header-link-item');
    elements.forEach(element => {
      element.classList.remove('active');
    });
    const timeLine = document.getElementById("followers");
    // @ts-ignore
    timeLine.classList.add("active")
  }

  showGallery() {
    this.display=false;
    this.displayFollower=false;
    this.displayGallery=true;

    const elements = document.querySelectorAll('.header-link-item');
    elements.forEach(element => {
      element.classList.remove('active');
    });
    const timeLine = document.getElementById("gallery");
    // @ts-ignore
    timeLine.classList.add("active")
  }

  handleVariableFollower(variable: number) {
    this.nbrFollowers = variable;
    // Perform actions with the received variable
  }

  getFollowers(){
    this.simpleUserService.getFollowers().subscribe(
      (response)=>{
        this.nbrFollowers=response.length
      },error => {
        console.log(error)
      }
    )
  }

  getFollowing(){
    this.simpleUserService.getFollowing().subscribe(
      (response)=>{
        console.log(response)
        this.nbrFollowing=response.length
      },error => {
        console.log(error)
      }
    )
  }

  handleVariableFollowing(variable: number) {
    this.nbrFollowing = variable;
  }

  onSubmit(f: NgForm) {
    console.log(f)
    let updated = new UpdatedUser();
    updated.name=f.value.name
    updated.lastName=f.value.lastName
    updated.profileImg=f.value.profileImg
    updated.backProfileImg=f.value.backProfileImg
    console.log(updated)
    this.userService.updateUser(updated).subscribe(
      (response)=>{
        console.log(response)
      },error=>{
        console.log(error)
      }
    )
  }

  closeModal() {
    const element = document.getElementById('closeModal')
    // @ts-ignore
    element.click();
  }

  /****************************************************************/
  hide(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = "none";
      // @ts-ignore
      this.getCurrentUser(localStorage.getItem("ProfileId"))
    }
  }

  show(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = "block";
    }
  }

  getElementDisplay(elementId: string): string {
    const element = document.getElementById(elementId);
    return element ? element.style.display : '';
  }

  saveAbout() {
    this.hide('about')
    this.simpleUserService.modifyAbout(this.about).subscribe(
      (response)=>{
        console.log(response)
        // @ts-ignore
        this.getCurrentUser(localStorage.getItem("ProfileId"))
      },error => {
        console.log(error)
      }
    )
  }

  saveWebsite() {
    this.hide('website')
    this.simpleUserService.modifyWebsite(this.website).subscribe(
      (response)=>{
        console.log(response)
        // @ts-ignore
        this.getCurrentUser(localStorage.getItem("ProfileId"))
      },error => {
        console.log(error)
      }
    )
  }


  clear(elementId: string): void {
    if (elementId==='about'){
      this.about=' ';
    }else if (elementId==='website'){
      this.website=' ';
    }
  }




}
