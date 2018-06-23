import { Component } from '@angular/core';
import { ApiService } from './api/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'DummyCoin';
  message = '';

  links = [
    { title: 'Purse', href: '/', icon: 'account_balance_wallet' },
    { title: 'Manage', href: '/manage', icon: 'settings' },
    { title: 'Info', href: '/info', icon: 'info' },
  ];
  constructor(public api: ApiService) { }

  async getMessage() {
    try {
      this.message = (await this.api.ping().toPromise()).getMessage();
    } catch (e) { console.log(e); }
  }

  async getBalance() {
    try {
      this.message = (await this.api.getBalance('foo').toPromise()).getAmount() + '';
    } catch (e) { console.log(e); }
  }

}
