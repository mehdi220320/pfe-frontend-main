import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SimpleUserComponent } from './simple-user/simple-user.component';
import { ArtistComponent } from './artist-home/artist.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupArtistComponent } from './signup-artist/signup-artist.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import {MatIconModule} from "@angular/material/icon";
import { CountDownComponent } from './verify-code/count-down/count-down.component';
import { HomeComponent } from './home/home.component';
import { HeadComponent } from './head/head.component';
import { ContactComponent } from './contact/contact.component';
import {Router, RouterModule} from "@angular/router";
import { CarouselComponent } from './home/carousel/carousel.component';
import { BeforeAfterComponent } from './home/before-after/before-after.component';
import { SlideBarComponent } from './home/slide-bar/slide-bar.component';
import {SliderBar2Component} from "./home/slider-bar2/slider-bar2.component";
import { SlideBar3Component } from './home/slide-bar3/slide-bar3.component';
import { AproposComponent } from './apropos/apropos.component';
import { HeadHumbergerComponent } from './head-humberger/head-humberger.component';
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import { ArtistPostComponent } from './artist-home/artist-post/artist-post.component';
import { DisplayImgsComponent } from './artist-home/artist-post/display-imgs/display-imgs.component';
import { InteractSectionComponent } from './artist-home/artist-post/interact-section/interact-section.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DiscoverProfileComponent } from './discover-profile/discover-profile.component';
import { FollowingComponent } from './simple-user/following/following.component';
import { AccueilPostComponent } from './accueil/accueil-post/accueil-post.component';
import {FollowersComponent} from "./simple-user/followers/followers.component";
import {FollowingArtistComponent} from "./artist-home/following-artist/following-artist.component";
import { FollowerArtistComponent } from './artist-home/follower-artist/follower-artist.component';
import {CustomDatePipe, MessagesComponent} from './messages/messages.component';
import {EmojiModule} from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { PayementComponent } from './payement/payement.component';
import { GaleryComponent } from './artist-home/galery/galery.component';
import {SortByNamePipe} from "./head/sortByNamePipe";


@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent,
    LoginComponent,
    SimpleUserComponent,
    ArtistComponent,
    SignupArtistComponent,
    SignupComponent,
    VerifyCodeComponent,
    CountDownComponent,
    HomeComponent,
    HeadComponent,
    ContactComponent,
    CarouselComponent,
    BeforeAfterComponent,
    SlideBarComponent,
    SliderBar2Component,
    SlideBar3Component,
    AproposComponent,
    HeadHumbergerComponent,
    ArtistPostComponent,
    DisplayImgsComponent,
    InteractSectionComponent,
    AccueilComponent,
    DiscoverProfileComponent,
    FollowingComponent,
    AccueilPostComponent,
    FollowingArtistComponent,
    FollowersComponent,
    FollowerArtistComponent,
    MessagesComponent,
    CustomDatePipe,
    PayementComponent,
    GaleryComponent,
    SortByNamePipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        RouterModule,
        ReactiveFormsModule,
        PickerModule,
        EmojiModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
