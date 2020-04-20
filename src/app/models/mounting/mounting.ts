import { Vehicles } from '../vehicles/vehicles';
import { Tyre } from '../tyre/tyre';

export class Mounting {
    id?:number;
    vehicle?:Vehicles;
    tyre?:Tyre;
    mountingDate?:Date;
}
