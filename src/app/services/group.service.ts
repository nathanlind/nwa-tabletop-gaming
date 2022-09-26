import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  baseUrl: string = 'http://localhost:8080/api/groups';
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  }
  group!: Group;

  currentGroup: BehaviorSubject<Group> = new BehaviorSubject(this.group);

  getGroups(): Observable<Group> {
    const results: Observable<Group> = this.http.get<Group>(this.baseUrl);
    console.log(`getGroups() returned ${results}`);
    return results;
  }

  getGroupById(groupId: number): Observable<Group> {
    const results: Observable<Group> = this.http.get<Group>(`${this.baseUrl}/${groupId}`);
    console.log(`getGroupsById() returned ${results}`);
    return results;
  }

  addGroup(group: Group): Observable<Group> {
    const results: Observable<Group> = this.http.post<Group>(this.baseUrl, group, this.jsonContentTypeHeaders);
    console.log(`addGroup() returned ${results}`);
    return results;
  }

  editGroup(group: Group): Observable<Group> {
    const results: Observable<Group> = this.http.put<Group>(this.baseUrl, group, this.jsonContentTypeHeaders);
    console.log(`editGroup() returned ${results}`);
    return results;
  }

  deleteGroupById(groupId: number): Observable<Group> {
    const results: Observable<Group> = this.http.delete<Group>(`${this.baseUrl}/${groupId}`)
    console.log(`deleteGoalById(${groupId}) returned ${results}`);
    return results;
  }

  constructor(private http: HttpClient) { }
}
