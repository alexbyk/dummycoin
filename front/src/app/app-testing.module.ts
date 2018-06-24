import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [RouterTestingModule, MatIconModule, MatProgressBarModule],
  declarations: []
})
export class AppTestingModule { }
