import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {Artist} from "../models/artist";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ArtistService} from "../service/artist.service";
import {Router} from "@angular/router";
import {SimpleUserService} from "../service/simple-user.service";
import {GlobalService} from "../service/global.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-signup-artist-home',
  templateUrl: './signup-artist.component.html',
  styleUrls: ['./signup-artist.component.css'],
  animations: [
    trigger('alertAnimation', [
      state('void', style({ transform: 'translateY(-100%)' })),
      state('*', style({ transform: 'translateY(0)' })),
      transition('void => *', animate('1s')),
      transition('* => void', animate('1s'))
    ])
  ]
})
export class SignupArtistComponent implements OnInit {
  showHide = false;
  showHidecf = false;
  showAlert:boolean=false;
  isLoading: boolean = false;

  constructor(private spinner:NgxSpinnerService,
              private simpleUserService:SimpleUserService,
              private router:Router,
              private artistService:ArtistService,
              private globalService : GlobalService
              ) { }

  signupForm = new FormGroup({
    userName : new FormControl('',[Validators.email]),
    userPassword : new FormControl('',[Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    tel : new FormControl('',[Validators.min(10000000),Validators.max(99999999)]),
    cin : new FormControl('',[Validators.min(10000000),Validators.max(99999999)]),
    name : new FormControl('',[]),
    prenom : new FormControl('',[]),
    selectedOption : new FormControl('',[]),
    specialite : new FormControl('',[]),
    description : new FormControl('',[]),
    userPasswordCnf : new FormControl('',[])
  });



  checkPasswords(group: FormGroup) {
    const pass = group.controls['userPassword'].value;
    const confirmPass = group.controls['userPasswordCnf'].value;

    return pass === confirmPass ? null : { notSame: true };
  }
  ngOnInit(): void {
    // @ts-ignore
    this.signupForm.setValidators(this.checkPasswords);
    window.scrollTo(0, 0);

    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 100000);

  }
  /*verifyMails(email:string){
    this.spinner.show();
    this.clientService.allemails().subscribe(
      (result)=>{
        console.log(result)
        this.spinner.hide();
        this.emails=[];
        this.emails.push.apply(this.emails,result);
        if (this.emails.includes(email)){
          alert('this mail already exist')
        }
      },error => {
        this.spinner.hide();
      }
    );
  }*/


  async signup(signupForm: FormGroup) {
    this.isLoading = true;
    let user = new Artist();
    user.name = signupForm.value.name;
    user.userName = signupForm.value.userName;
    user.userPassword = signupForm.value.userPassword;
    user.lastName = signupForm.value.prenom;
    user.telephone = signupForm.value.tel;
    user.specialite = signupForm.value.specialite;
    user.description = signupForm.value.description;
    user.cin = signupForm.value.cin;
    console.log(user)
    this.artistService.addArtist(user).subscribe(
      (result: Artist) => {
        this.globalService.artiste = result
        console.log(this.globalService.artiste)
        this.globalService.myGlobalVariable = 'artiste';
        this.router.navigate(['/verify']);
        console.log(result)
      }, error => {
        alert('this Email already exist')
      }
    )
    this.isLoading = false;
  }


  get controls(){
    return this.signupForm.controls;
  }

  showPassword(){
    this.showHide = !this.showHide
    console.log(this.showHide)
    if (this.showHide){
      // @ts-ignore
      document.getElementById("eyeslashpass").className="fa fa-eye";
      // @ts-ignore
      document.getElementById("showpass").setAttribute('type','text')
    }else {
      // @ts-ignore
      document.getElementById("eyeslashpass").className="fa fa-eye-slash";
      // @ts-ignore
      document.getElementById("showpass").setAttribute('type','password')
    }
  }


  showPasswordcf() {
    this.showHidecf = !this.showHidecf
    console.log(this.showHidecf)
    if (this.showHidecf){
      // @ts-ignore
      document.getElementById("eyeslashpasscf").className="fa fa-eye";
      // @ts-ignore
      document.getElementById("showpasscf").setAttribute('type','text')
    }else {
      // @ts-ignore
      document.getElementById("eyeslashpasscf").className="fa fa-eye-slash";
      // @ts-ignore
      document.getElementById("showpasscf").setAttribute('type','password')
    }
  }

}
