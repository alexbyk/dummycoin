import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

/** Unify snackbar behaviour */

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(public snackBar: MatSnackBar) { }
  success(msg: string) {
    this.snackBar.open(msg, null, { duration: 1000, panelClass: 'snack-success' });
  }
  error(e: any) {
    console.log(e);
    this.snackBar.open(`Error: ${e}`, null, { duration: 2000, panelClass: 'snack-error' });
  }
}
