import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../service/user-auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {interval, Subject, switchMap, takeUntil} from "rxjs";
import {PublicationService} from "../service/publication.service";
import {ChatService} from "../service/chat.service";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  isContact! :boolean;
  isInscrit! :boolean;
  isHome! :boolean;
  isInscritArtist!:boolean;
  currentUrl ="";
  canAccess = false;
  profileId = "";
  isDropdownOpen: boolean = false;
  unreadNotif:any[]=[];
  allNotif:any[]=[];
  nbrUnreadedChat=0;


  constructor(private userAuthService:UserAuthService,private userService:UserService,
              private router:Router,private pubService:PublicationService,private chatService:ChatService) {


  }

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log(this.currentUrl); // or do whatever you need with the current URL
        this.isContact = this.currentUrl !== "/contact";
        this.isHome = this.currentUrl !== "/login";
        this.isInscrit = this.currentUrl !== "/signup";
        this.isInscritArtist = this.currentUrl !== "/signupartist";

        if (this.currentUrl == "/home"){
          this.moveUp();
        }

      }
    });

    if (this.hasRole('Artiste')) {
      this.canAccess = true;
    }

    // @ts-ignore
    this.profileId = localStorage.getItem("ProfileId");

    this.getUnreadNotification();
    this.getAllNotif();
    this.getUnreadedNbrChat();
    this.getAllForSearch();
  }

  moveUp() {
    let myBar = document.getElementById("header")
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;

      if (prevScrollpos > currentScrollPos) {
        // @ts-ignore
        myBar.style.display = "block";
      } else {
        // @ts-ignore
        myBar.style.display = "none"
      }
      prevScrollpos = currentScrollPos;
    }
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

  hasRole(role: string): boolean {
    const userRoles = this.userAuthService.getRoles() as { roleName: string, roleDescription: string }[];
    const roleName = userRoles.length > 0 ? userRoles[0].roleName : '';
    console.log(roleName);
    return role === roleName;

  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); // Prevent event propagation to avoid immediate closing

    this.isDropdownOpen = !this.isDropdownOpen;

    if (this.isDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeDropdown);
      });
    } else {
      document.removeEventListener('click', this.closeDropdown);
      this.getUnreadNotification();
      this.resumeNotificationPolling();
    }
  }

  closeDropdown = () => {
    this.isDropdownOpen = false;
    document.removeEventListener('click', this.closeDropdown);
    //this.getUnreadNotification();
    this.resumeNotificationPolling();
  }
/************************************* START GET NOTIFICATION *************************************************/
  // Declare a subject to control pausing/resuming
private pauseSubject = new Subject<void>();

  getUnreadNotification() {
    interval(700)
      .pipe(
        switchMap(() => this.userService.getUnreadNotif()),
        takeUntil(this.pauseSubject) // Stop polling when pauseSubject emits a value
      )
      .subscribe(
        (response) => {
          this.unreadNotif = response;
          const notificationIds = this.allNotif.map(notification => notification.id);

          this.unreadNotif.forEach(item=>{
            if (!notificationIds.includes(item.id)){
              this.allNotif.unshift(item)
            }
          })
        },
        (error) => {
          console.log(error);
        }
      );
  }

// Method to pause the polling
  pauseNotificationPolling() {
    this.pauseSubject.next(); // Emit a value to pause the polling
  }

// Method to resume the polling
  resumeNotificationPolling() {
    this.getUnreadNotification(); // Restart the polling
  }
/************************************* END GET NOTIFICATION *******************************************/

  setLastNotifDate() {
    this.userService.setLastNotifDate().subscribe(
      (response)=>{
        console.log(response)
        this.pauseNotificationPolling();
      },error => {
        console.log(error)
      }
    )
  }

  getPostForComment(idContenu:number){
    this.pubService.getPubForComment(idContenu).subscribe(
      (response)=>{
        console.log(response)
      },error => {
        console.log(error)
      }
    )
  }

  getdetails(notifi: any) {
    let list:string[]=notifi.description.split(' ');
   if (list.includes('following')||list.includes('liked')){
     this.router.navigate(["/visitProfile",notifi.ownerProfileId])
   }else {
     this.getPostForComment(notifi.idContenue)
     this.router.navigate(["/homeartist",localStorage.getItem("ProfileId")])

     setTimeout(() => {
       const targetPostId = notifi.idContenue;
       const targetPostElement = document.getElementById(targetPostId);
       console.log(notifi.idContenue)
       if (targetPostElement) {
         targetPostElement.scrollIntoView({ behavior: "smooth" });
       }
       // Code to execute after waiting for a second
       // Add your desired code here
     }, 150); // 1000 milliseconds = 1 second

   }
  }

  getAllNotif(){
    this.userService.getAllNotifi().subscribe(
      (response)=>{
        // Sort the response array by date in ascending order
        const sortedResponse = response.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
        console.log(sortedResponse);
        this.allNotif=sortedResponse;

      },error => {
        console.log(error)
      }
    )
  }


  setLastMssgDate() {
    this.chatService.setlastChatsDate().subscribe(
      (response)=>{
        console.log(response)
      },error => {
        console.log(error)
      }
    )
  }

  getUnreadedNbrChat() {
    setInterval(() => {
      this.chatService.getUnreadedNbrChat().subscribe(
        (response) => {
          console.log(response);
          this.nbrUnreadedChat = response;
        },
        (error) => {
          console.log(error);
        }
      );
    }, 700); // 1000 milliseconds = 1 second
  }


  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }

  getDifferenceInMinutes(dateString: string): string {
    const dateObject = new Date(dateString);
    const currentDate = new Date();

    const differenceInMilliseconds = currentDate.getTime() - dateObject.getTime();
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    if (differenceInMinutes < 60) {
      return differenceInMinutes + ' mins ago'
    }else {
      const differenceInHours = Math.floor(differenceInMinutes / 60);
      const remainingMinutes = differenceInMinutes % 60;
        return differenceInHours+' hour ago and '+remainingMinutes+' mins ago';
    }
  }

  isCursorInside: boolean = false;

  handleFocus() {
    this.isCursorInside = true;
  }

  handleBlur() {
    this.isCursorInside = false;
  }


  /******************* search by name *********************************/
  searchText= '';

  items: any[] = [];

  getAllForSearch(){
    this.userService.getAllForSearch().subscribe(
      (response)=>{
        console.log(response)
        this.items=response
      },error => {
        console.log(error)
      }
    )
  }


  visitProfile(profileId:any) {
    console.log(profileId)
    console.log(this.currentUrl)
    if (this.currentUrl.includes("/visitProfile")){
      this.router.navigate(["/visitProfile",profileId]);
      setTimeout(() => {
        location.reload();
      }, 500);
    }
    else {
      this.router.navigate(["/visitProfile",profileId]);
    }
    this.isCursorInside=false
  }
}
