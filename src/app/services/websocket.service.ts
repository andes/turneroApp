import { AppSettings } from './../app.settings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as Wildcard from 'socketio-wildcard';

@Injectable()
export class WebSocketService {
    public socket;
    public token = null;
    public events: Observable<any>;

    public messages = ['mostrar-turno'];

    constructor (
        private authService: AuthService,
        private router: Router
    ) {
        let patch = Wildcard(io.Manager);
        this.socket = io(AppSettings.WEBSOCKET_ENDPOINT);
        patch(this.socket);

        this.events = new Observable(observer => {

            this.socket.on('*', packet => {
                let data = packet.data;
                observer.next({ event: data[0], data: data[1] });
            });

            return () => {
                this.socket.disconnect();
            };
        });
        this.socket.on('connect', () => {
            if (this.token) {
                this.auth(this.token);
            }
        });
        this.socket.on('auth', (data) => {
            if (data.status === 'error') {
                this.authService.setToken(null);
                this.router.navigate(['/start']);
            }
        });
    }

    emit(event, data) {
        this.socket.emit(event, data);
    }

    auth (token) {
        this.token = token;
        this.emit('auth', { token });
    }



}
