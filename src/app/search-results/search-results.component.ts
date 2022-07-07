import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  url: string;
  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    public appComp: AppComponent
    // private appComp: AppComponent
    ) { 
      this.url = 'ads?filter[include][0][relation]=category&filter[where][approved]=true';
    }
    ads: any;
    ngOnInit() {
      this.activatedRoute.queryParams.pipe(debounceTime(300)).subscribe(params => {
        let query = params['q'];
        let catId = parseInt(params['category'], 10);
        if(catId !== undefined){
          if(catId > 0){
            //get ads based on category
            this.url = 'ads?filter[include][0][relation]=category&filter[where][approved]=true&filter[where][categoryId]=' + catId;
          }
          else{
            //get all ads
            this.url = 'ads?filter[include][0][relation]=category&filter[where][approved]=true';
          }
        }
        if(!!query){
          if(catId !== undefined){
            if(catId > 0){
              //get ads based on category and query
              this.url = 'ads?filter=' + 
              encodeURI(JSON.stringify({
                include:[
                  {
                    relation: "category"
                  }
                ],
                where: {
                  and:[
                    {
                      approved:true,
                    },
                    {
                      categoryId:catId,
                    },
                    {
                      or:[
                        {
                          item_name:{
                            like:`%${query}%`
                          }
                        },
                        {
                          item_description:{
                            like:`%${query}%`
                          }
                        }
                      ]
                    }
                  ]
                }
              }));
            }
            else{
              //get all ads based on query
              this.url = 'ads?filter=' + 
              encodeURI(JSON.stringify({
                include:[
                  {
                    relation: "category"
                  }
                ],
                where: {
                  and:[
                    {
                      approved:true,
                    },
                    {
                      or:[
                        {
                          item_name:{
                            like:`%${query}%`
                          }
                        },
                        {
                          item_description:{
                            like:`%${query}%`
                          }
                        }
                      ]
                    }
                  ]
                }
              }));
            }
          }
        }
        this.getAds();
      });
    }
    getAds(){
      this.searchService.getAds(this.url).subscribe((response)=>{
        this.ads = response;
      });
    }
    
  }  