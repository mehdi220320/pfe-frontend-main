import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.css']
})
export class SlideBarComponent implements OnInit {
  lastGroupId : string = '';
  lastGroupIdPrev : string = '';

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  navigateToNextGroup() {
    let currentGroupId = this.route.snapshot.fragment;

    if ((currentGroupId?.substring(0,currentGroupId?.length-2) == 'grp')&&(this.lastGroupId!='')){
      currentGroupId = this.lastGroupId;
    }
    if (currentGroupId == null||this.lastGroupId=='') {
      currentGroupId = 'group-1';
    }
    const str = currentGroupId.substring(0, currentGroupId.length - 1);
    let nextId = parseInt(currentGroupId.substr(currentGroupId.length - 1)) + 1;

    let nextGroupId = '';
    if (currentGroupId == 'group-3') {
      nextGroupId = 'group-1'; // the ID of the first group on the right side
    } else {
      nextGroupId = str + nextId;
    }

    const element = document.getElementById(nextGroupId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      this.router.navigate([], { fragment: nextGroupId });
    }
    this.lastGroupId = nextGroupId;
  }

  navigateToPreviousGroup() {

    let currentGroupId = this.route.snapshot.fragment; // Replace with the current group ID
    if (currentGroupId?.substring(0,currentGroupId?.length-2) == 'grp'&&this.lastGroupIdPrev!=''){
      currentGroupId = this.lastGroupIdPrev;
    }
    if (currentGroupId==null||this.lastGroupIdPrev==''){
      currentGroupId = 'group-1';
    }
    const str = currentGroupId.substring(0, currentGroupId.length - 1);
    let nextId = parseInt(currentGroupId.substr(currentGroupId.length - 1))-1;

    let previousGroupId = '';
    if (currentGroupId == 'group-1'){
      previousGroupId = 'group-3'; // Replace with the next group ID
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
