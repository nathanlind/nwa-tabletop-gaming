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

  getCurrentUser(): User {
    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser')!);
      this.currentUser = new BehaviorSubject(user);
      return user;
    } else {
      return this.user;
    }
  }

  updateCurrentUser(user: User): void {
    this.currentUser.next(user);
    this.storeUserLocal(user);
    console.log(this.currentUser);
  }

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

  checkUsernameAvailability(username: string): Observable<string> {
    const results: Observable<string> =
      this.http.get<string>(`${this.baseUrl}/username_available/${username}`);
      console.log(`checkUsernameAvailability(${username}) returned ${results}`);
      return results;
  }

  storeUserLocal(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  constructor(private http: HttpClient) { }
}
