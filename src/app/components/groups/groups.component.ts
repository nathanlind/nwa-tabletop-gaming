import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'tg-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
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

  editGroup(group: Group): void {
    this.groupService.currentGroup.next(group);
    this.router.navigate(['groups/edit-group']);
  }

  viewGroupMembers(group: Group): void {
    this.groupService.currentGroup.next(group);
    this.router.navigate(['members']);
  }

  constructor(private groupService: GroupService,
    private router: Router,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("NWATG | Groups")
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
