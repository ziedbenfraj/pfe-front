import { Component, OnInit } from '@angular/core';
import { Companies } from 'src/app/models/companies/companies';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  public listUser:boolean=true;
  public addUpdate:boolean=false;
  public companies: Companies[];
  public companie: Companies;
  // constructor
  constructor(private _compService: CompaniesService, private _router: Router,
    private _authService: AuthenticationService) { }



  //get all departement
  ngOnInit() {
    this.OnGetAllCompanies();
  }

  //get all departements
  OnGetAllCompanies() {
    this._compService.getCompanies().subscribe((data) => {
      this.companies = data;
    }, (error) => {
      console.log(error);
    });
  }

  //delete
  deleteCompanie(companie: Companies) {
    this._compService.deleteCompanies(companie.id).subscribe(() => {
      this.companies.splice(this.companies.indexOf(companie), 1);
    }, (error) => {
      console.log(error);
    });
  }

  //update
  updateCompanie(companie) {
   // localStorage.setItem("update",departement)
    // this._depService.setter(departement);
    this.companie=companie;
    this.listUser=false;
    this.addUpdate=true;
  }
  newCompanie() {
    this.companie=new Companies;
    this.listUser=false;
    this.addUpdate=true;
  }



  //return true if exist role 
  isAutheticated() {
    return this._authService.isAutheticated();
  }

  //verify admin or not
  isAdmin() {
    return this._authService.role == "ADMIN";

  }

  isUser() {
    return this._authService.role == "USER";
  }

  userName() {
    return this._authService.username;
  }





  processForm() {
    if (this.companie.id == undefined) {
      console.log('indice 111111 !');
      this._compService.createCompanies(this.companie).subscribe((companie) => {
        console.log(companie);
        this.ngOnInit();
      }, (error) => {
        console.log(error);

      });
    } else {
      console.log('indice 2222 !');
      this._compService.updateCompanies(this.companie).subscribe((companie) => {
        console.log(companie);
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      });
    }
    this.listUser=true;
    this.addUpdate=false;
  }

}
