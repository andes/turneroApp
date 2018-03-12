import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './../../app.settings';

import * as io from 'socket.io-client';
import { debug } from 'util';

@Injectable()
export class PantallaService {

  // private urlPersona = 'http://192.168.0.126:3002/api/modules/socket';

  private url = 'http://192.168.0.130:3002';
  private socket;
  private totalTurnos = AppSettings.API_ENDPOINT + '/modules/turnero/busqueda';  // URL to web api
  
  constructor(private http: HttpClient) {

  }

//   getTurno(datos): any {
//     console.log(datos)
//     let observable = new Observable(observer => {
//         this.socket = io(this.url);

//             this.socket.emit('datosPantalla', datos);

//         this.socket.on(datos.pantalla, (data) => {
//             observer.next(data);
//         });

//         return () => {
//             this.socket.disconnect();
//         };
//     });
//     return observable;
// }
getTurno(datos): any {
    let observable = new Observable(observer => {
        this.socket = io(this.url);
        // let's assume that the client page, once rendered, knows what room it wants to join
        var room = "pantalla1";

        this.socket.data = "hola";
        // Connected, let's sign-up for to receive messages for this room
        this.socket.emit('room', datos);
        this.socket.on('muestraTurno', (data) => {
            observer.next(data);
        });

        return () => {
            this.socket.disconnect();
        };
    });
    return observable;
}


getTotalTurnos(params): any {
    return this.http.get(this.totalTurnos,{params: params});
    
}


  // getNumero(nombrePantalla: any): any {
  //   let observable = new Observable(observer => {
  //     debugger;
  //     this.socket = io(this.url, { query: 'pantalla=' + nombrePantalla });
  //     this.socket.on(nombrePantalla, (data) => {
  //       observer.next(data);
  //     });

  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //   return observable;
  // }

}
