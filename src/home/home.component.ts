import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    PageTitle: String;

    constructor(){
        
    }

    ngOnInit() {
        this.PageTitle = 'Cryptocurrency Stock Market';
    }
}