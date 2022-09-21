import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tg-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css']
})
export class CityCardComponent implements OnInit {

  image: string = "https://via.placeholder.com/300x200";
  imageAltText: string = "Placeholder image for City Card";

  constructor() { }

  ngOnInit(): void {
  }

}
