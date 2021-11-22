import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeaturedModule } from './components/featured/featured.module';
import { SharedModule } from './components/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    SharedModule,
    FeaturedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
