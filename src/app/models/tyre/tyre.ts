import { Sensors } from '../sensors/sensors';
import { Mounting } from '../mounting/mounting';
import { Vehicles } from '../vehicles/vehicles';

export class Tyre {
    id?:number;
    serialNumber?:string;
    productCode?:string;
    productDescription?:string;
    brandName?:string;
    sensor?:Sensors;
    mounting?:{
        id?:number;
    vehicle?:Vehicles;
    mountingDate?:Date;
    }
}
