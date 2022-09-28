import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';
import { MemberService } from 'src/app/services/member.service';
import { OrderPipe } from 'ngx-order-pipe'
import { ConfirmationService, MessageService } from 'primeng/api';

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'tg-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class MembersComponent implements OnInit {

  faCirclePlus = faCirclePlus;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faEye = faEye;

  currentGroup!: Group;
  currentMember!: Member;
  members!: any;
  errorMessage!: string;
  searchText!: string;

  editMember(member: Member): void {
    this.memberService.updateCurrentMember(member);
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
          this.messageService.add({
            key: 'tc',
            severity: 'success',
            summary: 'Success',
            detail: 'Member deleted'
          })
        }
      })
  }

  confirmDelete(member: Member, group: Group) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this member?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteMember(member, group);
        },
        reject: () => {
        }
    });
}

atMaxCapacity(memberCount: string, maxMembers: string): boolean {
  return parseInt(memberCount) < parseInt(maxMembers) ? false : true;
}

  constructor(private memberService: MemberService,
    private groupService: GroupService,
    private router: Router,
    private titleService: Title,
    private orderPipe: OrderPipe,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) {
      this.currentGroup = this.groupService.getCurrentGroup();
      this.members = this.currentGroup.Members;
    }

  ngOnInit(): void {
    this.titleService.setTitle("NWATG | Members");
    this.groupService.currentGroup.subscribe({
      next: (group: Group) => {
        this.currentGroup = group;
        this.members = group.Members;
        this.currentMember = this.memberService.getCurrentMember();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {

      }
    })
  }
}
