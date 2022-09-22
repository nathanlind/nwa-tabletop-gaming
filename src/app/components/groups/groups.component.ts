import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'tg-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups!: any;
  errorMessage!: string;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
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
