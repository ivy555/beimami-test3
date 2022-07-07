import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css']
})
export class WishlistItemComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect(link) {
    this.router.navigateByUrl(link);
  }

}

