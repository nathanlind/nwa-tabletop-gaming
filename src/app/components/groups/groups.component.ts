import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { OrderPipe } from 'ngx-order-pipe'

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { Group } from 'src/app/models/group.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'tg-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class GroupsComponent implements OnInit {

  faCirclePlus = faCirclePlus;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faUser = faUser;
  faEye = faEye;

  groups!: any;
  errorMessage!: string;
  currentGroup!: Group;
  newGroup!: boolean;
  searchText!: string;
  currentCity!: any;

  deleteGroup(group: Group): void {
    this.groupService.deleteGroupById(group.GroupId)
      .subscribe({
        next: () => {
          this.groupService.getGroups();
        },
        error: (err) => {
          console.log(this.errorMessage = err.errorMessage);
        },
        complete: () => {
          console.log(`deleteGroupById(${group.GroupId}) called`);
          const index = this.groups.findIndex((object: Group) => {
            return object.GroupId === group.GroupId;
          })
          this.groups.splice(index, 1);
        }
      })
  }

  confirmDelete(group: Group) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this group?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteGroup(group);
        },
        reject: () => {
        }
    });
}

  editGroup(group: Group): void {
    this.groupService.updateCurrentGroup(group);
    this.router.navigate(['groups/edit-group']);
  }

  viewGroupMembers(group: Group): void {
    this.groupService.updateCurrentGroup(group);
    this.router.navigate(['members']);
  }

  addGroupMember(group: Group): void {
    this.groupService.updateCurrentGroup(group);
    this.router.navigate(['/members/register-member']);
  }

  viewAllGroups(): void {
    this.searchText = '';
    this.currentCity = undefined;
    localStorage.removeItem('currentCity');
  }

  constructor(private groupService: GroupService,
    private cityService: CityService,
    private router: Router,
    private titleService: Title,
    private orderPipe: OrderPipe,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) {}

  ngOnInit(): void {
    this.titleService.setTitle("NWATG | Groups")
    this.currentCity = this.cityService.getCurrentCity();
    this.currentGroup = this.groupService.getCurrentGroup();
    if (this.currentCity) {
      this.searchText = this.currentCity.CityName;
    }
    if(this.currentGroup.GroupName) {
      this.searchText = this.currentGroup.GroupName;
    }
    this.groupService.getGroups()
      .subscribe({
        next: (res:any) => {
          this.groups = res;
          console.log(this.groups)
        },
        error: (err) => {
          console.log(this.errorMessage = err.errorMessage)
        },
        complete: () => {
          console.log(`called getGroups()`);
        }
      })
  }

}
