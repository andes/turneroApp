import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './../../app.settings';


@Injectable()
export class TipoPrestacionService {

    private tipoPrestacionUrl = AppSettings.API_ENDPOINT + '/core/tm/tiposPrestaciones';  // URL to web api

    constructor(private http: HttpClient) { }

    /**
     * Metodo get. Trae el objeto tipoPrestacion.
     * @param {any} params Opciones de busqueda
     */
    get(params: any) {
        return this.http.get(this.tipoPrestacionUrl, { params: params});
    }

}
