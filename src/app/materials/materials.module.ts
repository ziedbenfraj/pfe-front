import { NgModule } from '@angular/core';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatTableModule } from '@angular/material'; 
const materialComponent=[
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule
]
@NgModule({
  imports: [materialComponent],
  exports:[materialComponent]
})
export class MaterialsModule { }
