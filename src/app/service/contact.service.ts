import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageDTO} from "../models/messageDTO";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  sendContact(mssg: MessageDTO):Observable<MessageDTO> {
    console.log(mssg)
    return this.http.put<MessageDTO>(`${this.apiServerUrl}/sendMailToUpcycling`,mssg,
      {headers:this.requestHeader});
  }
}
