import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-slider-bar2',
  templateUrl: './slider-bar2.component.html',
  styleUrls: ['./slider-bar2.component.css']
})
export class SliderBar2Component implements OnInit {
  seconds=10000000000000;
  constructor() {}
  counterValue: number = 1;
  @ViewChild('radio1') radio1!: ElementRef<HTMLInputElement>;
  @ViewChild('radio2') radio2!: ElementRef<HTMLInputElement>;
  @ViewChild('radio3') radio3!: ElementRef<HTMLInputElement>;
  intervalId: Subscription | undefined;
  ngOnInit(): void {
    this.timer();
  }
  timer(){
    this.intervalId = interval(this.seconds).subscribe(() => {
      this.radio3.nativeElement.checked =this.counterValue===3;
      this.radio2.nativeElement.checked =this.counterValue===2;
      this.radio1.nativeElement.checked =this.counterValue===1;
      this.counterValue++;
      if (this.counterValue > 3) {
        this.counterValue = 1;
      }
    });
  }
  slideTo(i: number):void{
    this.counterValue=i;
    if (this.intervalId) {
      this.intervalId.unsubscribe();
    }
    this.timer();
  }
  nextSlide() {
    if(this.counterValue>3){
      this.counterValue=1;
    }
    else{
      this.counterValue++;
    }
    this.radio1.nativeElement.checked =this.counterValue===1;
    this.radio3.nativeElement.checked =this.counterValue===3;
    this.radio2.nativeElement.checked =this.counterValue===2;
    console.log("next"+this.counterValue)
    if (this.intervalId) {
      this.intervalId.unsubscribe();
    }
    this.timer();
  }
  prevSlide() {
    if(this.counterValue<1){
      this.counterValue=3;
    }
    else{
      this.counterValue--;
    }
    this.radio1.nativeElement.checked =this.counterValue===1;
    this.radio3.nativeElement.checked =this.counterValue===3;
    this.radio2.nativeElement.checked =this.counterValue===2;
    console.log("prev"+this.counterValue)
    if (this.intervalId) {
      this.intervalId.unsubscribe();
    }
    this.timer();
  }

}
