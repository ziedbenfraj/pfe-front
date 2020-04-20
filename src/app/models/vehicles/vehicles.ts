import { Companies } from '../companies/companies';
import { Mounting } from '../mounting/mounting';
import { Tyre } from '../tyre/tyre';

export class Vehicles {
    id?:number;
    type?:String;
    registrationNumber?:String;
    company?:Companies;
    mounting?:{
        id?:number;
        mountingDate?:Date;
        tyre?:Tyre;
    }
}
