import { Component, OnInit } from "@angular/core";
import { isFormattedError } from "@angular/compiler";
import { Router } from "@angular/router";

@Component({
  selector: "app-about-main",
  templateUrl: "./about-main.component.html",
  styleUrls: ["./about-main.component.css"]
})
export class AboutMainComponent implements OnInit {
  team_members: Array<Object> = [
    {
      name: "Team Member",
      role: "Team Lead / Developer",
      desc:
        "I am from Pakistan. Experienced with .Net, Node.js, angular and database systems.",
      img_url: "../assets/imgs/about_imgs/uf-img.jpg",
      about_url: "about/umer"
    },
    {
      name: "Team Member",
      role: "Front End Developer",
      desc:
        "I am from Albania. Experienced in Front End Development. Curious about UI / UX.",
      img_url: "../assets/imgs/about_imgs/bv-img.jpg",
      about_url: "about/blin"
    },
    {
      name: "Team Member",
      role: "Backend Developer",
      desc:
        "I am from USA. Experienced in programming languages and databases.",
      img_url: "../assets/imgs/about_imgs/ma-img.jpg",
      about_url: "about/adnan"
    },
    {
      name: "Team Member",
      role: "Software Developer",
      desc:
        "I am from A. Experienced with Python (django framework) and JavaScript (Angular and React frameworks).",
      img_url: "../assets/imgs/about_imgs/dks-img.jpg",
      about_url: "about/dilip"
    },
    {
      name: "Team Member",
      role: "DB / Backend Developer",
      desc:
        "I am from Ghana. Experienced with JAVA programming language and database systems.",
      img_url: "../assets/imgs/about_imgs/ja-img.jpg",
      about_url: "about/john"
    },
    {
      name: "Team Member",
      role: "Software Engineer",
      desc:
        "Professional Software Engineer from Pakistan with more than 3 years of practical experience",
      img_url: "../assets/imgs/about_imgs/at-img.jpg",
      about_url: "about/aleem"
    }
  ];
  aboutClick(member) {
    console.log(member);
    //window.location.href = member.about_url;
    this.router.navigateByUrl(member.about_url);
  }
  constructor(private router: Router) {}

  ngOnInit() {}
}
