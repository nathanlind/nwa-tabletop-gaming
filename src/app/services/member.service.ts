import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Member } from '../models/member.model';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl: string = 'http://localhost:8080/api/groups';
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  }
  member!: Member;

  currentMemeber: BehaviorSubject<Member> = new BehaviorSubject(this.member);

  addMemberToGroup(member: Member, groupId: number): Observable<Member> {
    const results: Observable<Member> =
      this.http.post<Member>(
        `${this.baseUrl}/${groupId}/members`,
        member,
        this.jsonContentTypeHeaders);
    console.log(`addMemberToGroup() returned ${results}`);
    return results;
  }

  editMemberInGroup(member: Member, groupId: number): Observable<Member> {
    const results: Observable<Member> =
      this.http.put<Member>(
        `${this.baseUrl}/${groupId}/members`,
        member,
        this.jsonContentTypeHeaders);
      console.log(`editMemberInGroup() returned ${results}`);
      return results;
  }

  deleteMemberFromGroup(memberId: number, groupId: number): Observable<Member> {
    const results: Observable<Member> =
      this.http.delete<Member>(`${this.baseUrl}/${groupId}/members/${memberId}`);
      console.log(`deleteMemberFromGroup() returned ${results}`);
      return results;
  }

  constructor(private http: HttpClient) { }
}
