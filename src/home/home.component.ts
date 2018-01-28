import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { RandomText } from '../services/random-text.service';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    PageTitle: String;

    subscription: Subscription;
    timer: Observable<any>;
    randomText: string;

    constructor(private _random: RandomText){
        
    }

    ngOnInit() {
        this.PageTitle = 'Cryptocurrency Stock Market';
        this.randomText = this._random.getRandomText(this.randomText);
        this.getRandomText();
    }

    getRandomText(){
        this.timer = Observable.timer(20000); // 20 sec
        this.subscription = this.timer.subscribe(() => {
            this.randomText = this._random.getRandomText(this.randomText);
            console.log(this.randomText);
            this.getRandomText();
        });
    }
}