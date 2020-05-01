import { Sensors } from '../sensors/sensors';

export class Measures {
    id?: number;
    pressure?;
    temperature?;
    dateOfMeasure?: Date;
    sensor?: Sensors;
}
