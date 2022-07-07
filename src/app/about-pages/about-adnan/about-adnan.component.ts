import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-adnan',
  templateUrl: './about-adnan.component.html',
  styleUrls: ['./about-adnan.component.css']
})
export class AboutAdnanComponent implements OnInit {
  message = "hello world testing my component";
  constructor() { }

  ngOnInit() {
  }

}