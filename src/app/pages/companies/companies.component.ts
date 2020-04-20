import { Component, OnInit, TemplateRef } from '@angular/core';
import { Companies } from 'src/app/models/companies/companies';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Vehicles } from 'src/app/models/vehicles/vehicles';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  modalRef: BsModalRef;
  
  public companies: Companies[];
  public companie: Companies;
  public vehicles: Vehicles[];

  public companyName:string="";
  public operation:string="";
  // constructor
  constructor(private _compService: CompaniesService, private _router: Router,
    private _authService: AuthenticationService,private modalService: BsModalService) { }



  //get all departement
  ngOnInit() {
    this.OnGetAllCompanies();
  }

  // confrim Delete MODAL
  openModal(confirmDelete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(confirmDelete, {class: 'modal-sm'});
  }
  confirm(companie) {
    this.deleteCompanie(companie);
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
    this.ngOnInit();
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
    this.closeForm();
  }

  //update
  updateCompanie(companie,template: TemplateRef<any>) {
    this.operation="Edit";
    this.companie=companie;
    this.modalRef = this.modalService.show(template);
  }
  newCompanie(template: TemplateRef<any>) {
    this.operation="Add";
    this.companie=new Companies;
    this.modalRef = this.modalService.show(template);
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




  closeForm(){
    this.modalRef.hide();
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
    this.closeForm();
  }

  // function to show the vehicles of company
  details(companie,companyDetail: TemplateRef<any>){
    this.companie=companie;
    this.vehicles=this.companie.vehicles;
    this.companyName=companie.name;
    this.modalRef = this.modalService.show(companyDetail, {class: 'modal-sm'});
  }

}
