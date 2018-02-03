import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { CoinService } from '../services/coins.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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

    timerRefresh: Observable<any>;
    subRefresh: Subscription;
    subCoins: Subscription;

    coins: any;

    constructor(private _coin: CoinService) {

    }

    ngOnInit() {
        this.currentCurrencySymbol = this._coin.getCurrentCurrencySymbol();
        this.currenctCurrency = this._coin.getCurrentCurrency();
        this.setCoins();
        this.refreshValues(30000);
    }

    ngOnDestroy() {
        this.subRefresh.unsubscribe();
        this.subCoins.unsubscribe();
    }

    refreshValues(seconds) {
        this.timerRefresh = Observable.timer(seconds);
        this.subRefresh = this.timerRefresh.subscribe(() => {
            this.setSummaryValues();
        },
            error => {
                console.log(error);
            },
            () => {
                console.log('refreshovan summary');
                this.refreshValues(30000);
            });
    }

    setCoins() {
        this.subCoins = this._coin.getCoins().subscribe(res => {
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
        this.resetValues();
        for (let coin in this.coins.RAW) {
            this.totalMarketCap += this.coins.RAW[coin][this.currenctCurrency]['MKTCAP'];
            this.totalSupply += this.coins.RAW[coin][this.currenctCurrency]['SUPPLY'];
            this.total24hTradeVolume += this.coins.RAW[coin][this.currenctCurrency]['TOTALVOLUME24HTO'] -
                this.coins.RAW[coin][this.currenctCurrency]['TOTALVOLUME24H'];
            this.totalCoins++;
        }
    }

    resetValues(){
        this.totalMarketCap = 0;
        this.totalSupply = 0
        this.total24hTradeVolume = 0;
        this.totalCoins = 0;
    }
}