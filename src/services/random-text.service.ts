import { Injectable } from '@angular/core';

@Injectable()
export class RandomText {

    randomText: string[] = [
        'Updates every 30 seconds',
        'Latest prices on stock market',
        'Information gathered from CoinCompare API',
        'Design heavily inspired by CoinRanking'
    ];

    getRandomText(current: string){
        let rand = Math.floor((Math.random() * this.randomText.length));
        while (current === this.randomText[rand]){
            rand = Math.floor((Math.random() * this.randomText.length));
        }
        return this.randomText[rand];
    }

}