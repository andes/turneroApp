import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './../../app.settings';

import * as io from 'socket.io-client';

@Injectable()
export class PantallaService {
    private socket;
    private totalTurnos = AppSettings.API_ENDPOINT + '/modules/turnero/busqueda';  // URL to web api

    constructor(private http: HttpClient) {

    }

    getTurno(datos): any {
        const observable = new Observable(observer => {
            this.socket = io(AppSettings.WEBSOCKET_ENDPOINT);
            this.socket.emit('room', datos);
            this.socket.on('muestraTurno', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }


    getTotalTurnos(params): any {
        return this.http.get(this.totalTurnos, {params: params});
    }




}
