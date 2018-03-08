import { ITipoPrestacion } from './../../interfaces/ITipoPrestacion';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AppSettings } from './../../app.settings';
 import { environment } from '../../../environments/environment';
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

    // /**
    //  * Metodo getById. Trae el objeto tipoPrestacion por su Id.
    //  * @param {String} id Busca por Id
    //  */
    // getById(id: String): Observable<ITipoPrestacion> {
    //     return this.server.get(this.tipoPrestacionUrl + '/' + id, null);
    // }
    // /**
    //  * Metodo post. Inserta un objeto tipoPrestacion nuevo.
    //  * @param {ITipoPrestacion} tipoPrestacion Recibe ITipoPrestacion
    //  */
    post(config: any) {
        return this.http.post(this.configuracionUrl, config);
    }
    // /**
    //  * Metodo put. Actualiza un objeto tipoPrestacion nuevo.
    //  * @param {ITipoPrestacion} tipoPrestacion Recibe ITipoPrestacion
    //  */
    // put(tipoPrestacion: ITipoPrestacion): Observable<ITipoPrestacion> {
    //     return this.server.put(this.tipoPrestacionUrl + '/' + tipoPrestacion.id, tipoPrestacion);
    // }
    // /**
    //  * Metodo disable. deshabilita tipoPrestacion.
    //  * @param {ITipoPrestacion} tipoPrestacion Recibe ITipoPrestacion
    //  */
    // disable(tipoPrestacion: ITipoPrestacion): Observable<ITipoPrestacion> {
    //     return this.put(tipoPrestacion);
    // }
    // /**
    //  * Metodo enable. habilita tipoPrestacion.
    //  * @param {ITipoPrestacion} tipoPrestacion Recibe ITipoPrestacion
    //  */
    // enable(tipoPrestacion: ITipoPrestacion): Observable<ITipoPrestacion> {
    //     return this.put(tipoPrestacion);
    // }
}
