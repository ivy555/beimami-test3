import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  pageTitles = [
    {
      route: '/dashboard/edit-profile',
      title: 'Edit Profile'
    },
    {
      route: '/dashboard/messages',
      title: 'Messages'
    },
    {
      route: '/dashboard/your-reviews',
      title: 'Your Reviews'
    },
    {
      route: '/dashboard/your-ratings',
      title: 'Your Ratings'
    },
    {
      route: '/dashboard/history',
      title: 'History'
    },
    {
      route: '/dashboard/items-sale',
      title: 'Items for Sale'
    },
    {
      route: '/dashboard/settings',
      title: 'Settings'
    },
    {
      route: '/dashboard/messages/conversation',
      title: 'Conversation'
    },
  ];

  pageTitle = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.pageTitle = this.pageTitles.find(o => this.router.url.startsWith(o.route)).title;
  }

  redirect(link) {
    this.router.navigateByUrl(link);
  }
}
