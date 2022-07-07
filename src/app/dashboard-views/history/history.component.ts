import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  data: any;
  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit() {
    this.itemService.getHistoryItems().subscribe(response => {
      
      this.data = response;
    }, errorMessage => {
      console.log('Error Response: ');
      console.log(errorMessage);
    });
  }
  navigateToDetails(event: any, item: any) {
    this.router.navigateByUrl('/item-view?itemId=' + item.id);
    console.log(item.id)
  }

}
