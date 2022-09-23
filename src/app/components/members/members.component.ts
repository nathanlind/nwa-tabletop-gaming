import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';
import { MemberService } from 'src/app/services/member.service';

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Member } from 'src/app/models/member.model';

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
  currentMember!: Member;
  members!: any;
  errorMessage!: string;

  editMember(member: Member, group: Group): void {
    this.memberService.currentMemeber.next(member);
    this.router.navigate(['members/edit-member']);
  }

  deleteMember(member: Member, group: Group): void {
    this.memberService.deleteMemberFromGroup(member.MemberId, group.GroupId)
      .subscribe({
        error: (err) => {
          console.log(this.errorMessage = err.errorMessage);
        },
        complete: () => {
          console.log(`deleteMemberFromGroup(${member.MemberId, group.GroupId} called)`)
          const index = this.members.findIndex((object: Member) => {
            return object.MemberId === member.MemberId;
          })
          this.members.splice(index, 1);
        }
      })
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
