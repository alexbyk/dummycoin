import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-send-money-dialog',
  templateUrl: './send-money-dialog.component.html',
  styleUrls: ['./send-money-dialog.component.scss']
})
export class SendMoneyDialogComponent {

  model = {
    to: '',
    amount: 1,
  };
  constructor(public dialogRef: MatDialogRef<SendMoneyDialogComponent>) { }

  canSend() {
    return !!this.model.to && this.model.amount > 0;
  }
  onCancel() {
    this.dialogRef.close();
  }


}
