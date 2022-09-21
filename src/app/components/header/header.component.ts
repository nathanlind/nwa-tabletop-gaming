import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "Northwest Arkansas Tabletop Gaming Groups"
  loggedIn: boolean = false;

  logInBtnText: string = "LOG IN"
  logInBtnClick(): void {
    if (this.loggedIn) {
      this.logInBtnText = "LOG OUT"
      this.loggedIn = true;
    } else {
      this.logInBtnText = "LOG IN"
      this.loggedIn = false;
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
