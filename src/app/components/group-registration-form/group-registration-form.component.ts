import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'tg-group-registration-form',
  templateUrl: './group-registration-form.component.html',
  styleUrls: ['./group-registration-form.component.css']
})
export class GroupRegistrationFormComponent implements OnInit {

  regGroupForm!: FormGroup;
  submit!: boolean;

  cities = [
    'Select your city',
    'Springdale',
    'Fayetteville',
    'Bentonville',
    'Rogers'
  ]

  days = [
    'Select a day of the week',
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
    if (this.regGroupForm.valid) {
      this.submit = true;
      this.groupService.addGroup(formValues);
    }
  }

  createForm() {
    this.regGroupForm = this.fb.group(
      {
        groupId: [''],
        cityName: ['', Validators.required],
        groupName: ['', Validators.required],
        organizerName: ['', Validators.required],
        organizerPhone: ['', Validators.required],
        organizerEmail: ['', Validators.required],
        primaryGame: ['', Validators.required],
        meetingWeekDay: ['', Validators.required],
        meetingTime:['', Validators.required],
        maxGroupSize:['', Validators.required]
      }
    )

  }

  constructor(private groupService: GroupService,
    private fb: FormBuilder,
    private router: Router) {
        this.createForm();
     }

  ngOnInit(): void {
  }

}
