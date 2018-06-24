import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from '@src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PurseComponent } from '@src/app/pages/purse/purse.component';
import { ManageComponent } from '@src/app/pages/manage/manage.component';
import { InfoComponent } from '@src/app/pages/info/info.component';
import { StateComponent } from './state/state.component';
import { SendMoneyDialogComponent } from './pages/purse/send-money-dialog/send-money-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PurseComponent,
    ManageComponent,
    InfoComponent,
    StateComponent,
    SendMoneyDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  entryComponents: [SendMoneyDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
