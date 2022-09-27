import { ThisReceiver } from '@angular/compiler';
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
  availabilityChecked: boolean = false;
  usernameAvailable: boolean = false;
  submit!: boolean;

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
        },
        complete: () => {
          console.log("onSubmit() called");
          this.router.navigate(['login']);
        }
      })
    }
  }

  checkUsernameAvailability(formValues: any) {
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
      }
    })
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('NWATG | Register')
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

}
