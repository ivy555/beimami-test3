import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-seller',
  templateUrl: './item-seller.component.html',
  styleUrls: ['./item-seller.component.css']
})
export class ItemSellerComponent implements OnInit {
  data = null;
  itemId: string;
  constructor(private router: Router, private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.itemId = params['itemId'];
      if (this.itemId) {
        this.itemService.getItemDetails(this.itemId)
          .subscribe(response => {
            if(response && response.length >0){
              this.data = response[0];
            }
          }, errorMessage => {
            console.log('Error Response: ');
            console.log(errorMessage);
          });
      } else {

      }
    });
  }

  redirectToChat() {
    const link = 'dashboard/messages/conversation?adId=' + this.itemId +'&'+'ownerId='+this.data.owner.id;
    this.router.navigateByUrl(link);
  }


}
