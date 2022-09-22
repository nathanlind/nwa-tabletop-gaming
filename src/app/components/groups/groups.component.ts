import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'tg-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  faCirclePlus = faCirclePlus;

  groups!: any;
  errorMessage!: string;

  constructor(private groupService: GroupService, private router: Router, private titleService: Title) { }

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
