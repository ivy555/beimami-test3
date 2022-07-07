import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css']
})
export class HomeItemComponent implements OnInit {
  @Input() item_id;
  @Input() img_link = "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80";
  @Input() item_price;
  @Input() item_title;
 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
   }

  ngOnInit() { }

  redirect(link) {
    this.router.navigateByUrl(link);
  }

}
