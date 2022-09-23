import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { Member } from 'src/app/models/member.model';
import { GroupService } from 'src/app/services/group.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'tg-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  memberForm!: FormGroup;
  submit!: boolean;
  currentMember!: Member;
  currentGroup!: Group;
  newMember!: boolean;

  createRegisterForm() {
    this.memberForm = this.fb.group({
      MemberId: [''],
      MemberName: ['', Validators.required],
      MemberPhone: ['', Validators.required],
      MemberEmail: ['', Validators.required]
    })
  }

  createEditForm(member: Member) {
    this.memberForm = this.fb.group({
      MemberId: [member.MemberId],
      MemberName: [member.MemberName, Validators.required],
      MemberPhone: [member.MemberPhone, Validators.required],
      MemberEmail: [member.MemberEmail, Validators.required]
    })
  }

  onSubmit(formValues: any): void {
    console.log(formValues);
    if (this.memberForm.valid) {
      this.submit = true;
      if (this.newMember) {
        this.memberService.addMemberToGroup(formValues, this.currentGroup.GroupId).subscribe({
          next: (res:any) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log("onSubmit() called");
            this.groupService.getGroupById(this.currentGroup.GroupId).subscribe({
              next: (res:any) => {
                this.groupService.currentGroup.next(res);
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
      } else if (!this.newMember) {
        this.memberService.editMemberInGroup(formValues, this.currentGroup.GroupId).subscribe({
          next: (res:any) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log("onSubmit() called");
            this.groupService.getGroupById(this.currentGroup.GroupId).subscribe({
              next: (res:any) => {
                this.groupService.currentGroup.next(res);
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
    }
  }

  constructor(private memberService: MemberService,
    private groupService: GroupService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.memberService.currentMemeber.subscribe(
      member => this.currentMember = member
    )
    this.groupService.currentGroup.subscribe(
      group => this.currentGroup = group
    )
    console.log(this.router.url);
    if (this.router.url === '/members/register-member') {
      this.newMember = true;
      this.createRegisterForm();
    } else if (this.router.url === '/members/edit-member') {
      this.newMember = false;
      this.createEditForm(this.currentMember);
    }
  }

}
