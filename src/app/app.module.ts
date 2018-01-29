// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
// NgStickyDirective
import { NgStickyDirective } from 'ng-sticky';
// NgCharts
import { ChartsModule } from 'ng2-charts';
// NgScrollReveal
import { NgsRevealModule } from 'ng-scrollreveal';

// routing
import { routing } from './app-routing';

// services
import { CoinService } from '../services/coins.service';
import { RandomText } from '../services/random-text.service';

// pipes 
import { KeysPipe } from '../pipes/keys.pipe';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { FavouritesComponent } from '../favourites/favourites.component';
import { CurrencyListComponent } from '../currency-list/currency-list.component';
import { FooterComponent } from '../footer/footer.component';
import { CoinInfoComponent } from '../coin-info/coin-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavouritesComponent,
    CurrencyListComponent,
    FooterComponent,
    NgStickyDirective,
    CoinInfoComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ChartsModule,
    NgsRevealModule.forRoot(),
    routing
  ],
  providers: [CoinService, RandomText],
  bootstrap: [HomeComponent]
})
export class AppModule { }
