import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  citiesUrl: string = 'http://localhost:8080/api/cities'

  constructor(private http: HttpClient) { }

  getCities(): Observable<City> {
    const results: Observable<City> = this.http.get<City>(this.citiesUrl);
    console.log(`getCities() returned ${results}`);
    return results
  }
}
