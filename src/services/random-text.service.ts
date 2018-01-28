import { Injectable } from '@angular/core';

@Injectable()
export class RandomText {

    randomText: string[] = [
        'Updates every 30 seconds',
        'Neki random text 1',
        'Neki random text 2',
        'Neki random text 3'
    ]

    getRandomText(current: string){
        let rand = Math.floor((Math.random() * this.randomText.length));
        while (current === this.randomText[rand]){
            rand = Math.floor((Math.random() * this.randomText.length));
        }
        return this.randomText[rand];
    }

}