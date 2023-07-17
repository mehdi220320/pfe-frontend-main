import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css'],
})
export class CountDownComponent implements OnInit {

  @Input() reDate!: Date;

  countdown!: string;
  countDownDate!: number;
  secondsToDday!: number;
  minutesToDday!: number;

  ngOnInit() {
    const storedCountDownDate = localStorage.getItem('countDownDate');
    const date=new Date();

    if (storedCountDownDate) {
      this.countDownDate = parseInt(storedCountDownDate);

    } else {
      date.setMinutes(date.getMinutes()+3);
      this.countDownDate = date.getTime();
      localStorage.setItem('countDownDate', this.countDownDate.toString());
    }


    const intervalId = setInterval(() => {
      if (this.reDate){
        this.countDownDate = this.reDate.getTime()+(3*60*1000);
        localStorage.setItem('countDownDate', this.countDownDate.toString());
      }
      const now = new Date().getTime();
      const distance = this.countDownDate - now;
      this.countdown = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) + "m "
        + Math.floor((distance % (1000 * 60)) / 1000) + "s ";
      this.secondsToDday = Math.floor((distance % (1000 * 60)) / 1000);
      this.minutesToDday = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      if (this.secondsToDday <= 0 && this.minutesToDday <= 0) {
        //clearInterval(intervalId);
        this.minutesToDday=0;
        this.secondsToDday=0;
        localStorage.removeItem('countDownDate');
      }

    }, 1000);




  }
}
