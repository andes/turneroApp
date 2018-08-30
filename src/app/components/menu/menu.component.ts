import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {
    public fecha;
    public now;
    timeoutId;

    constructor() { }

    ngOnInit() {
        moment.locale('es');

        this.timeoutId = setInterval(() => {
            this.now = moment().format('HH:mm') ;
        }, 1000);
        this.fecha = moment(new Date()).format('LL');
    }

    ngOnDestroy () {
        clearInterval(this.timeoutId)
    }


}
