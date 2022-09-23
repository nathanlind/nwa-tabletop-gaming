import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'tg-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  groupForm!: FormGroup;
  submit!: boolean;
  currentGroup!: Group;
  newGroup!: boolean;

  cities = [
    'Springdale',
    'Fayetteville',
    'Bentonville',
    'Rogers'
  ]

  days = [
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
      } else if (!this.newGroup) {
        this.groupService.editGroup(formValues).subscribe({
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

    }
  }

  createRegisterForm() {
    this.groupForm = this.fb.group(
      {
        GroupId: [''],
        CityName: ['', Validators.required],
        GroupName: ['', Validators.required],
        OrganizerName: ['', Validators.required],
        OrganizerPhone: ['', Validators.required],
        OrganizerEmail: ['', Validators.required],
        PrimaryGame: ['', Validators.required],
        MeetingDay: ['', Validators.required],
        MeetingTime:['', Validators.required],
        MaxGroupSize:['', Validators.required]
      }
    )
  }

  createEditForm(group: Group) {
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
    private router: Router) { }

  ngOnInit(): void {
    this.groupService.currentGroup.subscribe(
      group => this.currentGroup = group
    )
    console.log(this.router.url);
    if (this.router.url === '/groups/register-group') {
      this.newGroup = true;
      this.createRegisterForm();
    } else if (this.router.url === '/groups/edit-group') {
      this.newGroup = false;
      this.createEditForm(this.currentGroup);
    }
    console.log(this.newGroup);
  }

}
