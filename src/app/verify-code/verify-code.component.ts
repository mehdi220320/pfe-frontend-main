import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ArtistService} from "../service/artist.service";
import {Router} from "@angular/router";
import {GlobalService} from "../service/global.service";
import {SimpleUserService} from "../service/simple-user.service";
import {UserVerificationDTO} from "../models/userVerificationDTO";
import {ArtisteVerificationDTO} from "../models/artisteVerificationDTO";

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {


  constructor(private artistService:ArtistService,
              private router:Router,
              private globalService:GlobalService,
              private simpleUserService:SimpleUserService) { }
  public resendDate!: Date ;


  ngOnInit(): void {
    console.log(this.globalService.artiste)
  }

  verify(verifyForm:NgForm){
    let n1 = verifyForm.value.digit1;
    let n2 = verifyForm.value.digit2;
    let n3 = verifyForm.value.digit3.toString();
    let n4 = verifyForm.value.digit4;
    let n5 = verifyForm.value.digit5;
    let n6 = verifyForm.value.digit6;
    let n = n1+n2+n3+n4+n5+n6;

    console.log(n)
    let num = parseInt(n);
    if (this.globalService.myGlobalVariable ==''){
      this.router.navigate(["/signup"])
    }

    if (this.globalService.myGlobalVariable == 'artiste') {
      let verf = new ArtisteVerificationDTO(this.globalService.artiste,String(num))
      console.log(verf)
      this.artistService.saveArtist(verf).subscribe(
        (result) => {
          console.log(result)
          localStorage.removeItem('countDownDate');
          this.router.navigate(['/homeartist',verf.artiste.profileId]);
        }, error => {
          alert(error.message)
          console.log(error.message)
        }
      )
    } else if (this.globalService.myGlobalVariable == 'utilisateurSimple') {
      let utilisateurVerification = new UserVerificationDTO(this.globalService.utilisateurSimple,String(num));
      console.log(utilisateurVerification)
      this.simpleUserService.saveSimpleUser(utilisateurVerification).subscribe(
        (result) => {
          console.log(result)
          localStorage.removeItem('countDownDate');
          this.router.navigate(['/homeartist']);
        }, error => {
          alert(error.message)
          console.log(error.message)
        }
      )
    }


  }

  move(e:any,p:any,c:any,n:any) {
    var length = c.value.length ;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength){
      if (n!=""){
        n.focus();
      }
    }
    if (e.key === "Backspace"){
      if (p!=""){
        p.focus();
      }
    }
  }


  resendCode() {
    if (this.globalService.myGlobalVariable == 'artiste'){
      this.resendDate = new Date();
      console.log(this.globalService.artiste.userName.toString())
      this.artistService.resendCode(this.globalService.artiste.userName.toString()).subscribe(
        (result)=>{
          console.log(result)

        },error=>{
          console.log(error.message)
        }
      )
    }else if (this.globalService.myGlobalVariable == 'utilisateurSimple'){
      this.resendDate = new Date();
      console.log(this.globalService.utilisateurSimple.userName.toString())
      this.simpleUserService.resendCode(this.globalService.utilisateurSimple.userName.toString()).subscribe(
        (result)=>{
          console.log(result)

        },error=>{
          console.log(error.message)
        }
      )
    }
  }
}
