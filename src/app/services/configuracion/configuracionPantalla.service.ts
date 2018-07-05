import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../../app.settings';

@Injectable()
export class ConfiguracionService {

    private activationURL = AppSettings.API_ENDPOINT + '/modules/turnero/pantalla/activate';
    constructor(private http: HttpClient) { }

    post(config: any) {
        return this.http.post(this.activationURL, config);
    }
}
