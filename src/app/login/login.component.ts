import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {UserAuthService} from "../service/user-auth.service";
import {FormControl, FormGroup,Validators} from "@angular/forms";
import {GlobalService} from "../service/global.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm = new FormGroup({
    userName:new FormControl('',[Validators.required,Validators.email]),
    userPassword:new FormControl('')
  })
  isLoading: boolean = false;

  constructor(private router: Router,
              private route : ActivatedRoute,
              private userService:UserService,
              private userAuthService:UserAuthService) { }

  ngOnInit(): void {

  }

  async login(myForm: FormGroup) {
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.userService.login(myForm.value).subscribe(
      (response: any) => {
        console.log(response.jwtToken);
        console.log(response.user.roles);
        console.log(response.user)
        localStorage.setItem("ProfileId", response.user.profileId)
        this.userAuthService.setRoles(response.user.roles)
        this.userAuthService.setToken(response.jwtToken)
        const role = response.user.roles[0].roleName;
        if (role === 'Artiste') {
          console.log("free trial : " + response.user.freeTrial)
          console.log("now : " + new Date())
          if (true) {
            console.log("free trial is not yet fininsh")
            this.router.navigate(["/homeartist", response.user.profileId]);
          }

        } else {
          this.router.navigate(["/profileuser", response.user.profileId]);
        }
      }, error => {
        console.log(error.error.message)
        if (error.error.message === 'free trial is over') {
          const element = document.getElementById("createSubs")
          // @ts-ignore
          element.click()
        } else if (error.error.message === 'your subs is expired') {
          const element = document.getElementById("renewSubs")
          // @ts-ignore
          element.click()
        }else if (error.error.message === 'Bad credentials from user'){
          const element = document.getElementById("mdp-false")
          // @ts-ignore
          element.click()
        }
      }
    );


    this.isLoading = false;
  }

  get userName(){
    return this.myForm.get('userName')
  }
  get userPassword(){
    return this.myForm.get('userPassword')
  }

  redirectToRenewalPage() {
    window.location.href = "https://buy.stripe.com/test_bIYg0ubhHcT0gy4000";
  }

}
