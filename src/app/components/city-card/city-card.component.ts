import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'tg-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.css']
})
export class CityCardComponent implements OnInit {

  image: string = "https://via.placeholder.com/300x200";
  imageAltText: string = "Placeholder image for City Card";

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
  }

}
