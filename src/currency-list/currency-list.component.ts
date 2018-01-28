import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CoinService } from '../services/coins.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { RandomText } from '../services/random-text.service';

declare var $: any;

@Component({
    selector: 'app-currency-list',
    templateUrl: './currency-list.component.html',
    styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

    coins: any;
    objectKeys = Object.keys;

    loaded: boolean;
    subscription: Subscription;
    timer: Observable<any>;

    scrolled: boolean;

    constructor(private _coins: CoinService) {

    }

    ngOnInit() {
        this.loaded = false;
        this.scrolled = false;
        this._coins.getCoins().subscribe(res => {
            this.coins = res;
            //console.log(res);
        },
            error => {
                console.log(error);
            },
            () => {
                this.setTimer();
                console.log("loadovano");
            }
        );
        $('.fixed-action-btn').hide();
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $('.fixed-action-btn').fadeIn();
            } else {
                $('.fixed-action-btn').fadeOut();
            }
        });
        this.refreshData();
    }

    setTimer() {
        this.timer = Observable.timer(500);
        this.subscription = this.timer.subscribe(() => {
            this.loaded = true;
        });
    }

    scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    }

    refreshData() {
        this.timer = Observable.timer(30000); // 30 sekundi
        this.subscription = this.timer.subscribe(() => {
            console.log("Refresovano");
            this._coins.getCoins().subscribe(res => {
                this.coins = res;
                //console.log(res);
            });
            this.refreshData();
        });
    }

    checkPercent(perc: number){
        if(perc >= 0){
            return true;
        } else {
            return false;
        }
    }
}