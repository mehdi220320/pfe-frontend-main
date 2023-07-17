import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SimpleUser} from "../models/simple-user";
import {catchError, Observable, throwError} from "rxjs";
import {UserVerificationDTO} from "../models/userVerificationDTO";

@Injectable({
  providedIn: 'root'
})
export class SimpleUserService {

  private apiServerUrl=environment.apiBaseUrl;
  private jwt = localStorage.getItem('jwtToken');
  constructor(private http:HttpClient) { }
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );


  addSimpleUser(simpleUser:SimpleUser):Observable<SimpleUser>{
    return this.http.post<SimpleUser>(`${this.apiServerUrl}/utilisateurSimple/adduser`,simpleUser,
      {headers:this.requestHeader});
  }

  saveSimpleUser(verf:UserVerificationDTO):Observable<UserVerificationDTO>{
    return this.http.post<UserVerificationDTO>(`${this.apiServerUrl}/utilisateurSimple/saveuser`,verf,
      {headers:this.requestHeader}).pipe(catchError(error => {
      return throwError(error.error);
    }));
  }


  resendCode(userName: string):Observable<string> {
    return this.http.put<string>(`${this.apiServerUrl}/artiste/resendcode`,userName,
      {headers:this.requestHeader});
  }

  getFollowing():Observable<any[]> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.get<any[]>(`${this.apiServerUrl}/utilisateurSimple/getfollowing`,{headers});
  }


  unfollow(profileId: string) {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.delete<any>(`${this.apiServerUrl}/utilisateurSimple/unfollow/`+profileId,{headers});
  }

  getFollowers():Observable<any[]> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.get<any[]>(`${this.apiServerUrl}/utilisateurSimple/getfollowers`,{headers});
  }

  deletefollower(profileId: string) {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.delete<any>(`${this.apiServerUrl}/utilisateurSimple/deletefollower/`+profileId,{headers});
  }

  getAllSimpleUserDTOS(): Observable<any[]>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<any[]>(`${this.apiServerUrl}/utilisateurSimple/getallDTOS`,{ headers });
  }

  modifyAbout(about:string):Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.post<any>(`${this.apiServerUrl}/utilisateurSimple/modifyDescription`,
      about,{ headers });
  }

  modifyWebsite(url:string):Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.post<any>(`${this.apiServerUrl}/utilisateurSimple/modifyWebsite`,
      url,{ headers });
  }
}
