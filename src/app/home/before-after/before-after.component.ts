import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-before-after',
  templateUrl: './before-after.component.html',
  styleUrls: ['./before-after.component.css']
})
export class BeforeAfterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const gazelDescription: HTMLElement | null = document.getElementById("gazelDescription");
    const text: string = "This work of art consists of a representation of a gazelle, sculpted from recycled pieces of wood, which have been carefully shaped and assembled to create a unique piece.";
    let i: number = 0;

    function typeWriter(): void {
      if (gazelDescription && i < text.length) {
        gazelDescription.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    }

    const options = {
      threshold: 0.5 // trigger when element is 50% visible
    }

    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        typeWriter();
        observer.unobserve(entries[0].target);
      }
    }, options);

    if (gazelDescription) {
      observer.observe(gazelDescription);
    }
    /************************************************************************************************/
    const tortueDescription: HTMLElement | null = document.getElementById("tortueDescription");
    const text1: string = "This unique turtle is the result of the artist's creativity and desire to give a second life to materials that would otherwise have been thrown away. Using plastic bottle caps, the artist created an interesting texture and visual effect for the turtle.";
    let j: number = 0;

    function typeWriter1(): void {
      if (tortueDescription && j < text1.length) {
        tortueDescription.innerHTML += text1.charAt(j);
        j++;
        setTimeout(typeWriter1, 30);
      }
    }

    const options1 = {
      threshold: 0.5 // trigger when element is 50% visible
    }

    const observer1 = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        typeWriter1();
        observer.unobserve(entries[0].target);
      }
    }, options1);

    if (tortueDescription) {
      observer1.observe(tortueDescription);
    }
  }

}
