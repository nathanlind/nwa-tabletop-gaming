import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupFormComponent } from '../components/group-form/group-form.component';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}


@Injectable({
  providedIn: 'root'
})
export class RoutingGuard implements CanActivate, CanDeactivate<CanComponentDeactivate> {

  currentUser!: User;

  canActivate(): boolean {
    this.currentUser = this.userService.getCurrentUser();
    console.log(this.currentUser);
    if (!this.currentUser) {
      this.router.navigate(['login'])
      alert(`You haven't logged in yet.  You will be redirected to the login page.`)
      return false;
    }
    return true;
  }

  canDeactivate(
    component: CanComponentDeactivate): boolean {
      return component.canDeactivate() || window.confirm(`Are you sure you want to leave the form?`);
  }

  constructor(private userService: UserService, private router: Router) { }

}
