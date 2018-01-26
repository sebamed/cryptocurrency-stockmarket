import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
   
   
    ngOnInit() {
        console.log("Favourites radi");
    }
}