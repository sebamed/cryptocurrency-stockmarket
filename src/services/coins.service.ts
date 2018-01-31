import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoinService {

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
        'MIOTA',
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
        'BANX',
        'BAT',
        'BCH',
        'BRX',
        'BSD',
        'BTA',
        'BTCD',
        'BTM',
        'CLOAK',
        'DAO',
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

    result: any;

    constructor(private _http: Http){
        //this.coinsListUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + this.getCoinsNames() + "&tsyms=USD";
        this.coinsListUrl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + this.getCoinsNames() + "&tsyms=USD";
        this.coinsPriceHistoryUrl = "";
        this.coinInfoUrl = "";
    }

    getCoins(){
        return this._http.get(this.coinsListUrl)
            .map(result => result.json());
    }

    getCoinsNames(){
        return this.coinsList.toString();
    }

    getCoinsPriceHistory(alias: string, days: number){
        // TODO: dodaj da pored aliasa prihvata koliko dana treba da prikaze
        this.coinsPriceHistoryUrl = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + alias.toUpperCase() + '&tsym=USD&limit=' + days;
        return this._http.get(this.coinsPriceHistoryUrl)
            .map(result => result.json());
    }

    getCoinInfo(alias: string){
        this.coinInfoUrl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + alias + "&tsyms=USD"
        return this._http.get(this.coinInfoUrl)
            .map(result => result.json());
    }

}