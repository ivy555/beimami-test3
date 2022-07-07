import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
//import { google, GoogleMap } from '@agm/core/services/google-maps-types';
//import { MouseEvent } from '@agm/core';
import { } from 'googlemaps'
import { ViewChild } from '@angular/core';
import { KeywordTransportService } from '../services/keyword-transport.service';
import { bindCallback } from 'rxjs';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  lat:number = 50;
  lng:number = 7.8;

  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

  fetchedKeyWords:any;
  fetchedRestaurants: any;

  constructor(private data: KeywordTransportService) {

  }

  ngOnInit(): void {
    const mapProperties = {
         center: new google.maps.LatLng(35.2271, -80.8431),
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.fetchedKeyWords = []; //empty array
    this.data.currentKeywords.subscribe(d => this.fetchedKeyWords = d);
   // console.log("bigdata: " + this.fetchedKeyWords);
    this.setCurrentLocation();
  }

 InitializeMapByKeywords(lati:number, long:number) {
    var service = new google.maps.places.PlacesService(this.map);
    for (var i = 0; i <  this.fetchedKeyWords.length; i++) {
        if (this.fetchedKeyWords[i] != "") {
          var request = {
            location : {lat: lati, lng: long},
            radius : 10000,
            type :  'restaurant',
            keyword: this.fetchedKeyWords[i]
        };
        ((publicMap, word) => {
          service.nearbySearch(request, (results, status) => {
            this.callback(results, status, publicMap, word);
          }); })(this.map, this.fetchedKeyWords[i]);
      }
    }
    this.createMarkerForEveryLoc();
 }

 callback(results, status, publicMap, word) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
         // this.fetchedRestaurants.push(results[i]);
         //do everything here, since this is async...
         //console.log(results[i].name);
         
         this.CreateMarker(results,i, publicMap, word);
      }
  }
}

CreateMarker(results, i, publicMap, word) {
  //console.log(results[i]);
         
  var infowindow = new google.maps.InfoWindow({
     content: "<p> Restaurant: " + results[i].name + "</p>" 
     + "<p>Address: " + results[i].vicinity + "</p>"
     + "<p>Avg Rating: " + results[i].rating + " out of 5 ; " + results[i].user_ratings_total +  " ratings</p>"
 });


  var marker = new google.maps.Marker({
   position: results[i].geometry.location,
   label: word,
   map: publicMap,
   title: word
   }).addListener('click', function() {
     infowindow.open(publicMap, this);
   });
}

createMarkerForEveryLoc() {
  //for (var i = 0; i <  this.fetchedRestaurants.length; i++) {
    
 // }
}

 setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        var loc:any = new google.maps.LatLng(this.lat, this.lng)
        this.map.panTo(loc);
        var marker = new google.maps.Marker({
          position: loc,
          map: this.map,
          title: "That's you",
          label: "YOU"
        });
        this.InitializeMapByKeywords( this.lat,  this.lng);
      })
    }
  }
}
