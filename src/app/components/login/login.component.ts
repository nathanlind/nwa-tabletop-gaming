import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submit!: boolean;
  errorStatus!: string;
  validationChecked!: boolean;

  onSubmit(formValues: any): void {
    console.log(formValues);
    if(this.loginForm.valid) {
      this.userService.login(formValues).subscribe({
        next: (res:any) => {
          console.log(res);
          this.submit = true;
          this.userService.updateCurrentUser(res);
        },
        error: (err) => {
          console.log(err);
          this.errorStatus = err.status;
        },
        complete: () => {
          console.log("onSubmit() called");
          this.router.navigate(['home']);
        }
      })
    }
  }

  showFormErrors() {
    this.loginForm.markAllAsTouched();
    this.validationChecked = true;
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  cancelForm(): void {
    this.router.navigate(['home']);
  }

  setPasswordTouched() {
    this.loginForm.controls['password'].markAsTouched()
  }

  canDeactivate(): boolean {
    return !this.loginForm.touched || this.submit
  }
  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NWATG | Login')
    this.createForm();
  }

}
