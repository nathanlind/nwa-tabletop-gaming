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
  selector: 'tg-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css'],
  providers: [ConfirmationService]
})
export class GroupFormComponent implements OnInit {

  groupForm!: FormGroup;
  currentGroup!: Group;
  newGroup!: boolean;
  validationChecked!: boolean
  submit!: boolean;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";


  cities = [
    'Springdale',
    'Fayetteville',
    'Bentonville',
    'Rogers'
  ]

  meetingDays = [
    'Mondays',
    'Tuesdays',
    'Wednesdays',
    'Thursdays',
    'Fridays',
    'Saturdays',
    'Sundays'
  ]

  onSubmit(formValues: any): void {
    console.log(formValues);
    if (this.groupForm.valid) {
      if (this.newGroup) {
        this.addGroup(formValues);
      } else if (!this.newGroup) {
        this.editGroup(formValues);
      }
    }
  }

  addGroup(formValues: any): void {
    this.groupService.addGroup(formValues).subscribe({
      next: (group: Group) => {
        console.log(group);
        this.submit = true;
        this.addOrganizerAsMember(formValues, group.GroupId);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("onSubmit() called");
      }
    });
  }

  editGroup(formValues: any) {
    this.groupService.editGroup(formValues).subscribe({
      next: (res:any) => {
        this.submit = true;
        console.log(res);
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
            this.router.navigate(['groups']);
          }
        })
      }
    });
  }

  addOrganizerAsMember(formValues: any, groupId: number): void {
    const member = new Member();
    member.MemberName = formValues.OrganizerName;
    member.MemberPhone = formValues.OrganizerPhone;
    member.MemberEmail = formValues.OrganizerEmail;
    this.memberService.addMemberToGroup(member, groupId).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log(`addMemberToGroup() called`);
        this.router.navigate(['groups']);
      }
    })
  }

  showFormErrors() {
    this.groupForm.markAllAsTouched();
    this.validationChecked = true;
  }

  createForm(group: Group) {
    this.groupForm = this.fb.group(
      {
          GroupId: [group.GroupId],
          CityName: [group.CityName, Validators.required],
          GroupName: [group.GroupName, Validators.required],
          OrganizerName: [group.OrganizerName, Validators.required],
          OrganizerPhone: [group.OrganizerPhone, Validators.required],
          OrganizerEmail: [group.OrganizerEmail, [Validators.required, Validators.pattern(this.emailPattern)]],
          PrimaryGame: [group.PrimaryGame, Validators.required],
          MeetingDay: [group.MeetingDay, Validators.required],
          MeetingTime:[group.MeetingTime, Validators.required],
          MaxGroupSize:[group.MaxGroupSize, Validators.required]
      }
    )
  }

  cancelForm(): void {
    this.router.navigate(['groups']);
  }

  canDeactivate(): boolean {
    return !this.groupForm.touched || this.submit
  }

  constructor(private groupService: GroupService,
    private memberService: MemberService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NWATG | Groups')
    this.currentGroup = this.groupService.getCurrentGroup();
    console.log(this.router.url);
    if (this.router.url === '/groups/register-group') {
      this.newGroup = true;
      this.createForm(new Group());
    } else if (this.router.url === '/groups/edit-group') {
      this.newGroup = false;
      this.createForm(this.currentGroup);
    }
    console.log(this.newGroup);
  }

}
