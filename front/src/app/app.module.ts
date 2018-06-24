import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from '@src/app/app-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { PurseComponent } from '@src/app/pages/purse/purse.component';
import { ManageComponent } from '@src/app/pages/manage/manage.component';
import { InfoComponent } from '@src/app/pages/info/info.component';
import { StateComponent } from './state/state.component';

@NgModule({
  declarations: [
    AppComponent,
    PurseComponent,
    ManageComponent,
    InfoComponent,
    StateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
