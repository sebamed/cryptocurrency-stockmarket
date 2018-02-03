import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { CoinService } from '../services/coins.service';

@Component({
    selector: 'app-list-summary',
    templateUrl: './list-summary.component.html',
    styleUrls: ['./list-summary.component.css'],
})
export class ListSummaryComponent implements OnInit, OnDestroy {

    currentCurrencySymbol;
    totalMarketCap;


    constructor(private _coin: CoinService) {

    }

    ngOnInit() {
        this.currentCurrencySymbol = this._coin.getCurrentCurrencySymbol();
    }

    ngOnDestroy() {

    }
}