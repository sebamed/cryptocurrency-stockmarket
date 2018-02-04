import { Component, ViewChild, ElementRef } from '@angular/core';
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
    @ViewChild('chart') chart: ElementRef;

    myCoin: Coin = new Coin();

    coinAlias: string;
    sub: any;

    days: number; // koliko dana gleda

    percentageDifference: number;

    coinMarketCap;
    coinSupply;
    coinChange;
    coinTotalVolume;

    coinData = [];
    coinPrices = [];
    coinTime = [];

    currentCoin: any;
    currentCurrency;

    currentSymbol = '$';

    // chart
    coinChart = [];
    coinChartData: Array<any> = [
        {
            data: this.coinPrices,
            label: this.coinTime
        }
    ];
    coinChartColors: Array<any> = [];
    coinChartLabels: Array<any> = this.coinTime;
    coinChartOptions: any = {
        responsive: true,
        animation: {
            duration: 800,
            easing: 'easeOutQuart'
        },
        tooltips: {
            enabled: false, // stavi true ako zelis da vidis i zakomentarisi onHover metodu u hover opciji
            backgroundColor: 'rgba(40, 25, 106, .7)',
            borderColor: 'rgba(40, 25, 106, .9)',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 10,
            caretPadding: 15,
            displayColors: false,
            callbacks: {
                // formating tooltipova
                title: function (tooltipItems, data) {
                    // Pick first xLabel for now
                    var title = '';
                    var labels = data.labels;
                    var labelCount = labels ? labels.length : 0;

                    if (tooltipItems.length > 0) {
                        var item = tooltipItems[0];

                        if (item.xLabel) {
                            title = item.xLabel;
                        } else if (labelCount > 0 && item.index < labelCount) {
                            title = labels[item.index];
                        }
                    }

                    return title;
                },
                label: (tooltipItem, data) => {
                    return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + this.currentSymbol;
                }
            },
            mode: 'label',
            intersect: false
        },
        hover: {
            mode: 'nearest',
            intersect: true,
            onHover: (event, active) => {
                $('.canvas').mousemove((event) => {
                    if (typeof active[0] === 'undefined') {
                        return;
                    } else {
                        try {
                            this.chartTtDate = this.coinTime[active[0]._index];
                            this.chartTtPrice = this.coinPrices[active[0]._index];
                            var positionLeft = event.pageX - this.chartTooltip.width() / 2 - 390;
                            var positionTop = event.pageY - this.chartTooltip.width() / 2 - 120;
                            $('.tooltip').show().css({ 'position': 'absolute', 'left': positionLeft, 'top': positionTop });
                            this.chartLastIndex = active[0]._index;
                        } catch (error) {
                        }
                    }
                });
            }
        },
        legend: {
            display: false
        },
        elements: {
            line: {
                tension: 0.12
            },
            point: {
                radius: 3.5,
                hoverRadius: 10,
                hitRadius: 120
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
                        fontColor: '#5c4d9f'
                    }
                }],
                yAxes: [{
                    position: 'right',
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        // formating cena
                        callback: (label, index, labels) => {
                            if (label >= 1000) {
                                return this.currentSymbol + ' ' + label / 1000 + 'k';
                            } else {
                                return this.currentSymbol + ' ' + label.toString().substring(0, 6);
                            }
                        },
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
    subCurrentCoin: Subscription;

    chartTooltip;
    chartTtDate;
    chartTtPrice;
    chartLastIndex = 0;

    constructor(private _coins: CoinService,
        private _route: ActivatedRoute) {

    }


    ngOnInit() {
        this.chartTtDate = '';
        this.chartTooltip = $('.tooltip');
        this.setColors();
        this.days = 10; // default
        this.hideToolTip();
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
        this.subCurrentCoin.unsubscribe();
    }

    setColors() {
        // pravljenje gradienta
        let gradient = this.chart.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 450);
        gradient.addColorStop(0, '#a89af065');
        gradient.addColorStop(1, '#291a6c00');
        this.coinChartColors = [
            { // ljubicasta i bela
                backgroundColor: gradient,
                borderColor: '#a99af0',
                pointBackgroundColor: '#a99af0',
                pointBorderColor: '#a99af0',
                pointHoverBackgroundColor: '#a99af0',
                pointHoverBorderColor: '#fff'
            },
        ];
        this.coinChartColors["backgroundColor"] = '#fff';
    }

    getCoinInfo(alias: string) {
        this.subCoinInfo = this._coins.getCoinInfo(alias).subscribe(res => {
            this.setMyCoin(res);
        },
            error => console.log(error),
            () => {
            });
    };

    refreshCoinPrice(sec: number) {
        this.timerPriceRefresh = Observable.timer(sec);
        this.subCoinPriceRefresh = this.timerPriceRefresh.subscribe(() => {
            this.getCoinInfo(this.coinAlias);
        },
            error => console.log(error),
            () => {
                this.setCurrentCoinInfo();
                this.refreshCoinPrice(30000);
                console.log("refreshovnaa cena");
            });
    }

    setMyCoin(res: any) {
        this.myCoin.alias = this.coinAlias;
        this.myCoin.currentPrice = res.RAW[this.myCoin.alias][this._coins.getCurrentCurrency()]["PRICE"];
        this.coinPrices[this.coinPrices.length - 1] = this.myCoin.currentPrice;
        this.coinChartData = [
            { data: this.coinPrices }
        ];
        console.log('chart poslednji: ' + this.coinPrices[this.coinPrices.length - 1] + ' a treba ' + this.myCoin.currentPrice);
    }

    initiateChart() {
        this.timer = Observable.timer(500);
        this.subscription = this.timer.subscribe(() => {
            this.coinChartData = [
                { data: this.coinPrices, labels: this.coinTime }
            ];
        },
            error => console.log(error),
            () => {
                // this.initiateChart();
                $('.progress').fadeOut();
                $('.chart').fadeIn();
                this.percentageDifference = this.calculatePercent();
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
        this._coins.getCoinsPriceHistory(this.coinAlias, this.days).subscribe(res => {
            this.coinData = res.Data; // uzima "Data" gnezdo iz objekta
            console.log("posle uzimanja: " + this.coinData.length);
        },
            error => console.log(error),
            () => { // sve sto se desava nakon uzimanja podataka
                console.log("uzeto: " + this.coinData[10].time + " a " + this.coinData[1].open);
                this.setPriceArray();
                this.setTimeArray();
                this.currentSymbol = this._coins.getCurrentCurrencySymbol();
                this.currentCurrency = this._coins.getCurrentCurrency();
                this.setCurrentCoinInfo();
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
            if (i == this.coinData.length - 1) { // poslednji dodaje trenutnu cenu
                this.coinPrices.push(this.myCoin.currentPrice);
            }
            else {
                this.coinPrices.push(this.coinData[i].open);
            }
            console.log(this.coinPrices[i]);
        }
    }

    clearArrays() {
        this.coinTime = [];
        this.coinPrices = [];
        this.coinData = [];
    }

    setActive(event: any) {
        let chartButtons = document.getElementById("chart-buttons").children;
        for (let i = 0; i < chartButtons.length; i++) {
            chartButtons[i].classList.remove("active");
        }
        event.srcElement.classList.add("active");
    }

    setDays(days: number, event: any) {
        this.setActive(event);
        this.clearArrays();
        this.days = days;
        this.getCoinsHistory();
        this.coinChartLabels = this.coinTime;
        this.coinChartData = [
            { data: this.coinPrices, labels: [] }
        ];
        if (days === 30) {
            this.coinChartOptions.elements.point.hoverRadius = 30;
        }
    }

    calculatePercent(): number {
        return (this.myCoin.currentPrice * 100) / this.coinPrices[0] - 100;
    }

    hideToolTip() {
        $('.tooltip').hide(100);
        this.chartTtDate = '';
    }

    showToolTip() {
        $('.toooltip').fadeIn(200);
        this.chartTtDate = '';
    }

    setCurrentCoinInfo() {
        this.subCurrentCoin = this._coins.getCurrentCoin(this.coinAlias).subscribe(res => {
            this.currentCoin = res;
        }, error => {
            console.log(error);
        },
            () => {
                console.log('uzet trenutni: ' + this.currentCoin.RAW[this.coinAlias][this.currentCurrency]["TYPE"]);
                this.coinSupply = this.currentCoin.RAW[this.coinAlias][this.currentCurrency]['SUPPLY'];
                this.coinMarketCap = this.currentCoin.RAW[this.coinAlias][this.currentCurrency]['MKTCAP'];
                this.coinTotalVolume = this.currentCoin.RAW[this.coinAlias][this.currentCurrency]['TOTALVOLUME24HTO'] - this.currentCoin.RAW[this.coinAlias][this.currentCurrency]['TOTALVOLUME24H'];
                this.coinChange = this.coinPrices[this.coinPrices.length - 1] - this.coinPrices[this.coinPrices.length - 2];
            });
    }

    // events
    chartClicked(e: any) {
        console.log(e); // dodaj neku logiku
    }
}