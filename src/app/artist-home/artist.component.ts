import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FileHandle} from "../models/FileHandle";
import {PublicationService} from "../service/publication.service";
import {Publication} from "../models/publication";
import {contenue} from "../models/contenue";
import {Image} from "../models/image";
import {UserService} from "../service/user.service";
import {NgForm} from "@angular/forms";
import {UpdatedUser} from "../models/updatedUser";


@Component({
  selector: 'app-artist-home',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  imagesUploads: FileHandle[] = [];
  isEmojiPickerVisible!: boolean;
  textArea = 'add ...';
  url: any;
  postsByOwner:Publication[] = []
  currentArtist!: any;
  display=true;
  displayFollower=false;
  displayGallery=false;
  nbrFollowing!:number
  nbrFollower!:number
  about: string=' ';
  lives: string=' ';
  website: string=' ';
  telephone: string = ' ';
  latestImg:string[]=[];


  constructor(private sanitizer: DomSanitizer,private userService : UserService,
              private publicationService:PublicationService) { }

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
    // @ts-ignore
    this.getCurrentUser(localStorage.getItem("ProfileId"))


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
        response.forEach(pub=>{
          pub.contenu.imgs.forEach(img=>{
            this.latestImg.push(img.path)
          })
        })
      },error => {
        console.log(error)
      }
    )
  }

  getCurrentUser(profileId:string){
    this.userService.fetchCurrentUser(profileId).subscribe(
      (response:any)=>{
        console.log("*******************"+JSON.stringify(response))
        this.currentArtist=response;
        this.nbrFollowing=response.following.length
        this.nbrFollower=response.follower.length
        this.about=response.description
        this.lives=response.lives
        this.website=response.website
        this.telephone=response.telephone

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
    this.displayFollower=false;
    this.displayGallery=false;
    const elements = document.querySelectorAll('.header-link-item');
    elements.forEach(element => {
      element.classList.remove('active');
    });
    const timeLine = document.getElementById("timeLine");
    // @ts-ignore
    timeLine.classList.add("active")

  }
  displayAllFollower() {
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


  handleVariableFollowing(variable: number) {
    this.nbrFollowing=variable;
  }


  handleVariableFollower(variable: number) {
    this.nbrFollower=variable
  }

  onSubmit(f: NgForm) {
    console.log(f)
    let updated = new UpdatedUser();
    updated.name=f.value.name
    updated.lastName=f.value.lastName
    updated.profileImg=f.value.profileImg
    updated.phone=f.value.phone
    updated.speciality=f.value.speciality
    updated.description=f.value.description
    updated.backProfileImg=f.value.backProfileImg
    console.log(updated)
    this.userService.updateUser(updated).subscribe(
      (response)=>{
        console.log(response)
      },error=>{
        console.log(error)
      }
    )
    this.about=f.value.description;
    this.telephone=f.value.phone;
  }

  closeModal() {
    const element = document.getElementById('closeModal')
    // @ts-ignore
    element.click();
  }


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
    this.userService.modifyAbout(this.about).subscribe(
      (response)=>{
        console.log(response)
        // @ts-ignore
        this.getCurrentUser(localStorage.getItem("ProfileId"))
      },error => {
        console.log(error)
      }
    )
  }

  saveLives() {
    this.hide('lives')
    this.userService.modifyLives(this.lives).subscribe(
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
    this.userService.modifyWebsite(this.website).subscribe(
      (response)=>{
        console.log(response)
        // @ts-ignore
        this.getCurrentUser(localStorage.getItem("ProfileId"))
      },error => {
        console.log(error)
      }
    )
  }

  savephone() {
    this.hide('telephone')
    this.userService.modifyPhone(this.telephone).subscribe(
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
    }else if (elementId==='lives'){
      this.lives=' ';
    }else if (elementId==='website'){
      this.website=' ';
    }else if (elementId==='telephone'){
      this.telephone=' ';
    }
  }





}


