import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RandomText } from '../services/random-text.service';
import { CoinService } from '../services/coins.service';
import { Router } from '@angular/router';
import { CurrencyListComponent } from '../currency-list/currency-list.component';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [CurrencyListComponent]
})
export class HomeComponent implements OnInit, OnDestroy {

    PageTitle: String;

    subscription: Subscription;
    timer: Observable<any>;
    randomText: string;

    currencyList: string[] = [];

    currentCurrency = '';
    tempCurrency = '';

    constructor(private _random: RandomText,
        private _coins: CoinService,
        private _router: Router, private cListComponent: CurrencyListComponent) {

    }

    ngOnInit() {
        $('#currency-menu').hide();
        this.getCurrencyList();
        this.PageTitle = 'Cryptocurrency Stock Market';
        this.randomText = this._random.getRandomText(this.randomText);
        this.getRandomText();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getRandomText() {
        this.timer = Observable.timer(20000); // 20 sec
        this.subscription = this.timer.subscribe(() => {
            this.randomText = this._random.getRandomText(this.randomText);
            console.log(this.randomText);
            this.getRandomText();
        });
    }

    getCurrencyList() {
        this.currencyList = this._coins.getCurrencyList();
    }

    setNewCurrency(currency) {
        this.tempCurrency = currency;
    }

    showMenu() {
        $('#currency-menu').fadeIn(500);
    }

    hideMenu(){
        $('#currency-menu').fadeOut(500);
    }

    applyNewCurrency(){
        this.currentCurrency = this.tempCurrency.substring(0, 3);
        this._coins.setCurrentCurrency(this.currentCurrency);
        this._coins.setCurrencyUpdate(this.currentCurrency);
        this.hideMenu();
    }

    scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    }
}