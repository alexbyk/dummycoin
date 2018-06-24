import { Component, OnInit } from '@angular/core';
import { ApiService } from '@src/app/api/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  constructor(public api: ApiService, public snackBar: MatSnackBar) {
    this.id = api.id;
  }

  id: string;

  changeId() {
    this.api.changeId(this.id);
    this.snackBar.open(`You id has been changed`, null, { duration: 500, panelClass: 'snack-success' });
  }

  ngOnInit() {
  }

}
