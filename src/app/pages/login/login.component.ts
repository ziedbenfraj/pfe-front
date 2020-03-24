import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }

  onLogin(data){
    console.log("ty chbik !");
    this.authService.login(data).subscribe(resp=>{
      let jwt=resp.body['message'];
      this.authService.saveToken(jwt);
      console.log(resp.body['message']);
      //console.log(resp.body['Erreur']);// if return false then no erreur
    },err=>{
      console.log(err);
    })
  }

}
