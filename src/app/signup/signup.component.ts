import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SimpleUserService} from "../service/simple-user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SimpleUser} from "../models/simple-user";
import {GlobalService} from "../service/global.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  showHide = false;
  showHidecf = false;
  constructor(private spinner:NgxSpinnerService,
              private simpleUserService:SimpleUserService,
              private router:Router,
              private globalVariable : GlobalService) { }

  signupForm = new FormGroup({
    userName : new FormControl('',[Validators.email]),
    userPassword : new FormControl('',[Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    tel : new FormControl('',[Validators.min(10000000),Validators.max(99999999)]),
    name : new FormControl('',[]),
    prenom : new FormControl('',[]),
    userPasswordCnf : new FormControl('',[])
  });


  ngOnInit(): void {

    // @ts-ignore
    this.signupForm.setValidators(this.checkPasswords);
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


  signup(signupForm: FormGroup) {
    /*this.router.navigate(['/verify'], {state: {submitted: true}});*/
    let user = new SimpleUser();
    user.name = signupForm.value.name;
    user.userName = signupForm.value.userName;
    user.userPassword = signupForm.value.userPassword;
    user.lastName = signupForm.value.prenom;
    user.telephone = signupForm.value.tel;
    console.log(user)
      this.simpleUserService.addSimpleUser(user).subscribe(
        (result:SimpleUser)=>{
          this.globalVariable.myGlobalVariable = 'utilisateurSimple'
          this.globalVariable.utilisateurSimple = user;
          this.router.navigate(['/verify']);
          console.log(result)
        },error=>{
          alert('this Email already exist')
        }
      )
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
      console.log(document.getElementById("showpass"))
    }else {
      // @ts-ignore
      document.getElementById("eyeslashpass").className="fa fa-eye-slash";
      // @ts-ignore
      document.getElementById("showpass").setAttribute('type','password')
      console.log(document.getElementById("showpass"))
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
      console.log(document.getElementById("showpasscf"))
    }else {
      // @ts-ignore
      document.getElementById("eyeslashpasscf").className="fa fa-eye-slash";
      // @ts-ignore
      document.getElementById("showpasscf").setAttribute('type','password')
      console.log(document.getElementById("showpasscf"))
    }
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls['userPassword'].value;
    const confirmPass = group.controls['userPasswordCnf'].value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
