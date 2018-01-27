import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CoinService {

    // coins list
    coinsList: string[] = [
        'BTC',
        'IOT',
        'ETH'
    ];

    // rest api
    coinsListUrl: string;

    result: any;

    constructor(private _http: Http){
        //this.coinsListUrl = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + this.getCoinsNames() + "&tsyms=USD";
        this.coinsListUrl = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH,DASH&tsyms=USD";
    }

    getCoins(){
        return this._http.get(this.coinsListUrl)
            .map(result => result.json());
    }

    getCoinsNames(){
        return this.coinsList.toString();
    }

}