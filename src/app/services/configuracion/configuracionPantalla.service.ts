import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../../app.settings';
// import { Server } from '@andes/shared';

@Injectable()
export class ConfiguracionService {

    private configuracionUrl = AppSettings.API_ENDPOINT + '/modules/turnero/insertConfiguracion';  // URL to web api
    private configuracionGetUrl = AppSettings.API_ENDPOINT + '/modules/turnero/busquedaConfiguracion';
    constructor(private http: HttpClient) { }

    /**
     * Metodo get. Trae el objeto tipoPrestacion.
     * @param {any} params Opciones de busqueda
     */
    get(params?: any): any {
        return this.http.get(this.configuracionGetUrl, {params: params});
    }

    post(config: any) {
        return this.http.post(this.configuracionUrl, config);
    }
}
