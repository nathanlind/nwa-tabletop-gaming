import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './components/cities/cities.component';
import { GroupsComponent } from './components/groups/groups.component';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';
import { RegisterComponent } from './components/register/register.component';

const fallbackRoute: Route = { path: '**', component: CitiesComponent }

const routes: Routes = [
  { path: '', component: CitiesComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'members', component: MembersComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  fallbackRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
