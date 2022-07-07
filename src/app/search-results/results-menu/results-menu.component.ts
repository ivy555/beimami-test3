import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-menu',
  templateUrl: './results-menu.component.html',
  styleUrls: ['./results-menu.component.css']
})
export class ResultsMenuComponent implements OnInit {
  categories: any;
  
  constructor(
    protected router: Router,
    protected searchService: SearchService,) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.searchService.getCategories().subscribe((response)=>{
      this.categories = response;
    });
  }
  getItems(id){
    this.router.navigateByUrl('/search-results?category=' + id);
  }
}
