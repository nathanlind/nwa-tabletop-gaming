import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "Northwest Arkansas Tabletop Gaming"
  router!: Router;

  constructor(private _router: Router) {
    this.router = _router;
  }

  ngOnInit(): void {
  }

}
