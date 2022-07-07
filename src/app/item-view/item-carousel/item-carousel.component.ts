import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute } from '@angular/router';
import { API_Globals } from 'src/global';

@Component({
  selector: 'app-item-carousel',
  templateUrl: './item-carousel.component.html',
  styleUrls: ['./item-carousel.component.css']
})
export class ItemCarouselComponent implements OnInit {
  itemId: string;
  data = null;
  constructor(config: NgbCarouselConfig, private route: ActivatedRoute,
    private itemService: ItemService) {
    config.interval = 0;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.itemId = params['itemId'];
      if (this.itemId) {
        this.itemService.getItemDetails(this.itemId)
          .subscribe(response => {
            if (response && response.length > 0) {
              
              if(response[0].pictures && response[0].pictures.length > 0){
                response[0].pictures.forEach(o => {
                  o.location = API_Globals.server_url+o.location;
                  
                });
              }
              this.data = response[0].pictures;
              console.log('pictures data')
              console.log(this.data);
              
            }
          }, errorMessage => {
            console.log('Error Response: ');
            console.log(errorMessage);
          });
      } else {

      }
    });
  }

}
