import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  onSubmit(formValues: any): void {
    console.log(formValues);
    if(this.loginForm.valid) {
      this.submit = true;
      this.userService.login(formValues).subscribe({
        next: (res:any) => {
          console.log(res);
          this.userService.currentUser.next(res);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log("onSubmit() called");
        }
      })
    }

  }

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
