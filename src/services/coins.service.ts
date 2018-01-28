import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
        'TRX',
        'ICX',
        'QTUM',
        'LSK',
        'XRB',
        'PPT',
        'USDT',
        'OMG',
        'STEEM',
        'ZEC',
        'STRAT',
        'SC',
        'BCN',
        'BTS',
        'BNB',
        'XVG',
        'KCS',
        'SNT',
        'ARDR',
    ];

    // rest api
    coinsListUrl: string;

    result: any;

    constructor(private _http: Http){
        //this.coinsListUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + this.getCoinsNames() + "&tsyms=USD";
        this.coinsListUrl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" + this.getCoinsNames() + "&tsyms=USD";
    }

    getCoins(){
        return this._http.get(this.coinsListUrl)
            .map(result => result.json());
    }

    getCoinsNames(){
        return this.coinsList.toString();
    }

}