// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// NgStickyDirective
import { NgStickyDirective } from 'ng-sticky';

// routing
import { routing } from './app-routing';



// components
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { FavouritesComponent } from '../favourites/favourites.component';
import { CurrencyListComponent } from '../currency-list/currency-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavouritesComponent,
    CurrencyListComponent,
    NgStickyDirective
  ],
  imports: [
    BrowserModule,
    RouterModule,
    routing
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
