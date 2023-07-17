import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Artist} from "../models/artist";
import {ArtisteVerificationDTO} from "../models/artisteVerificationDTO";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );
  private jwt = localStorage.getItem('jwtToken');

  addArtist(artist:Artist):Observable<Artist>{
    return this.http.post<Artist>(`${this.apiServerUrl}/artiste/addartiste`,artist,
      {headers:this.requestHeader});
  }

  saveArtist(verf:ArtisteVerificationDTO):Observable<ArtisteVerificationDTO>{
    return this.http.post<ArtisteVerificationDTO>(`${this.apiServerUrl}/artiste/saveartiste`,verf,
      {headers:this.requestHeader}).pipe(catchError(error => {
      return throwError(error.error);
    }));
  }

    resendCode(userName: string):Observable<string> {
    return this.http.put<string>(`${this.apiServerUrl}/artiste/resendcode`,userName,
      {headers:this.requestHeader});
  }


  getAllArtist():Observable<Artist[]>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.get<Artist[]>(`${this.apiServerUrl}/artiste/allArtist`,
      {headers});
  }

  getFollowingArtist():Observable<any> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.get<any>(`${this.apiServerUrl}/artiste/getFollowing`,{headers});
  }

  getFollowerArtist():Observable<any> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.get<any>(`${this.apiServerUrl}/artiste/getFollowers`,{headers});
  }

  unfollow(profileId: string) {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.delete<any>(`${this.apiServerUrl}/artiste/unfollow/`+profileId,{headers});
  }

  deleteFollower(profileId: string) {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.delete<any>(`${this.apiServerUrl}/artiste/deleteFollower/`+profileId,{headers});
  }

  addwithstripe():Observable<Artist>{
    return this.http.post<Artist>(`${this.apiServerUrl}/api/abonnement/addwithstripe`,null,
      {headers:this.requestHeader});
  }

  rateArtist(profileId:string,stars:number):Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.post<any>(`${this.apiServerUrl}/artiste/rating/${profileId}/${stars}`,null,
      {headers});
  }



}
