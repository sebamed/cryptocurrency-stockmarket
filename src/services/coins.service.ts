import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';

@Injectable()
export class CoinService {

    currencyUpdated: EventEmitter<any> = new EventEmitter();

    currencySymbols = {
        'USD': '$', // US Dollar
        'EUR': '€', // Euro
        'CRC': '₡', // Costa Rican Colón
        'GBP': '£', // British Pound Sterling
        'ILS': '₪', // Israeli New Sheqel
        'INR': '₹', // Indian Rupee
        'JPY': '¥', // Japanese Yen
        'KRW': '₩', // South Korean Won
        'NGN': '₦', // Nigerian Naira
        'PHP': '₱', // Philippine Peso
        'PLN': 'zł', // Polish Zloty
        'PYG': '₲', // Paraguayan Guarani
        'THB': '฿', // Thai Baht
        'UAH': '₴', // Ukrainian Hryvnia
        'VND': '₫', // Vietnamese Dong
    };

    // currency list
    currencyList: string[] = [
        'USD - United States Dollar',
        'EUR - Euro',
        'CRC - Costa Rican Colón',
        'GBP - British Pound Sterling',
        'ILS - Israeli New Sheqel',
        'INR - Indian Rupee',
        'JPY - Japanese Yen',
        'KRW - South Korean Won',
        'NGN - Nigerian Naira',
        'PHP - Philippine Peso',
        'PLN - Polish Zloty',
        'PYG - Paraguayan Guarani',
        'THB - Thai Baht',
        'UAH - Ukrainian Hryvnia',
        'VND - Vietnamese Dong'
    ];

    // coins list
    coinsList: string[] = [
        'BTC',
        'ETH',
        'XRP',
        'IOT',
        'BCH',
        'ADA',
        'XLM',
        'LTC',
        'NEO',
        'EOS',
        'XEM',
        'XMR',
        'QTUM',
        'LSK',
        'USDT',
        'OMG',
        'STEEM',
        'ZEC',
        'STRAT',
        'BCN',
        'BTS',
        'ARDR',
        'AUR',
        'ARDR',
        'BAT',
        'BRX',
        'BSD',
        'BTA',
        'BTCD',
        'BTM',
        'CLOAK',
        'DCR',
        'DCT',
        'DMD',
        'DOGE',
        'EMC',
        'ETC',

    ];

    // rest api
    coinsListUrl: string;
    coinsPriceHistoryUrl: string;
    coinInfoUrl: string;
    coinCurrentInfo: string;
    coinCurrency: string = 'USD';

    result: any;

    constructor(private _http: Http) {
        this.coinsListUrl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + this.getCoinsNames() + "&tsyms=" + this.coinCurrency;
        this.coinsPriceHistoryUrl = "";
        this.coinCurrentInfo = "";
        this.coinInfoUrl = "";
    }

    setCurrencyUpdate(currency) {
        this.coinCurrency = currency;
        this.currencyUpdated.emit(this.coinCurrency);
    }

    setCurrentCurrency(currency) {
        this.coinCurrency = currency.substring(0, 3);
    }

    getCurrentCurrency() {
        return this.coinCurrency.substring(0, 3);
    }

    getCoins(): Observable<any> {
        this.coinsListUrl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + this.getCoinsNames() + "&tsyms=" + this.coinCurrency;
        return this._http.get(this.coinsListUrl)
            .map(result => result.json());
    }

    getCoinsNames() {
        return this.coinsList.toString();
    }

    getCoinsAlias() {
        return this.coinsList;
    }

    getCoinsPriceHistory(alias: string, days: number) {
        this.coinsPriceHistoryUrl = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + alias.toUpperCase() + '&tsym=' + this.coinCurrency + '&limit=' + days;
        return this._http.get(this.coinsPriceHistoryUrl)
            .map(result => result.json());
    }

    getCoinInfo(alias: string) {
        this.coinInfoUrl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + alias + "&tsyms=" + this.coinCurrency;
        console.log(this.coinInfoUrl);
        return this._http.get(this.coinInfoUrl)
            .map(result => result.json());
    }

    getCurrentCoin(alias: string) {
        this.coinCurrentInfo = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + alias + '&tsyms=' + this.coinCurrency;
        return this._http.get(this.coinCurrentInfo)
            .map(result => result.json());
    }

    getCurrencyList(): string[] {
        return this.currencyList;
    }

    getCurrentCurrencySymbol() {
        return this.currencySymbols[this.coinCurrency];
    }
}