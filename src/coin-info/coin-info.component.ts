import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CoinService } from '../services/coins.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-coin-info',
    templateUrl: './coin-info.component.html',
    styleUrls: ['./coin-info.component.css']
})
export class CoinInfoComponent implements OnInit {

    coinAlias: string;
    private sub: any;

    coinData: any[] = [];
    coinPrices: any[] = [];
    coinTime: any[] = [];

    constructor(private _coins: CoinService,
                private _route: ActivatedRoute){

    }

    ngOnInit() {
        this.getUrlParams(); // stavlja coinAlias na trenutni coin
        this.getCoinsHistory();
    }

    getUrlParams(){
        this.sub = this._route.params.subscribe(params => {
            this.coinAlias = params['alias'];
        });
        console.log(this.coinAlias);
    }

    getCoinsHistory(){
        this._coins.getCoinsPriceHistory(this.coinAlias).subscribe(res => {
            this.coinData = res.Data; // uzima "Data" gnezdo iz objekta
        },
        error => console.log(error),
        () => {
            console.log("uzeto: " + this.coinData[10].time + " a " + this.coinData[1].open);
            this.setPriceArray();
            this.setTimeArray();
        });
    }

    setTimeArray(){
        for(var i = 0; i < this.coinData.length; i++){
            let broj = Number(new Date(this.coinData[i].time * 1000));
            let date = new Date(broj);
            console.log(date.toString().substring(0, 15));
        }
    }

    setPriceArray(){
        for(var i = 0; i < this.coinData.length; i++){
            console.log(this.coinData[i].open);
        }
    }
}