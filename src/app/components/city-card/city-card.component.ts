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
  cities!: any;
  errorMessage!: string;

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.cityService.getCities()
      .subscribe({
        next: (res:any) => {
          this.cities = res;
          console.log(this.cities)
        },
        error: (err) => {
          console.log(this.errorMessage = err.errorMessage)
        },
        complete: () => {
          console.log(`called getCities()`);
        }
      })
  }

}
