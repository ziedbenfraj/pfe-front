import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/roles/role';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/roles/role.service';
import { error } from 'util';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  public listRole:boolean=true;
  public addUpdate:boolean=false;
  public role: Role;
  private roles:Role[];
  constructor(private _roleService:RoleService,private _router:Router,
    private _authService:AuthenticationService) { }

  ngOnInit() {
    if(this.isAdmin()){
      this.OnGetAllRoles();
    }else{
      this._router.navigateByUrl('/');
    }
  }

  //get all roles
  OnGetAllRoles(){
    this._roleService.getRoles().subscribe((role)=>{
      console.log("heyy");
      this.roles=role;
      console.log(this.roles);
      console.log(this._authService.getToken());
    },(error)=>{
      console.log(error);
    });
  }

  //update description of role
  update(role) {
     this.role=role;
     this.listRole=false;
     this.addUpdate=true;
   }

   // update 
   updateDescription(role){
     console.log(role);
    this._roleService.updateRole(this.role).subscribe((role) => {
      console.log(role);
    }, (error) => {
      console.log("ha narrri " + error);
    });
    console.log(role);
    this.ngOnInit();
    this.listRole=true;
    this.addUpdate=false;
   }

  //return true if exist role 
  isAutheticated(){
    return this._authService.isAutheticated();
  }

  //verify admin or not
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
