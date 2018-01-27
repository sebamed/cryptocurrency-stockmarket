// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
// NgStickyDirective
import { NgStickyDirective } from 'ng-sticky';

// routing
import { routing } from './app-routing';

// services
import { CoinService } from '../services/coins.service';

// pipes 
import { KeysPipe } from '../pipes/keys.pipe';

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
    NgStickyDirective,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    routing
  ],
  providers: [CoinService],
  bootstrap: [HomeComponent]
})
export class AppModule { }
