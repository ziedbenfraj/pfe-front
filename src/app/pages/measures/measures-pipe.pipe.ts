import { Pipe, PipeTransform } from '@angular/core';
import { Measures } from 'src/app/models/measures/measures';

@Pipe({
  name: 'measuresPipe'
})
export class MeasuresPipePipe implements PipeTransform {

  transform(measuresList: Measures[], text: string): Measures[] {
    if(text == null || text === ""){
      return measuresList;
    }
    return measuresList.filter(n => 
      n.dateOfMeasure.toString().includes(text) || 
      n.pressure.toString().includes(text) ||
      n.temperature.toString().includes(text) ||
      n.sensor.name.toString().includes(text)
    );
  }

}
