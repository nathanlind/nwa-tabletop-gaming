import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

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
      this.submit = true;
      this.userService.login(formValues).subscribe({
        next: (res:any) => {
          console.log(res);
          this.userService.updateCurrentUser(res);
        },
        error: (err) => {
          console.log(err);
          this.errorStatus = err.status;
        },
        complete: () => {
          console.log("onSubmit() called");
          this.router.navigate(['']);
        }
      })
    }
  }

  showFormErrors() {
    this.loginForm.markAllAsTouched();
    this.validationChecked = true;
  }

  cancelForm() {
    this.confirmationService.confirm({
      message: 'Form has not been submitted. Do you wish to cancel?',
      header: 'Confirm Cancel',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.router.navigate(['home']);
      },
      reject: () => {
      }
    })
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private titleService: Title,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.titleService.setTitle('NWATG | Login')
    this.createForm();
  }

}
