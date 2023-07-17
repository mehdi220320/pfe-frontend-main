import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import AOS from "aos";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clientsAnimated = false;
  artistsAnimated = false;
  countriesAnimated = false;



  constructor() {}

  ngOnInit(): void {
    console.log(window.innerWidth)
    AOS.init();



    window.addEventListener("scroll", () => {
      this.animateWhenVisible("clients", 0, 1000, 2000);
      this.animateWhenVisible("artists", 0, 500, 1500);
      this.animateWhenVisible("countries", 0, 1, 1000);
    });
  }



  animateValue(id: string, start: number, end: number, duration: number) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    let timer = setInterval(function() {
      current += increment;
      // @ts-ignore
      obj.innerHTML = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  animateWhenVisible(id: string, start: number, end: number, duration: number) {
    if (id === "clients" && this.clientsAnimated) {
      return;
    } else if (id === "artists" && this.artistsAnimated) {
      return;
    } else if (id === "countries" && this.countriesAnimated) {
      return;
    }

    let element = document.getElementById(id);
    // @ts-ignore
    let elementPosition = element.getBoundingClientRect().top;
    let screenHeight = window.innerHeight;
    if (elementPosition < screenHeight && elementPosition > 0) {
      this.animateValue(id, start, end, duration);
      if (id === "clients") {
        this.clientsAnimated = true;
      } else if (id === "artists") {
        this.artistsAnimated = true;
      } else if (id === "countries") {
        this.countriesAnimated = true;
      }
    }
  }


  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
