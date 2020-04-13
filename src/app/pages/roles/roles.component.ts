import { Component, OnInit, TemplateRef } from '@angular/core';
import { Role } from 'src/app/models/roles/role';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/roles/role.service';
import { error } from 'util';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  // modal
  modalRef: BsModalRef;
  // variables
  public role: Role;
  private roles:Role[];
  constructor(private _roleService:RoleService,private _router:Router,
    private _authService:AuthenticationService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.OnGetAllRoles();
  }

  //get all roles
  OnGetAllRoles(){
    this._roleService.getRoles().subscribe((role)=>{
      this.roles=role;
    },(error)=>{
      console.log(error);
    });
  }

  //update description of role
  updateRole(role,template: TemplateRef<any>) {
     this.role=role;
     this.modalRef = this.modalService.show(template);
   }

   decline(): void {
    this.modalRef.hide();
    this.ngOnInit();
  }

   // update 
   processForms(){
     console.log(this.role);
    this._roleService.updateRole(this.role).subscribe((role) => {
      console.log(role);
      this.ngOnInit();
    }, (error) => {
      console.log(error);
    });
    this.ngOnInit();
    this.modalRef.hide();
   }

  //  Auth
  isAutheticated(){
    return this._authService.isAutheticated();
  }
  isAdmin(){
    return this._authService.role=="ADMIN";
    
  }
  isUser(){
    return this._authService.role=="USER";
  }
  userName(){
    console.log(this._authService.username);
    return this._authService.username;
  }

}
