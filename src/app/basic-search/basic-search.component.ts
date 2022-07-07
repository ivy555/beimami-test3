import { Component, OnInit } from '@angular/core';
import { SearchParams } from '../models/SearchParams';
import { BasicSearchService } from './basic-search.service';
import { ProductsSearchModel } from '../models/ProductsSearchModel';
// import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.css'],
  providers: [BasicSearchService]
})
export class BasicSearchComponent implements OnInit {
  
  model = new SearchParams('');
  products: [ProductsSearchModel];
  submitted = false;
  show_loader = false;
  onSubmit() { 
    console.log(this.model.query); 
    this.show_loader = true;
    this.submitted = true; 
    this.basichSearchService.search(this.model)
    .subscribe((products) => {
      this.products = products[0];
      this.show_loader = false;
    });
  }
  
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.products); }
  
  constructor(private basichSearchService: BasicSearchService) { }
  
  ngOnInit() {
  }
  
}
