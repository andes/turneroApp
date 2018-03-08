import { Component, OnInit } from '@angular/core';

import { PantallaService } from '../../services/pantalla/pantalla.service';

import { pantalla } from '../../../config.private';
import * as moment from 'moment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'})
export class MenuComponent implements OnInit {

  private fecha;
  public audio = false;
  public now;
  connection;

  ngOnInit() {
    // this.connection = this.pantallaService.getNumero(pantalla.nombrePantalla).subscribe(turno => {
    //   debugger;
    //   console.log("Numero:  ", turno);
    //   this.paciente.nombre = turno.paciente.nombre;
    //   this.paciente.apellido = turno.paciente.apellido;
    //   // this.numero = numero;
    // });


    const timeoutId = setInterval(() => {
      const time = new Date();
      this.now = ('0' + time.getHours()).substr(-2) + ':' + ('0' + time.getMinutes()).substr(-2) ;
      // this.now = ('0'+time.getHours()).substr(-2) +':'+ ('0'+time.getMinutes()).substr(-2) +':'+ ('0'+time.getSeconds()).substr(-2);

    }, 1000);
    moment.locale('es');
    this.fecha = moment(new Date()).format('LL');


  }

  constructor(public pantallaService: PantallaService) { }

}
