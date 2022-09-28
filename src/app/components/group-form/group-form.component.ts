import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'tg-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css'],
  providers: [ConfirmationService]
})
export class GroupFormComponent implements OnInit {

  groupForm!: FormGroup;
  submit!: boolean;
  currentGroup!: Group;
  newGroup!: boolean;
  validationChecked!: boolean

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
      this.submit = true;
      if (this.newGroup) {
        this.addGroup(formValues);
      } else if (!this.newGroup) {
        this.editGroup(formValues);
      }
    }
  }

  addGroup(formValues: any): void {
    this.groupService.addGroup(formValues).subscribe({
      next: (res:any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("onSubmit() called");
        this.router.navigate(['groups']);
      }
    });
  }

  editGroup(formValues: any) {
    this.groupService.editGroup(formValues).subscribe({
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

  showFormErrors() {
    this.groupForm.markAllAsTouched();
    this.validationChecked = true;
  }

  cancelForm() {
    this.confirmationService.confirm({
      message: 'Form has not been submitted. Do you wish to cancel?',
      header: 'Confirm Cancel',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.router.navigate(['groups']);
      },
      reject: () => {
      }
    })
  }

  createForm(group: Group) {
    this.groupForm = this.fb.group(
      {
          GroupId: [group.GroupId],
          CityName: [group.CityName, Validators.required],
          GroupName: [group.GroupName, Validators.required],
          OrganizerName: [group.OrganizerName, Validators.required],
          OrganizerPhone: [group.OrganizerPhone, Validators.required],
          OrganizerEmail: [group.OrganizerEmail, Validators.required],
          PrimaryGame: [group.PrimaryGame, Validators.required],
          MeetingDay: [group.MeetingDay, Validators.required],
          MeetingTime:[group.MeetingTime, Validators.required],
          MaxGroupSize:[group.MaxGroupSize, Validators.required]
      }
    )
  }

  constructor(private groupService: GroupService,
    private fb: FormBuilder,
    private router: Router,
    private titleService: Title,
    private confirmationService: ConfirmationService) { }

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
