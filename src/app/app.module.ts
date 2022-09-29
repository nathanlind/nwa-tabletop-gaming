import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule} from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GroupsComponent } from './components/groups/groups.component';
import { CitiesComponent } from './components/cities/cities.component';
import { MembersComponent } from './components/members/members.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { TimeFormatPipe } from './pipes/timeFormat.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GroupsComponent,
    CitiesComponent,
    MembersComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    GroupFormComponent,
    MemberFormComponent,
    TimeFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    Ng2SearchPipeModule,
    CalendarModule,
    BrowserAnimationsModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    RippleModule,
    PasswordModule,
    OrderModule,
    ConfirmDialogModule,
    ToastModule,
    InputNumberModule
  ],
  providers: [Title, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
