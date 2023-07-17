import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SimpleUserService} from "../../service/simple-user.service";

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  following:any = [];
  @Output() nbrFollowing = new EventEmitter<number>()
  constructor(private simpleUserService : SimpleUserService) { }

  ngOnInit(): void {
    this.getFollowing();
  }

  passVariable() {
    const childVariable = this.following.length;
    this.nbrFollowing.emit(childVariable);
  }

  getFollowing(){
    this.simpleUserService.getFollowing().subscribe(
      (response)=>{
        this.following.push(...response);
        console.log(response)
        this.passVariable();
      },error => {
        console.log(error)
      }
    )
  }

  unfollow(profileId: string, i: number) {
    this.simpleUserService.unfollow(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.following.splice(i,1)
        this.passVariable();
      },error => {
        console.log(error)
      }
    )

  }
}
