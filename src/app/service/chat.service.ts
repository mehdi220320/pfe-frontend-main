import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );
  private jwt = localStorage.getItem('jwtToken');

  getCurrentUserChat():Observable<any[]> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.get<any[]>(`${this.apiServerUrl}/chats/getCurrentUserChat`,{headers});
  }

  getChat(profileId:string):Observable<any> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.get<any>(`${this.apiServerUrl}/chats/getChat/`+profileId,{headers});
  }

  sendMssg(chatId:number,mssgBody:string):Observable<any> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.post<any>(`${this.apiServerUrl}/chats/send/`+chatId,mssgBody,{headers});
  }

  openChat(profileId:string):Observable<any> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.post<any>(`${this.apiServerUrl}/chats/add/`+profileId,null,{headers});
  }

  setlastChatsDate():Observable<any> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.post<any>(`${this.apiServerUrl}/chats/setlastDate`,null,{headers});
  }

  getUnreadedNbrChat():Observable<number> {
    const headers = { Authorization: `Bearer ${(this.jwt)}` };
    return this.http.get<number>(`${this.apiServerUrl}/chats/nbrMssgs`,{headers});
  }




}
