import { Pipe, PipeTransform } from '@angular/core';
import { Measures } from 'src/app/models/measures/measures';

@Pipe({
  name: 'measuresPipeBySensor'
})
export class MeasuresPipeBySensorPipe implements PipeTransform {

  transform(measuresList: Measures[], text: string): Measures[] {
    if (text == null || text === "") {
      return measuresList;
    }
    return measuresList.filter(n =>
      n.sensor.name.toString().includes(text)
    );
  }

}
