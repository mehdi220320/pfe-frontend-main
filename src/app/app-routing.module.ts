import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {LoginComponent} from "./login/login.component";
import {SimpleUserComponent} from "./simple-user/simple-user.component";
import {ArtistComponent} from "./artist-home/artist.component";
import {AuthGuard} from "./auth/auth.guard";
import {SignupComponent} from "./signup/signup.component";
import {VerifyCodeComponent} from "./verify-code/verify-code.component";
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {AproposComponent} from "./apropos/apropos.component";
import {SignupArtistComponent} from "./signup-artist/signup-artist.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {DiscoverProfileComponent} from "./discover-profile/discover-profile.component";
import {FollowingComponent} from "./simple-user/following/following.component";
import {MessagesComponent} from "./messages/messages.component";
import {PayementComponent} from "./payement/payement.component";
import {GaleryComponent} from "./artist-home/galery/galery.component";

const routes: Routes = [
  {path: 'profileuser/:id', component: SimpleUserComponent,canActivate:[AuthGuard],data:{roles:['User']}},
  {path: 'homeartist/:id', component: ArtistComponent,canActivate:[AuthGuard],data:{roles:['Artiste']}},
  {path: 'accueil', component: AccueilComponent,canActivate:[AuthGuard],data:{roles:['Artiste','User']}},
  {path: 'visitProfile/:id', component:DiscoverProfileComponent,canActivate:[AuthGuard],data:{roles:['User','Artiste']}},
  {path: 'messages', component:MessagesComponent,canActivate:[AuthGuard],data:{roles:['User','Artiste']}},
  {path: 'successPayement', component: PayementComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'signupartist', component: SignupArtistComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'verify', component: VerifyCodeComponent/*, canActivate: [AuthGuardVerify], data: { submitted: false }*/},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home',pathMatch:"full"},
  {path: 'contact', component: ContactComponent},
  {path: 'apropos', component: AproposComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
