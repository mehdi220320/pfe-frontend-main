import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserAuthService} from "./user-auth.service";
import {Observable} from "rxjs";
import {Artist} from "../models/artist";
import {Comment} from "../models/Comment";
import {GlobalService} from "./global.service";
import {UpdatedUser} from "../models/updatedUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jwt = localStorage.getItem('jwtToken');

  private apiServerUrl=environment.apiBaseUrl;
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  constructor(private http: HttpClient,private userAuthService:UserAuthService,private globalService:GlobalService) { }

  public login(loginData: any){
    return this.http.post(this.apiServerUrl+'/authenticate',loginData,{headers:this.requestHeader});
  }

  // @ts-ignore
  public roleMatch(allowedRoles):boolean{
    let isMatch =false;
    const userRoles:any = this.userAuthService.getRoles();
    console.log(userRoles[0].roleName)
    console.log(allowedRoles.includes(userRoles[0].roleName))
    if (userRoles!=null && userRoles){
      for (let i=0;i<userRoles.length;i++){
        for (let j=0;j<allowedRoles.length;j++){
          if (userRoles[i].roleName === allowedRoles[j]){
            isMatch = true ;
            return isMatch;
          }else {
            return isMatch;
          }
        }
      }
    }
  }


  public roleContain(allowedRoles:string[]):boolean{
    let isContain =false;
    const userRoles:any = this.userAuthService.getRoles();
    if (userRoles!=null && userRoles){
      if (allowedRoles.includes(userRoles[0].roleName)){
        return true;
      }
      return isContain
    }
    return isContain;
  }

  fetchByProfileId(profileId: string): Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<any>(`${this.apiServerUrl}/fetchUserByProfileId/`+profileId,{ headers });
  }

  fetchCurrentUser(profileId: string): Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<any>(`${this.apiServerUrl}/fetchCurrentUser/`+profileId,{ headers });
  }

  follow(profileId: string): Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}`}; // replace `jwt` with your actual JWT value
    return this.http.post<any>(`${this.apiServerUrl}/follow/`+profileId,null,{ headers });
  }

  getAllNotifi(): Observable<any[]>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<any[]>(`${this.apiServerUrl}/notification/getAllNotification`,{ headers });
  }

  getUnreadNotif(): Observable<any[]>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<any[]>(`${this.apiServerUrl}/notification/getUnreadNotification`,{ headers });
  }

  setLastNotifDate(): Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}`}; // replace `jwt` with your actual JWT value
    return this.http.post<any>(`${this.apiServerUrl}/notification/setLastNotifDate`,null,{ headers });
  }

  checkIfFollowed(profileId:string): Observable<boolean>{
    const headers = { Authorization: `Bearer ${(this.jwt)}`}; // replace `jwt` with your actual JWT value
    return this.http.get<boolean>(`${this.apiServerUrl}/checkFollowers/`+profileId,{ headers });
  }

  updateUser(updated:UpdatedUser): Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}`}; // replace `jwt` with your actual JWT value
    return this.http.post<any>(`${this.apiServerUrl}/updateUser`,updated,{ headers });
  }

  modifyAbout(about:string): Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}`}; // replace `jwt` with your actual JWT value
    return this.http.post<any>(`${this.apiServerUrl}/artiste/modifyDescription`,about,{ headers });
  }

  modifyLives(lives:string): Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}`}; // replace `jwt` with your actual JWT value
    return this.http.post<any>(`${this.apiServerUrl}/artiste/modifyLives`,lives,{ headers });
  }

  modifyWebsite(webUrl:string): Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}`}; // replace `jwt` with your actual JWT value
    return this.http.post<any>(`${this.apiServerUrl}/artiste/modifyWebsite`,webUrl,{ headers });
  }

  modifyPhone(phone:string): Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}`}; // replace `jwt` with your actual JWT value
    return this.http.post<any>(`${this.apiServerUrl}/artiste/modifyPhone`,phone,{ headers });
  }

  getAllForSearch(): Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}`}; // replace `jwt` with your actual JWT value
    return this.http.get<any>(`${this.apiServerUrl}/search`,{ headers });
  }


}
