import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './components/cities/cities.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupsComponent } from './components/groups/groups.component';
import { LoginComponent } from './components/login/login.component';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { MembersComponent } from './components/members/members.component';
import { RegisterComponent } from './components/register/register.component';
import { RoutingGuard } from './guards/routing.guard';

const fallbackRoute: Route = { path: '**', component: CitiesComponent }

const routes: Routes = [
  { path: '', component: CitiesComponent },
  { path: 'home', component: CitiesComponent },
  { path: 'groups', component: GroupsComponent, canActivate: [RoutingGuard] },
  { path: 'members', component: MembersComponent, canActivate: [RoutingGuard] },
  { path: 'register', component: RegisterComponent, canDeactivate: [RoutingGuard] },
  { path: 'login', component: LoginComponent, canDeactivate: [RoutingGuard] },
  { path: 'groups/register-group', component: GroupFormComponent, canActivate: [RoutingGuard], canDeactivate: [RoutingGuard] },
  { path: 'groups/edit-group', component: GroupFormComponent, canActivate: [RoutingGuard], canDeactivate: [RoutingGuard] },
  { path: 'members/register-member', component: MemberFormComponent, canActivate: [RoutingGuard], canDeactivate: [RoutingGuard] },
  { path: 'members/edit-member', component: MemberFormComponent, canActivate: [RoutingGuard], canDeactivate: [RoutingGuard] },
  fallbackRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RoutingGuard]
})
export class AppRoutingModule { }
