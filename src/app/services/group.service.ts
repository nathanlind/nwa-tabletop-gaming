import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupsUrl: string = 'http://localhost:8080/api/groups/'
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  }

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group> {
    const results: Observable<Group> = this.http.get<Group>(this.groupsUrl);
    console.log(`getGroups() returned ${results}`);
    return results;
  }

  addGroup(group: Group): void {
    console.log(group);
    const results: Observable<Group> = this.http.post<Group>(this.groupsUrl, group, this.jsonContentTypeHeaders);
    console.log(`addGroup() returned ${results}`);
  }
}
