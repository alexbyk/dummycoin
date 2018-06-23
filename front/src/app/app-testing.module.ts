import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [RouterTestingModule, MatIconModule],
  declarations: []
})
export class AppTestingModule { }
