import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CoinService } from '../services/coins.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-coin-info',
    templateUrl: './coin-info.component.html',
    styleUrls: ['./coin-info.component.css']
})
export class CoinInfoComponent implements OnInit {

    coinAlias: string;
    private sub: any;

    coinData = [];
    coinPrices = [];
    coinTime = [];

    coinChart = [];

    coinChartData: Array<any> = [
        { data: this.coinPrices }
    ];
    coinChartLabels: Array<any> = this.coinTime;
    coinChartOptions: any = {
        responsive: true,
        legend: {
            display: false,
        }
    }

    coinChartLegend: boolean = false;
    coinChartType: string = 'line';

    timer: Observable<any>;
    subscription: Subscription;

    constructor(private _coins: CoinService,
        private _route: ActivatedRoute) {

    }

    // events
    public chartClicked(e: any) {
        console.log(e); // dodaj neku logiku
    }

    ngOnInit() {
        this.getUrlParams(); // stavlja coinAlias na trenutni coin
        this.getCoinsHistory();
    }

    initiateChart() {
        this.timer = Observable.timer(1000);
        this.subscription = this.timer.subscribe(() => {
            this.coinChartData = [
                { data: this.coinPrices, label: this.coinAlias }
            ];

        });
    }

    getUrlParams() {
        this.sub = this._route.params.subscribe(params => {
            this.coinAlias = params['alias'];
        });
        console.log(this.coinAlias);
    }

    getCoinsHistory() {
        this._coins.getCoinsPriceHistory(this.coinAlias).subscribe(res => {
            this.coinData = res.Data; // uzima "Data" gnezdo iz objekta
            console.log("posle uzimanja: " + this.coinData.length);
        },
            error => console.log(error),
            () => {
                console.log("uzeto: " + this.coinData[10].time + " a " + this.coinData[1].open);
                this.setPriceArray();
                this.setTimeArray();
                this.initiateChart();
            });
    }

    setTimeArray() {
        for (var i = 0; i < this.coinData.length; i++) {
            let broj = Number(new Date(this.coinData[i].time * 1000));
            let date = new Date(broj);
            this.coinTime.push(date.toString().substring(0, 15));
            console.log(this.coinTime[i]);
        }
    }

    setPriceArray() {
        for (var i = 0; i < this.coinData.length; i++) {
            this.coinPrices.push(this.coinData[i].open);
            console.log(this.coinPrices[i]);
        }
    }
}