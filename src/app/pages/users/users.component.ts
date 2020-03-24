import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users/user';
import { UserService } from 'src/app/services/users/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RoleService } from 'src/app/services/roles/role.service';
import { DepartementService } from 'src/app/services/departements/departement.service';
import { Role } from 'src/app/models/roles/role';
import { Departement } from 'src/app/models/departements/departement';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public listUser: boolean = true;
  public addUpdate: boolean = false;
  public users: User[];
  public userObj: User=new User();
  // role
  public roles: Role[];
  // departement
  public departements: Departement[];

  // constructor
  constructor(private _router: Router, private _authService: AuthenticationService,
    private _userService: UserService,
    private _roleService: RoleService,
    private _departementService: DepartementService) { }

  //get all departement
  ngOnInit() {
    this.OnGetAllUsers();
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
  updateDepartement(user) {
    // localStorage.setItem("update",departement)
    // this._depService.setter(departement);
    this.userObj = user;
    this.listUser = false;
    this.addUpdate = true;
    this.onGetRole();
    this.onGetDepartement();  
  }
  newUser() {
    this.listUser = false;
    this.addUpdate = true;
    this.onGetRole();
    this.onGetDepartement();  
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
    
    this.listUser = true;
    this.addUpdate = false;
    this.ngOnInit();
  }

}
