import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head-humberger',
  templateUrl: './head-humberger.component.html',
  styleUrls: ['./head-humberger.component.css']
})
export class HeadHumbergerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const menuToggle = document.getElementById('menu') as HTMLInputElement;

    window.addEventListener('scroll', () => {
      // Check if the menu is currently open
      if (menuToggle.checked) {
        // Close the menu by unchecking the checkbox
        menuToggle.checked = false;
      }
    });

  }

}
