import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  citiesUrl: string = 'http://localhost:8080/api/cities'

  city!: City;

  currentCity: BehaviorSubject<City> = new BehaviorSubject(this.city);

  getCurrentCity(): City {
    if (localStorage.getItem('currentCity')) {
      const city = JSON.parse(localStorage.getItem('currentCity')!);
      this.currentCity = new BehaviorSubject(city);
      return city;
    } else {
      return this.city;
    }
  }

  updateCurrentCity(city: City): void {
    this.currentCity.next(city);
    this.storeCityLocal(city);
  }

  getCities(): Observable<City> {
    const results: Observable<City> = this.http.get<City>(this.citiesUrl);
    console.log(`getCities() returned ${results}`);
    return results
  }

  storeCityLocal(city: City): void {
    localStorage.setItem('currentCity', JSON.stringify(city));
  }

  constructor(private http: HttpClient) { }
}
