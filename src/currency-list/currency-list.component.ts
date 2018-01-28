import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CoinService } from '../services/coins.service';

@Component({
    selector: 'app-currency-list',
    templateUrl: './currency-list.component.html',
    styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

    coins: any;
    objectKeys = Object.keys;

    loaded: boolean;

    constructor(private _coins: CoinService) {

    }

    ngOnInit() {
        this.loaded = false;
       this._coins.getCoins().subscribe(res => {
           this.coins = res;
           //console.log(res);
       },
       error => {
           console.log(error);
       },
       () => {
           this.loaded = true;
           console.log("loadovano");
       }
    );
    }
}