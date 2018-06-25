import { Component, OnInit } from '@angular/core';
import { ApiService } from '@src/app/api/api.service';
import { SnackService } from '@src/app/snack.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  constructor(public api: ApiService, public snack: SnackService) {
    this.id = api.id;
  }

  id: string;

  changeId() {
    this.api.changeId(this.id);
    this.snack.success(`You id has been changed`);
  }

  canChange() {
    return this.id && this.id !== this.api.id;
  }

  ngOnInit() {
  }

}
