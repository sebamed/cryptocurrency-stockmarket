import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { CoinService } from '../services/coins.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Coin } from '../models/coin.model';

declare var $: any;

@Component({
    selector: 'app-coin-info',
    templateUrl: './coin-info.component.html',
    styleUrls: ['./coin-info.component.css']
})
export class CoinInfoComponent implements OnInit, OnDestroy {

    myCoin: Coin = new Coin();

    coinAlias: string;
    private sub: any;

    coinData = [];
    coinPrices = [];
    coinTime = [];

    coinChart = [];

    coinChartData: Array<any> = [
        { data: this.coinPrices }
    ];

    coinChartColors: Array<any> = [
        { // ljubicasta i bela
            backgroundColor: '#4837934b',
            borderColor: '#fff',
            pointBackgroundColor: '#fff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#291a6c',
            pointHoverBorderColor: '#fff'
        },
    ];
    coinChartLabels: Array<any> = this.coinTime;
    coinChartOptions: any = {
        responsive: true,
        legend: {
            display: false,
        },
        elements: {
            line: {
                tension: 0.12,
            }
        },
        scales:
            {
                xAxes: [{

                    gridLines: {
                        display: false
                    },
                    ticks: {
                        fontSize: 8,
                        fontColor: '#fff'
                    }
                }],
                yAxes: [{
                    position: 'right',
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        fontSize: 9,
                        fontColor: '#fff'
                    }
                }]
            }
    }

    coinChartLegend: boolean = false;
    coinChartType: string = 'line';

    timer: Observable<any>;
    timerPriceRefresh: Observable<any>;

    subscription: Subscription;
    subCoins: Subscription;
    subCoinInfo: Subscription;
    subCoinPriceRefresh: Subscription;

    constructor(private _coins: CoinService,
        private _route: ActivatedRoute) {

    }


    ngOnInit() {
        $('.chart').hide();
        this.getUrlParams(); // stavlja coinAlias na trenutni coin
        this.getCoinInfo(this.coinAlias);
        this.getCoinsHistory();
        this.refreshCoinPrice(30000);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.sub.unsubscribe();
        this.subCoins.unsubscribe();
        this.subCoinInfo.unsubscribe();
        this.subCoinPriceRefresh.unsubscribe();
    }

    getCoinInfo(alias: string) {
        this.subCoinInfo = this._coins.getCoinInfo(alias).subscribe(res => {
            console.log("TIP: " + res.RAW[alias]["USD"]["TYPE"]);
            this.setMyCoin(res);
        },
            error => console.log(error),
            () => {
                console.log("uzet type");
            })
    }

    refreshCoinPrice(sec: number){
        this.timerPriceRefresh = Observable.timer(sec);
        this.subCoinPriceRefresh = this.timerPriceRefresh.subscribe(() => {
            this.getCoinInfo(this.coinAlias);
        },
        error => console.log(error), 
        () => {
            this.refreshCoinPrice(30000);
            console.log("refreshovnaa cena");
        });
    }

    setMyCoin(res: any) {
        this.myCoin.alias = this.coinAlias;
        this.myCoin.currentPrice = res.RAW[this.myCoin.alias]["USD"]["PRICE"];
    }

    initiateChart() {
        this.timer = Observable.timer(500);
        this.subscription = this.timer.subscribe(() => {
            this.coinChartData = [
                { data: this.coinPrices, label: this.coinAlias }
            ];
        },
            error => console.log(error),
            () => {
                this.initiateChart();
                $('.progress').fadeOut();
                $('.chart').fadeIn();
            }
        );
    }

    getUrlParams() {
        this.subCoins = this.sub = this._route.params.subscribe(params => {
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
            this.coinTime.push(date.toString().substring(0, 10));
            console.log(this.coinTime[i]);
        }
    }

    setPriceArray() {
        for (var i = 0; i < this.coinData.length; i++) {
            this.coinPrices.push(this.coinData[i].open);
            console.log(this.coinPrices[i]);
        }
    }

    // events
    chartClicked(e: any) {
        console.log(e); // dodaj neku logiku
    }

    chartHovered(e: any) {
        console.log(e); // dodaj neku logiku
    }

}