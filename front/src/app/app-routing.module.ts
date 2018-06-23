import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurseComponent } from '@src/app/pages/purse/purse.component';
import { ManageComponent } from '@src/app/pages/manage/manage.component';
import { InfoComponent } from '@src/app/pages/info/info.component';

const routes: Routes = [
  { path: '', component: PurseComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'info', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
