import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupsUrl: string = 'http://localhost:3006/groups'

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group> {
    const results: Observable<Group> = this.http.get<Group>(this.groupsUrl);
    console.log(`getGroups() returned ${results}`);
    return results;
  }
}
