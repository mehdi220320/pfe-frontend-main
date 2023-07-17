import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Artist} from "../models/artist";
import {Observable} from "rxjs";
import {Publication} from "../models/publication";
import {Comment} from "../models/Comment";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiServerUrl=environment.apiBaseUrl;
  private jwt = localStorage.getItem('jwtToken');
  constructor(private http:HttpClient) { }
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  addPublication(publication:Publication):Observable<Publication>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.post<Publication>(`${this.apiServerUrl}/publication/addPub`, publication, { headers });
  }

  getPostsByOwner():Observable<Publication[]>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<Publication[]>(`${this.apiServerUrl}/publication/getPubByOwner`, { headers });
  }

  commenter(comment:Comment,idContPub:number):Observable<Comment>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.post<Comment>(`${this.apiServerUrl}/comment/addComment/`+idContPub, comment, { headers });
  }

  getCommentsByIdPub(id:number):Observable<Comment[]>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<Comment[]>(`${this.apiServerUrl}/comment/getCommentByPub/`+id,{ headers });
  }

  getPubByProfileId(profileId:string):Observable<Publication[]>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<Publication[]>(`${this.apiServerUrl}/publication/getPubByProfileId/`+profileId, { headers });
  }

  getFollowingPosts():Observable<Publication[]>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<Publication[]>(`${this.apiServerUrl}/utilisateurSimple/getfollowingposts`, { headers });
  }

  likePost(idContPub:number):Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.post<any>(`${this.apiServerUrl}/likes/addLike/`+idContPub,null, { headers });
  }

  dislike(idContPub:number):Observable<any>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.delete<any>(`${this.apiServerUrl}/likes/deleteLike/`+idContPub, { headers });
  }

  getLikesByIdContenu(idContPub:number):Observable<any[]>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<any[]>(`${this.apiServerUrl}/likes/getAllLikes`+idContPub, { headers });
  }

  getAllLikesNames(idContPub:number):Observable<any[]>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<any[]>(`${this.apiServerUrl}/likes/getAllLikesNames/`+idContPub, { headers });
  }

  getPubForComment(idContenu:number):Observable<Publication>{
    const headers = { Authorization: `Bearer ${(this.jwt)}` }; // replace `jwt` with your actual JWT value
    return this.http.get<Publication>(`${this.apiServerUrl}/publication/getPubForComment/`+idContenu, { headers });
  }



}
