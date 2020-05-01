import { Tyre } from '../tyre/tyre';
import { Measures } from '../measures/measures';

export class Sensors {
    id?: number;
    name?: string;
    serialNumber?: string;
    description?: string;
    enable?: boolean;
    tyre?: Tyre;
    measures?: Measures;
}
