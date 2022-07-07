import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  itemId: string;
  constructor(private route: ActivatedRoute, private itemService: ItemService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.itemId = params['itemId'];
      if (this.itemId) {
        this.itemService.getItemDetails(this.itemId)
        .subscribe(response => {
          console.log('Success Response: ');
          console.log(response);
        }, errorMessage => {
          console.log('Error Response: ');
          console.log(errorMessage);
        });
      } else {

      }
    });
  }

}
