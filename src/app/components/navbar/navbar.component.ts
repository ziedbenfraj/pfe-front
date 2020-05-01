import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }
  isAutheticated() {
    return this.authService.role != undefined;
  }
  logout() {
    this.authService.logout();
  }
  userName() {
    return this.authService.username;
  }
  ngOnInit() {
  }

}
