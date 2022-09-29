import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  username!: string;
  errorStatus!: string;
  availabilityChecked!: boolean;
  usernameAvailable!: boolean;
  submit!: boolean;
  validationChecked!: boolean;

  onSubmit(formValues: any): void {
    console.log(formValues);
    if(this.registerForm.valid) {
      this.submit = true;
      this.userService.registerUser(formValues).subscribe({
        next: (res:any) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.errorStatus = err.status;
        },
        complete: () => {
          console.log("onSubmit() called");
          this.router.navigate(['login']);
        }
      })
    }
  }

  checkUsernameAvailability(formValues: any): void {
    this.userService.checkUsernameAvailability(formValues.username).subscribe({
      next: (res:string) => {
        if (res === 'NO') {
          this.usernameAvailable = false;
          this.availabilityChecked = true;
          this.registerForm.invalid;
        } else if (res === 'YES') {
          this.usernameAvailable = true;
          this.availabilityChecked = true;
        }
      },
      error: (err) => {
        console.log(err);
        this.errorStatus = err.status;
      },
    })
  }

  showFormErrors() {
    this.registerForm.markAllAsTouched();
    this.validationChecked = true;
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  cancelForm(): void {
    this.router.navigate(['home']);
  }

  canDeactivate(): boolean {
    return !this.registerForm.touched || this.submit
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NWATG | Register')
    this.createForm();
  }

}
