import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupFormComponent } from '../components/group-form/group-form.component';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}


@Injectable({
  providedIn: 'root'
})
export class RoutingGuard implements CanActivate, CanDeactivate<CanComponentDeactivate> {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: CanComponentDeactivate): boolean {
      return component.canDeactivate() || window.confirm(`Are you sure you want to leave the form?`);
  }

}
