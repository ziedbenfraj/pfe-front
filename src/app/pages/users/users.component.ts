import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'src/app/models/users/user';
import { UserService } from 'src/app/services/users/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RoleService } from 'src/app/services/roles/role.service';
import { DepartementService } from 'src/app/services/departements/departement.service';
import { Role } from 'src/app/models/roles/role';
import { Departement } from 'src/app/models/departements/departement';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // modal
  modalRef: BsModalRef;
  public operation:string="";
  public users: User[];
  public user:User;
  public userObj: User=new User();
  public displayPassword:boolean=true;
  // role
  public roles: Role[];
  // departement
  public departements: Departement[];

  // constructor
  constructor(private _router: Router, private _authService: AuthenticationService,
    private _userService: UserService,
    private _roleService: RoleService,
    private _departementService: DepartementService,
    private modalService: BsModalService) { }

  //get all departement
  ngOnInit() {
    this.OnGetAllUsers();
  }

  // close function 
  closeForm(){
    this.modalRef.hide();
  }


  //get all departements
  OnGetAllUsers() {
    this._userService.getUsers().subscribe((user) => {
      this.users = user;
    }, (error) => {
      console.log(error);
    });
  };

  // get Role
  onGetRole() {
    this._roleService.getRoles().subscribe((role) => {
      this.roles = role;
    }, (error) => {
      console.log(error);
    });
  };
  // get departement
  onGetDepartement() {
    this._departementService.getDepartements().subscribe((departement) => {
      this.departements = departement;
    }, (error) => {
      console.log(error)
    });
  }



  //delete
  deleteUsers(user: User) {
    this._userService.deleteUser(user.id).subscribe(() => {
      this.users.splice(this.users.indexOf(user), 1);
    }, (error) => {
      console.log(error);
    });
  }

  //update
  updateDepartement(user,template: TemplateRef<any>) {
    // localStorage.setItem("update",departement)
    // this._depService.setter(departement);
    this.displayPassword=false;
    this.userObj = user;
    this.onGetRole();
    this.onGetDepartement();
    this.operation="Edit User";
    this.modalRef = this.modalService.show(template);  
  }
  newUser(template: TemplateRef<any>) {
    this.displayPassword=true;
    this.onGetRole();
    this.onGetDepartement();
    this.operation="Add new User";
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





  processForm() {
    //user.activated=true;
    if (this.userObj.id == undefined) {
      console.log("create  eyy");
      console.log(this.userObj);
      this._userService.createUser(this.userObj).subscribe((user) => {
        console.log(user);
        this.ngOnInit();
      }, (error) => {
        console.log(error);

      });
    } else {
      console.log("update eyy");
      console.log(this.userObj);
      this._userService.updateUser(this.userObj).subscribe((user) => {
        console.log(user);
        this.ngOnInit();
      }, (error) => {
        console.log(error);
      });

      
    }
    
    this.closeForm();
    this.ngOnInit();
  }

  // confrim Delete MODAL
  deleteReq(confirmDelete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(confirmDelete, {class: 'modal-sm'});
  }
  confirm(user) {
    this.user=user;
    this.deleteUsers(user);
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }
  // delete end

  // user details
  details(user,userDetail: TemplateRef<any>){
    this.user=user;
    this.modalRef = this.modalService.show(userDetail, {class: 'modal-sm'});
  }

}
