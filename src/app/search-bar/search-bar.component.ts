import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput',{static:false})
  searchInput: ElementRef;
  categories: any;
  query: string = '';
  catId: string = '0';
  
  timeout;
  
  constructor(
    protected router: Router,
    protected searchService: SearchService,
    private activatedRoute: ActivatedRoute,) { }

    
    ngOnInit() {
      this.getCategories();
      this.activatedRoute.queryParams.subscribe(params => {
        let query = params['q'];
        let catId = params['category'];
        if(!!query){
          this.query = query;
        }
        if(!!catId){
          this.catId = catId;
        }
      });
    }
    getCategories(){
      this.searchService.getCategories().subscribe((response)=>{
        this.categories = response;
      });
    }
    ngAfterViewInit(){
      (this.searchInput.nativeElement as HTMLInputElement).focus();
    }
    search() {
      if(this.timeout)
        clearTimeout(this.timeout);
      this.timeout = setTimeout(()=>{
        this.router.navigateByUrl('/search-results?category=' + this.catId + '&q=' + this.query);
      }, 300);
    }
  }
  