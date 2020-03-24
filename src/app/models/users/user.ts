import { Departement } from '../departements/departement';
import { Role } from '../roles/role';

export class User {
    id?:number;
    firstName?:String;
    lastName?:String;
    email?:string;
    address?:String;
    phoneNumber?:String;
    birthDate?:Date;
    userName?:String;
    password?:String;
    departement?:Departement;
    role?:Role;
    activated?:Boolean;

}
