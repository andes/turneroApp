import { AppSettings } from './../app.settings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

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
        this.socket = io(AppSettings.WEBSOCKET_ENDPOINT);
        this.events = new Observable(observer => {

            this.messages.forEach((event) => {
                this.socket.on(event, (data) => {
                    observer.next({event, data});
                });
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
