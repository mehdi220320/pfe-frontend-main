import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-slide-bar3',
  templateUrl: './slide-bar3.component.html',
  styleUrls: ['./slide-bar3.component.css']
})
export class SlideBar3Component implements OnInit {
  lastGroupId : string = '';
  lastGroupIdPrev : string = '';

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigateToNextGroup() {
    let currentGroupId = this.route.snapshot.fragment;
    if (currentGroupId?.substring(0,currentGroupId?.length-2) == 'group'&&this.lastGroupId!=''){
      currentGroupId = this.lastGroupId;
    }
    if (currentGroupId == null||this.lastGroupId=='') {
      currentGroupId = 'grp-1';
    }
    const str = currentGroupId.substring(0, currentGroupId.length - 1);
    let nextId = parseInt(currentGroupId.substr(currentGroupId.length - 1)) + 1;

    let nextGroupId = '';
    if (currentGroupId == 'grp-3') {
      nextGroupId = 'grp-1'; // the ID of the first group on the right side
    } else {
      nextGroupId = str + nextId;
    }

    const element = document.getElementById(nextGroupId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      this.router.navigate([], { fragment: nextGroupId });
    }
    this.lastGroupId = nextGroupId
  }

  navigateToPreviousGroup() {

    let currentGroupId = this.route.snapshot.fragment; // Replace with the current group ID
    if (currentGroupId?.substring(0,currentGroupId?.length-2) == 'group'&&this.lastGroupIdPrev!=''){
      currentGroupId = this.lastGroupIdPrev;
    }
    if (currentGroupId==null||this.lastGroupIdPrev==''){
      currentGroupId = 'grp-1';
    }
    const str = currentGroupId.substring(0, currentGroupId.length - 1);
    let nextId = parseInt(currentGroupId.substr(currentGroupId.length - 1))-1;

    let previousGroupId = '';
    if (currentGroupId == 'grp-1'){
      previousGroupId = 'grp-3'; // Replace with the next group ID
    }else
      previousGroupId = str + nextId;

    const element = document.getElementById(previousGroupId);
    if (element) {
      element.scrollIntoView({behavior: 'smooth',block:"nearest"});
      this.router.navigate([], { fragment: previousGroupId });
    }
    this.lastGroupIdPrev = previousGroupId;
  }

}
