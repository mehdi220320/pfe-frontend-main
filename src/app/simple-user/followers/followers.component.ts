import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SimpleUserService} from "../../service/simple-user.service";

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  @Output() nbrFollowers = new EventEmitter<number>()

  follower:any = [];
  constructor(private simpleUserService : SimpleUserService) { }

  ngOnInit(): void {
    this.getFollowers();
  }

  passVariable() {
    const childVariable = this.follower.length;
    this.nbrFollowers.emit(childVariable);
  }

  getFollowers(){
    this.simpleUserService.getFollowers().subscribe(
      (response)=>{
        this.follower.push(...response);
        console.log(response)
        this.passVariable()
      },error => {
        console.log(error)
      }
    )
  }

  deleteFollower(profileId: string, i: number) {
    this.simpleUserService.deletefollower(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.follower.splice(i,1)
        this.passVariable()
      },error => {
        console.log(error)
      }
    )

  }

}
