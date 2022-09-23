import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Member } from '../models/member.module';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  url: string = 'http://localhost:8080/api/group';
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  }
  member!: Member;

  currentMemeber: BehaviorSubject<Member> = new BehaviorSubject(this.member);

  constructor(private http: HttpClient) { }
}
