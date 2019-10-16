import { AppSettings } from './../app.settings';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as Wildcard from 'socketio-wildcard';

@Injectable()
export class WebSocketService {
    public autheticated = false;
    public socket;
    public token = null;
    public events: Subject<any>;
    public rooms: String[] = [];

    constructor (
        private authService: AuthService,
        private router: Router
    ) {
        const patch = Wildcard(io.Manager);
        this.socket = io(AppSettings.WEBSOCKET_ENDPOINT);
        patch(this.socket);
        this.events = new Subject();

        this.socket.on('*', packet => {
            const data = packet.data;
            this.events.next({ event: data[0], data: data[1] });
        });


        this.socket.on('connect', () => {
            if (this.token) {
                this.emitAuth();
            }
        });

        this.socket.on('disconnect', () => {
            this.autheticated = false;
        });

        this.socket.on('auth', (data) => {
            if (data.status !== 'error') {
                this.autheticated = true;
                this.rooms.forEach((room) => {
                    this.socket.emit('room', { name: room });
                });
            } else {
                this.authService.setToken(null);
                this.router.navigate(['/start']);
            }
        });
    }

    emit(event, data) {
        this.socket.emit(event, data);
    }


    setToken(token) {
        this.token = token;
    }

    emitAuth () {
        this.emit('auth', { token: this.token });
    }

    join (room) {
        const index = this.rooms.findIndex(name => name === room);
        if (index < 0) {
            this.rooms.push(room);
            if (this.autheticated) {
                this.socket.emit('room', { name: room });
            }
        }
    }

    leave (room) {
        this.emit('leave', { name: room });
        const index = this.rooms.findIndex(name => name === room);
        if (index < 0) {
            this.rooms.splice(index, 1);
        }
    }

    close () {
        this.token = null;
        this.socket.close();
        this.socket.open();
    }

}
