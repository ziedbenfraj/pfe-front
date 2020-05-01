import { Pipe, PipeTransform } from '@angular/core';
import { Measures } from 'src/app/models/measures/measures';

@Pipe({
  name: 'measuresPipeByDate'
})
export class MeasuresPipeByDatePipe implements PipeTransform {

  transform(measuresList: Measures[], text: string): Measures[] {
    if (text == null || text === "") {
      return measuresList;
    }
    return measuresList.filter(n =>
      n.dateOfMeasure.toString().includes(text)
    );
  }

}
