import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AuthService {
    private jwtHelper = new JwtHelper();
    public token = '';
    public id: String;

    constructor () {
        this.token = localStorage.getItem('token');
        this.setToken(this.token);
    }

    setToken (value) {
        localStorage.setItem('token', value);
        this.token = value;
        try {
            if (!this.jwtHelper.isTokenExpired(this.token)) {
                // Guarda el token para futura referencia
                window.sessionStorage.setItem('jwt', this.token);
                // Obtiene datos del usuario y permisos desde el token
                let payload = this.jwtHelper.decodeToken(this.token);
                this.id = payload.app.id;
            }
        } catch (e) {

        }
    }

    getToken () {
        return this.token;
    }

}
