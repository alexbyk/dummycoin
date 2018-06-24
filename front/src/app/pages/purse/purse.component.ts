import { Component, OnInit } from '@angular/core';
import { ApiService } from '@src/app/api/api.service';
import { State } from '@src/app/state';

@Component({
  selector: 'app-purse',
  templateUrl: './purse.component.html',
  styleUrls: ['./purse.component.scss']
})
export class PurseComponent implements OnInit {

  balance = new State();

  constructor(public api: ApiService) { }

  async loadBalance() {
    this.balance = State.fromObservable(this.api.getBalance());
  }

  ngOnInit() {
    this.loadBalance();
  }

}
