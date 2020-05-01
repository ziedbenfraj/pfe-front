import { Component } from '@angular/core';
import { AppService } from './services/app.service';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pressence-control-platform-frontend';

  constructor(private authService: AuthenticationService, private router: Router) { };

  //load the JWT
  ngOnInit(): void {
    this.authService.loadToken();
  }

  //return true if exist role 
  isAutheticated() {
    return this.authService.isAutheticated();
  }

  //verify admin or not
  isAdmin() {
    return this.authService.role == "ADMIN";

  }

  isUser() {
    return this.authService.role == "USER";
  }

  userName() {
    console.log(this.authService.username);
    return this.authService.username;
  }

}
