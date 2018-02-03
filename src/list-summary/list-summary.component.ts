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
    currenctCurrency;

    totalMarketCap = 0;
    totalSupply = 0;
    total24hTradeVolume = 0;
    totalCoins = 0;

    coins: any;

    constructor(private _coin: CoinService) {

    }

    ngOnInit() {
        this.currentCurrencySymbol = this._coin.getCurrentCurrencySymbol();
        this.currenctCurrency = this._coin.getCurrentCurrency();
        this.setCoins();
    }

    ngOnDestroy() {

    }

    setCoins() {
        this._coin.getCoins().subscribe(res => {
            this.coins = res;
        },
            error => {
                console.log(error);
            },
            () => {
                console.log(this.coins.RAW);
                this.setSummaryValues();
            }
        );
    }

    setSummaryValues() {
        for (let coin in this.coins.RAW) {
            this.totalMarketCap += this.coins.RAW[coin][this.currenctCurrency]['MKTCAP'];
            this.totalSupply += this.coins.RAW[coin][this.currenctCurrency]['SUPPLY'];
            this.total24hTradeVolume += this.coins.RAW[coin][this.currenctCurrency]['TOTALVOLUME24HTO'] -
                this.coins.RAW[coin][this.currenctCurrency]['TOTALVOLUME24H'];
            this.totalCoins++;
        }
    }
}