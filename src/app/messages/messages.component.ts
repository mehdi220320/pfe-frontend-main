import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ChatService} from "../service/chat.service";
import {UserService} from "../service/user.service";
import {error} from "highcharts";
import {getSourceFile} from "@angular/compiler-cli/src/ngtsc/util/src/typescript";
import {GlobalService} from "../service/global.service";

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    return formattedDate.replace(',', '');
  }
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  allMyChats: any[] = []
  currentChat: any;
  who: any;
  currentUser: any;
  selectedChat: any;
  lastMssg='';



  constructor(private chatService: ChatService, private userService: UserService) {
  }

  async ngOnInit(){
    // @ts-ignore
    this.getConnectedUser(localStorage.getItem("ProfileId"))
    console.log("///////////////////"+this.allMyChats)
    await this.getAllChat();


    this.currentChat = this.allMyChats[0]?.chat;
    this.getChat(this.allMyChats[0]?.who.profileId);
    this.runFunctionEverySecond();

    this.runFunctionEverySecond2();
  }


  runFunctionEverySecond2(): void {
    setInterval(() => {
      if (this.currentChat) {
        const lastMssg = this.lastMssg;
        let updateMssg = '';
        this.allMyChats.forEach((item) => {
          if (item.chat.chatId == this.currentChat.chatId) {
            updateMssg = item.chat.messages[this.currentChat.messages.length - 1].mssg;
          }
        });
        console.log("last mssg = " + lastMssg);
        console.log("updated mssg = " + updateMssg);
        if (lastMssg == updateMssg) {
          let s = this.currentChat.chatCode;
          const modifiedString1 = s.replace(localStorage.getItem("ProfileId"), "");
          const modifiedString2 = modifiedString1.replace("//", "");
          this.getChat(modifiedString2);
        }
      }
    }, 1000);
  }

  runFunctionEverySecond(): void {
    setInterval(() => {
      // Your function code here
      console.log('Function executed every second');
      this.getAllChat().catch((error) => {
        console.log('Error:', error);
      });
    }, 700); // 1000 milliseconds = 1 second
  }

  getAllChat(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.chatService.getCurrentUserChat().subscribe(
        (response) => {

          console.log(response);
          response.forEach((item,index)=>{
            if (item.chat.messages.length<1){
              response.splice(index,1)
            }
          })

          this.allMyChats=[]
          this.allMyChats.push(...response);

          this.allMyChats.sort((a, b) => {
            const lastMessageDateA = new Date(a.chat.messages[a.chat.messages.length - 1].time);
            const lastMessageDateB = new Date(b.chat.messages[b.chat.messages.length - 1].time);
            return lastMessageDateB.getTime() - lastMessageDateA.getTime();
          });

          resolve(); // Resolve the promise when the chat data is loaded
        },
        (error) => {
          console.log(error);
          reject(); // Reject the promise if there is an error
        }
      );
    });
  }

  getChat(profileId: string) {
    this.chatService.getChat(profileId).subscribe(
      (response) => {
        console.log(response.messages[response.messages.length-1].mssg)
        this.lastMssg=response.messages[response.messages.length-1].mssg
        console.log(response)
        this.currentChat = response;
        this.findChatById(response.chatId);

        response.messages.sort((a: { time: string | number | Date; }, b: { time: string | number | Date; }) => {
          const timeA = new Date(a.time).getTime();
          const timeB = new Date(b.time).getTime();
          return timeA - timeB;
        });

        this.selectedChat=response
        console.log(this.selectedChat)

      }, error => {
        console.log(error)
      }
    )
  }

  findChatById(id: number) {
    this.allMyChats.forEach(item => {
      if (item.chat.chatId == id) {
        console.log(item.who)
        this.who = item.who;
      }
    })
  }

  getConnectedUser(id: string) {
    this.userService.fetchCurrentUser(id).subscribe(
      (response) => {
        console.log(response)
        this.currentUser = response;
      }, error => {
        console.log(error)
      }
    )
  }

  formatTime(time: string): string {
    const date = new Date(time);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedTime = `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
  }


  sendMssg(chatId: number, value: string) {
    this.chatService.sendMssg(chatId, value).subscribe(
      (response) => {
        console.log(response)
        this.allMyChats = [];
        this.getAllChat();
        let s = this.currentChat.chatCode;
        const modifiedString1 = s.replace(localStorage.getItem("ProfileId"), "");
        const modifiedString2 = modifiedString1.replace("//", "");
        this.getChat(modifiedString2)
      }, error => {
        console.log(error)
      }
    )
  }

  /*********************************************/

  messageInputValue: string = ''; // Holds the value of the input field
  isEmojiPickerVisible: boolean = false; // Controls the visibility of the emoji picker
  selectedEmoji: any = null; // Holds the selected emoji


  addEmoji(event: any) {
    this.messageInputValue = `${this.messageInputValue}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }



}

