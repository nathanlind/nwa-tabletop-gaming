import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'tg-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  image: string = "https://via.placeholder.com/300x200";
  imageAltText: string = "Placeholder image for City Card";
  cities!: any;
  errorMessage!: string;

  showGroups(city: any): void {
    console.log(city.CityName);
    this.router.navigate(['groups']);
  }

  constructor(private cityService: CityService,
    private router: Router,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle("NWA Tabletop Gaming")
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
