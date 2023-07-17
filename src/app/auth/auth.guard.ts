import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from "../service/user-auth.service";
import {UserService} from "../service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuthService:UserAuthService,
              private router:Router,
              private userService:UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userAuthService.getToken() !==null){

      const  role = route.data["roles"] as Array<string>;
      if (route!=null){
        const match = this.userService.roleContain(role)
        if (match){
          return true;
        }else {
          this.router.navigate(['/forbidden'])
          return false;
        }
      }
    }
    this.router.navigate(['/login'])
    return false;
  }

}
