import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../../app.settings';
import { AuthService } from '../auth.service';

@Injectable()
export class ConfiguracionService {

    private activationURL = AppSettings.API_ENDPOINT + '/modules/turnero/pantalla';
    constructor(private http: HttpClient, private auth: AuthService) { }

    activate(params: any) {
        return this.http.post(`${this.activationURL}/activate`, params);
    }

    detalle(id): any {
        return this.http.get(`${this.activationURL}/${id}`, {
            headers: {
                Authorization: `JWT ${this.auth.token}`
            }
        });
    }
}
