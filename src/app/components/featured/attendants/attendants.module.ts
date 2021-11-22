import { NgModule } from '@angular/core';
import { AttendantComponent } from './attendant/attendant.component';
import { AttendantsComponent } from './attendants.component';

@NgModule({
  declarations: [AttendantComponent, AttendantsComponent],
  exports: [],
})
export class AttendantsModule {}
