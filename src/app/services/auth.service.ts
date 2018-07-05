import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    public token = '';

    constructor () {
        this.token = localStorage.getItem('token');
    }

    setToken (value) {
        localStorage.setItem('token', value);
        this.token = value;
    }

    getToken () {
        return this.token;
    }

}
