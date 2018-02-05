import { Component } from '@angular/core';
import { OnInit, OnDestroy, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { CoinService } from '../services/coins.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { RandomText } from '../services/random-text.service';
import { Coin } from '../models/coin.model';

declare var $: any;

@Component({
    selector: 'app-currency-list',
    templateUrl: './currency-list.component.html',
    styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit, OnDestroy {

    coins;
    coinList: any[] = [];
    coin: Coin;
    objectKeys = Object.keys;

    coinsHistory: any[] = [];

    loaded: boolean;
    subscriptionTimer: Subscription;
    subscriptionoData: Subscription;
    subscriptionEmitter: Subscription;
    timer: Observable<any>;

    scrolled: boolean;

    currentCurrency = '';
    currentSymbol = '';

    constructor(private _coins: CoinService) {

    }

    ngOnInit() {
        this.loaded = false;
        this.scrolled = false;
        this.currentCurrency = this._coins.getCurrentCurrency();
        this.getCoinData();
        this.subscriptionEmitter = this._coins.currencyUpdated.subscribe(() => {
            $('.progress').fadeIn();
            this.ngOnInit();
        });
        this.refreshData(30000);
        $('.fixed-action-btn').hide();
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $('.fixed-action-btn').fadeIn();
            } else {
                $('.fixed-action-btn').fadeOut();
            }
        });
    }

    ngOnDestroy() {
        this.subscriptionTimer.unsubscribe();
        this.subscriptionEmitter.unsubscribe();
        this.subscriptionoData.unsubscribe();
    }

    getCoinData() {
        this.subscriptionoData = this._coins.getCoins().subscribe(res => {
            this.coins = res;
        },
            error => {
                console.log(error);
            },
            () => {
                this.coinList = [];
                for (let i = 0; i < this._coins.getCoinsAlias().length; i++) {
                    this.coin = new Coin();
                    this.coin.setAlias(this._coins.getCoinsAlias()[i]);
                    this.coin.setCurrentPrice(this.coins.RAW[this._coins.getCoinsAlias()[i]][this.currentCurrency]['PRICE']);
                    this.coin.setMarketCap(this.coins.RAW[this._coins.getCoinsAlias()[i]][this.currentCurrency]['MKTCAP']);
                    this.coin.setChangePercent24Hour(this.coins.RAW[this._coins.getCoinsAlias()[i]][this.currentCurrency]['CHANGEPCT24HOUR']);
                    this.coinList.push(this.coin);
                }
                this.coinList.sort((a, b) => b.getMarketCap() - a.getMarketCap());
                this.setTimer();
                console.log("loadovano");
                $('.progress').fadeOut(500);
                this.currentSymbol = this._coins.getCurrentCurrencySymbol();
            }
        );
    }

    setTimer() {
        this.timer = Observable.timer(500);
        this.subscriptionTimer = this.timer.subscribe(() => {
            this.loaded = true;
        });
    }

    refreshData(seconds: number) {
        this.timer = Observable.timer(seconds); // 30 sekundi
        this.subscriptionTimer = this.timer.subscribe(() => {
            console.log("Refresovano");
            this.getCoinData();
            this.refreshData(seconds);
        });
    }
}