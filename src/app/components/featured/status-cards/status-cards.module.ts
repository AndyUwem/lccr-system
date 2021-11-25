import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StatusCardComponent } from './status-card/status-card.component';
import { StatusCardsComponent } from './status-cards.component';


@NgModule({
  declarations: [StatusCardsComponent, StatusCardComponent ],
  exports: [HttpClientModule, StatusCardsComponent, StatusCardComponent ],
})
export class StatusCardsModule {}
