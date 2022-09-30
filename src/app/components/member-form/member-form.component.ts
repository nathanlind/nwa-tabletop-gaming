import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { Group } from 'src/app/models/group.model';
import { Member } from 'src/app/models/member.model';
import { GroupService } from 'src/app/services/group.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'tg-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
  providers: [ConfirmationService]
})
export class MemberFormComponent implements OnInit {

  memberForm!: FormGroup;
  currentMember!: Member;
  currentGroup!: Group;
  newMember!: boolean;
  validationChecked!: boolean;
  submit!: boolean;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  createForm(member: Member): void {
    this.memberForm = this.fb.group({
      MemberId: [member.MemberId],
      MemberName: [member.MemberName, Validators.required],
      MemberPhone: [member.MemberPhone, Validators.required],
      MemberEmail: [member.MemberEmail, [Validators.required, Validators.pattern(this.emailPattern)]]
    })
  }

  onSubmit(formValues: any): void {
    console.log(formValues);
    if (this.memberForm.valid) {
      if (this.newMember) {
        this.addMember(formValues);
      } else if (!this.newMember) {
        this.editMember(formValues);
      }
    }
  }

  addMember(formValues: any): void {
    this.memberService.addMemberToGroup(formValues, this.currentGroup.GroupId).subscribe({
      next: (res:any) => {
        console.log(res);
        this.submit = true;
        this.memberService.updateCurrentMember(formValues);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("onSubmit() called");
        this.groupService.getGroupById(this.currentGroup.GroupId).subscribe({
          next: (group: Group) => {
            this.groupService.updateCurrentGroup(group);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.router.navigate(['members']);
          }
        })
      }
    });
  }

  editMember(formValues: any): void {
    this.memberService.editMemberInGroup(formValues, this.currentGroup.GroupId).subscribe({
      next: (res:any) => {
        console.log(res);
        this.submit = true;
        this.memberService.updateCurrentMember(formValues);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("onSubmit() called");
        this.groupService.getGroupById(this.currentGroup.GroupId).subscribe({
          next: (res:any) => {
            this.groupService.updateCurrentGroup(res);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.router.navigate(['members']);
          }
        })
      }
    });
  }

  showFormErrors() {
    this.memberForm.markAllAsTouched();
    this.validationChecked = true;
  }

  cancelForm(): void {
    this.router.navigate(['members']);
  }

  canDeactivate(): boolean {
    return !this.memberForm.touched || this.submit
  }


  constructor(private memberService: MemberService,
    private groupService: GroupService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NWATG | Members')
    this.currentMember = this.memberService.getCurrentMember();
    this.currentGroup = this.groupService.getCurrentGroup();
    console.log(this.router.url);
    if (this.router.url === '/members/register-member') {
      this.newMember = true;
      this.createForm(new Member());
    } else if (this.router.url === '/members/edit-member') {
      this.newMember = false;
      this.createForm(this.currentMember);
    }
  }

}
