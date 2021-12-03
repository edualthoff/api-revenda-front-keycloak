import { KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private token: KeycloakService) { }

  ngOnInit(): void {
  }

  buttonSair(){
    this.token.logout();
  }
}
