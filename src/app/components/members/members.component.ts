import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';
import { MemberService } from 'src/app/services/member.service';

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Member } from 'src/app/models/member.module';

@Component({
  selector: 'tg-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  faCirclePlus = faCirclePlus;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  currentGroup!: Group;
  members!: any;

  editMember(member: Member, group: Group): void {

  }

  deleteMember(member: Member, group: Group): void {

  }

  constructor(private memberService: MemberService,
    private groupService: GroupService,
    private router: Router,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("NWATG | Members");
    this.groupService.currentGroup.subscribe(
      group => this.currentGroup = group
    )
    this.members = this.currentGroup.Members;
  }

}
