
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itens',
  //templateUrl: './itens.component.html',
  template: '<router-outlet></router-outlet>',
  //styleUrls: ['./itens.component.scss']
})
export class ItensComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
  }
}
