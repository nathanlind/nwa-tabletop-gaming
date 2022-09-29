import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  currentMember: BehaviorSubject<Member> = new BehaviorSubject(this.member);

  getCurrentMember(): Member {
    if (localStorage.getItem('currentMember')){
      const member = JSON.parse(localStorage.getItem('currentMember')!);
      this.currentMember = new BehaviorSubject(member);
      return member;
    } else {
      return this.member;
    }
  }

  updateCurrentMember(member: Member): void {
    this.currentMember.next(member);
    this.storeMemberLocal(member);
  }

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

  storeMemberLocal(member: Member): void {
    localStorage.setItem('currentMember', JSON.stringify(member));
  }

  constructor(private http: HttpClient) { }
}
