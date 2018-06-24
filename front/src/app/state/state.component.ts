import { Component, OnInit, Input } from '@angular/core';
import { State } from '@src/app/state';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  @Input() state: State<any>;
  constructor() { }

  ngOnInit() {
  }

}
