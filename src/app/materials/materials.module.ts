import { NgModule } from '@angular/core';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material'; 
const materialComponent=[
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  
]
@NgModule({
  imports: [materialComponent],
  exports:[materialComponent]
})
export class MaterialsModule { }
