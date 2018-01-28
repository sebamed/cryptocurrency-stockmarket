import { Routes } from "@angular/router/src/config";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { FavouritesComponent } from "../favourites/favourites.component";
import { CurrencyListComponent } from "../currency-list/currency-list.component";
import { CoinInfoComponent } from "../coin-info/coin-info.component";


export const routes: Routes = [
    { path: '', component: CurrencyListComponent },
    { path: 'favourites', component: FavouritesComponent },
    { path: 'coin/:alias' , component: CoinInfoComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
