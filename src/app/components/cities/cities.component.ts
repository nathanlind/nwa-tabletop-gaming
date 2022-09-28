import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Group } from 'src/app/models/group.model';
import { CityService } from 'src/app/services/city.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'tg-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  image!: string;
  cities!: any;
  errorMessage!: string;

  showGroups(city: any): void {
    console.log(city.CityName);
    this.cityService.updateCurrentCity(city);
    this.groupService.updateCurrentGroup(new Group);
    this.router.navigate(['groups']);
  }


  constructor(private cityService: CityService,
    private router: Router,
    private titleService: Title,
    private groupService: GroupService
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
