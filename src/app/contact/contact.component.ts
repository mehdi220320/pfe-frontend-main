import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageDTO} from "../models/messageDTO";
import {ContactService} from "../service/contact.service";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm = new FormGroup({
    userName : new FormControl('',[Validators.email]),
    tel : new FormControl('',[Validators.min(10000000),Validators.max(99999999)]),
    name : new FormControl('',[]),
    selectedOption : new FormControl('',[]),
    message : new FormControl('',[]),
  });

  constructor(private contactService:ContactService) {}

  ngOnInit(): void {
  }

  envoyerMail(contactForm: FormGroup) {
      let mssg = new MessageDTO()
      mssg.name = contactForm.value.name;
      mssg.tel = contactForm.value.tel;
      mssg.email = contactForm.value.userName;
      mssg.selectedOption = contactForm.value.selectedOption;
      mssg.message = contactForm.value.message;
    console.log(mssg)
    this.contactService.sendContact(mssg).subscribe(
      (result:MessageDTO)=>{
        console.log(result)
      },error=>{
        alert('this Email isnt sent')
      }
    )
  }

  get controls(){
    return this.contactForm.controls;
  }
}
