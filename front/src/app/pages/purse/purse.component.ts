import { Component, OnInit } from '@angular/core';
import { ApiService, ITxItemWithType } from '@src/app/api/api.service';
import { State } from '@src/app/state';
import { MatDialog } from '@angular/material';
import { SendMoneyDialogComponent } from '@src/app/pages/purse/send-money-dialog/send-money-dialog.component';
import { SnackService } from '@src/app/snack.service';

@Component({
  selector: 'app-purse',
  templateUrl: './purse.component.html',
  styleUrls: ['./purse.component.scss']
})
export class PurseComponent implements OnInit {

  balance = new State<{ amount: number, pendingAmount: number }>();
  pending = new State<number>();
  history = new State<ITxItemWithType[]>();

  constructor(
    public api: ApiService, public dialog: MatDialog,
    public snack: SnackService,
  ) { }

  async loadBalance() {
    this.api.getBalance().pipe();
    this.balance = State.fromObservable(this.api.getBalance());
  }
  async loadPending() {
    this.pending = State.fromObservable(this.api.getPendingTxsCount());
  }
  async loadHistory() {
    this.history = State.fromObservable(this.api.findTxs());
  }

  async mine() {
    try {
      const res = await this.api.mine().toPromise();
      this.balance.data.amount = res.amount;
      this.balance.data.pendingAmount = 0;
      this.pending.data = 0;
      this.snack.success(`Mined block #${res.index}`);
      this.loadHistory();
    } catch (e) {
      this.snack.error(e);
    }
  }

  private async doSendMoney(toId: string, amount: number) {
    try {
      this.pending.data = await this.api.sendTx(toId, amount).toPromise();
      this.snack.success(`Money sent. Mine block`);
      this.loadBalance();
    } catch (e) {
      this.snack.error(e);
    }
  }

  sendMoney() {
    const dialogRef = this.dialog.open(SendMoneyDialogComponent);
    dialogRef.afterClosed().subscribe((result: { to: string, amount: number }) => {
      if (!result) return;
      this.doSendMoney(result.to, result.amount);
    });
  }

  load() {
    this.loadBalance();
    this.loadPending();
    this.loadHistory();
  }

  ngOnInit() {
    this.load();
  }

}
