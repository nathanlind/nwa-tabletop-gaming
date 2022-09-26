import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:8080/api'
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  }
  user!: User;

  currentUser: BehaviorSubject<User> = new BehaviorSubject(this.user);

  registerUser(user: User): Observable<User> {
    const results: Observable<User> =
      this.http.post<User>(
        `${this.baseUrl}/users`,
        user,
        this.jsonContentTypeHeaders
      )
    console.log(`registerUser() returned ${results}`);
    return results;
  }

  login(user: User): Observable<User> {
    const results: Observable<User> =
      this.http.post<User>(
        `${this.baseUrl}/login`,
        user,
        this.jsonContentTypeHeaders
      )
    console.log(`login() returned ${results}`);
    return results;

  }

  constructor(private http: HttpClient) { }
}
