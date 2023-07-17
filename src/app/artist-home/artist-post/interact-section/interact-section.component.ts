import {Component, Input, OnInit} from '@angular/core';
import {contenue} from "../../../models/contenue";
import {Comment} from "../../../models/Comment";
import {PublicationService} from "../../../service/publication.service";
import {Subscription} from "rxjs";
import { trigger, state, style, transition, animate } from '@angular/animations';
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-interact-section',
  templateUrl: './interact-section.component.html',
  styleUrls: ['./interact-section.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        'max-height': '100%',
        'opacity': '1',
        'visibility': 'visible'
      })),
      state('out', style({
        'max-height': '0px',
        'opacity': '0',
        'visibility': 'hidden'
      })),

      transition('out => in', [
        animate('1ms ease-in-out', style({
          'visibility': 'visible'
        })),
        animate('600ms ease-in-out', style({
          'opacity': '1'
        })),
        animate('800ms ease-in-out', style({
          'max-height': '100%'
        }))
      ])
    ])
  ]
})

export class InteractSectionComponent implements OnInit {
  isEmojiPickerVisible!: boolean;
  urinput : string = "";
  @Input("interact") intercat!:contenue
  @Input("connectedUserName") connectedUserName!:string
  timer:any;
  displayedItems:Comment[] = []
  showSection = false;
  showAll = false;
  redHeart = false;
  showLikeList!:boolean;
  likes:string[] = []
  items:any[] = []

  constructor(private pubService:PublicationService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sortByTimeDifference()
    console.log(this.intercat)
    this.startTimer()
    this.displayedItems = this.intercat.comments.slice(0, 3);


    const idOwnerList = this.intercat.likes.map(item => item.idOwner);
    console.log(idOwnerList)
    console.log(this.connectedUserName)
    if (idOwnerList.includes(this.connectedUserName)){
      console.log()
      this.redHeart=true;
    }


    this.getAllLikesNames(this.intercat.id)

  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.getCommentsByIdContenu(this.intercat.id)
      for (let cmt of this.intercat.comments) {
        this.getTimeAgo(cmt)
      }
      // call the getTimeAgo function here for each comment you want to update
    }, 1000); // update every minute
  }

  stopTimer() {
    clearInterval(this.timer);
  }



  addEmoji(event: any) {
    this.urinput = `${this.urinput}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  getTimeAgo(comment: Comment) {
    const differenceInMilliseconds = new Date().getTime() - new Date(comment.date).getTime();
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
      this.intercat.comments.sort((b, a) => {
        const differenceA = new Date().getTime() - new Date(a.date).getTime();
        const differenceB = new Date().getTime() - new Date(b.date).getTime();
        return differenceA - differenceB;
      });
    }

    getCommentsByIdContenu(id:number):Subscription{
      return this.pubService.getCommentsByIdPub(id).subscribe(
        (response:Comment[])=>{
          this.displayedItems = []
          this.displayedItems.push(...response);
          this.sortByTimeDifference()
        },error => {
          console.log(error)
        }
      )

    }


    commenter(comment: string, id: number) {
      console.log(id)
      console.log(this.intercat)
      let cmt = new Comment(comment);
      this.pubService.commenter(cmt,id).subscribe(
        (response)=>{
          console.log(response)
          this.getCommentsByIdContenu(this.intercat.id)
          this.urinput=""
        },error => {
          console.log(error)
        }
      )
    }

    /************************************************************************/


  hideSection() {
    this.showSection = !this.showSection;
  }


  showAllItems() {
    this.showAll = true;
    this.displayedItems = this.intercat.comments;
  }
  showLessItems() {
    this.showAll = false;
    this.displayedItems = this.intercat.comments.slice(0, 3);
  }

  like(idContenue:number) {
    this.redHeart=!this.redHeart;
    this.pubService.likePost(idContenue).subscribe(
      (response)=>{
        this.getAllLikesNames(idContenue)
        console.log(response)
        console.log("like")
      },error => {
        console.log(error)
      }
    )
  }

  dislike(id: number) {
    this.redHeart=!this.redHeart;
    this.pubService.dislike(id).subscribe(
      (response)=>{
        this.getAllLikesNames(id)
        console.log(response)
        console.log("dislike")
      },error => {
        console.log(error)
      }
    )
  }

  getLikesByIdContenu(id:number){
    this.pubService.getLikesByIdContenu(id).subscribe(
      (response)=>{
        console.log(response)
      },error => {
        console.log(error)
      }
    )
  }

  getAllLikesNames(id:number){
    this.pubService.getAllLikesNames(id).subscribe(
      (response)=>{
        console.log(response)
        this.items.push(...response)
        this.likes=[]
        response.forEach(item=>{
          this.likes.push(item.name+" "+item.lastName)
        })
      },error => {
        console.log(error)
      }
    )
  }




}


