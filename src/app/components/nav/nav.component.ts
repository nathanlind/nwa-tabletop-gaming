import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tg-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser!: any;

  signOut(): void {
    this.userService.updateCurrentUser(new User());
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

  constructor(private userService: UserService, private router: Router) {
    this.currentUser = this.userService.getCurrentUser();
   }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
     user => this.currentUser = user
    );
  }

}
