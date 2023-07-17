import {Component, Input, OnInit} from '@angular/core';
import {Image} from "../../../models/image";

@Component({
  selector: 'app-display-imgs',
  templateUrl: './display-imgs.component.html',
  styleUrls: ['./display-imgs.component.css']
})

export class DisplayImgsComponent implements OnInit {
  @Input('urls') images : Image[] = [];
  currentIndex: number = 0;
  isImageModalOpen = false;


  constructor() { }

  ngOnInit(): void {
  }
  get currentImage(): any {
    return this.images[this.currentIndex];
  }

  previousImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  openImageModal(): void {
    this.isImageModalOpen = true;
  }

  closeImageModal(): void {
    this.isImageModalOpen = false;
  }


}
