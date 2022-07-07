import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-results-item",
  templateUrl: "./results-item.component.html",
  styleUrls: ["./results-item.component.css"]
})
export class ResultsItemComponent implements OnInit {
  @Input() item_id;
  @Input() img_link;
  @Input() item_price;
  @Input() item_title;
  @Input() item_desc;
  @Input() item_category;
  @Input() item_sold;

  constructor(private router: Router) {}

  ngOnInit() {}

  redirect(link) {
    this.router.navigateByUrl(link);
  }
}
