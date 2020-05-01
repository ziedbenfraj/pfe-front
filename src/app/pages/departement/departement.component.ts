import { Component, OnInit, TemplateRef } from '@angular/core';
import { DepartementService } from 'src/app/services/departements/departement.service';
import { Router } from '@angular/router';
import { Departement } from 'src/app/models/departements/departement';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  // 

  // modal
  modalRef: BsModalRef;
  public operation: string = "";
  // variables
  public departements: Departement[];
  public departement: Departement;
  // constructor
  constructor(private _depService: DepartementService, private _router: Router,
    private _authService: AuthenticationService,
    private modalService: BsModalService) { }



  //get all departement
  ngOnInit() {
    this.OnGetAllDepartements()
  }

  closeForm() {
    this.modalRef.hide();
  }

  //get all departements
  OnGetAllDepartements() {
    this._depService.getDepartements().subscribe((departement) => {
      this.departements = departement;
    }, (error) => {
      console.log(error);
    });
  }

  //delete
  deleteDepartement(departement: Departement) {
    this._depService.deleteDepartement(departement.id).subscribe(() => {
      this.departements.splice(this.departements.indexOf(departement), 1);
    }, (error) => {
      console.log(error);
    });
  }

  //update
  updateDepartement(departement, template: TemplateRef<any>) {
    this.departement = departement;
    this.operation = "Edit Departement";
    this.modalRef = this.modalService.show(template);
  }
  newDepartement(template: TemplateRef<any>) {
    this.departement = new Departement;
    this.operation = "Add new Departement";
    this.modalRef = this.modalService.show(template);
  }


  //Auth
  isAutheticated() {
    return this._authService.isAutheticated();
  }
  isAdmin() {
    return this._authService.role == "ADMIN";
  }
  isUser() {
    return this._authService.role == "USER";
  }
  userName() {
    return this._authService.username;
  }

  // verifiy if exist an id 
  // id!=null ? editFunction : addFunction 
  processForm(departement) {
    if (this.departement.id == undefined) {
      console.log('indice 111111 !');
      this._depService.createDepartement(this.departement).subscribe((departement) => {
        console.log(departement);
        this.ngOnInit();
      }, (error) => {
        console.log(error);

      });
    } else {
      console.log('indice 2222 !');
      this._depService.updateDepartement(this.departement).subscribe((departement) => {
        console.log(departement);
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      });
    }
    this.closeForm();
  }

  // confrim Delete MODAL
  openModal(confirmDelete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(confirmDelete, { class: 'modal-sm' });
  }
  confirm(departement) {
    this.departement = departement;
    this.deleteDepartement(departement);
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
    this.ngOnInit();
  }
  // end here





}
