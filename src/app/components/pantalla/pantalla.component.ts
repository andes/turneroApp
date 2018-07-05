import { Component, OnInit } from '@angular/core';
import { PantallaService } from '../../services/pantalla/pantalla.service';
import * as moment from 'moment';
import { ConfiguracionService } from '../../services/configuracion/configuracionPantalla.service';
import { WebSocketService } from '../../services/websocket.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-pantalla',
    templateUrl: './pantalla.component.html',
    styleUrls: ['./pantalla.component.css']
})
export class PantallaComponent implements OnInit {
    numero: any = 1;

    turno: any = {
        espacioFisico: null,
        paciente: {
            nombre: null,
            apellido: null
        },
        profesional: {
            nombre: null,
            apellido: null
        },
        tipoPrestacion: null
    };

    paciente: any = {
        nombre: '',
        apellido: ''
    };

    public nombrePantalla;
    public fecha;
    public audio = false;
    public now;
    public turnoAlista;
    public ultimosTurnos = [];
    public cantidadLlamados = 1;

    constructor(
        public ws: WebSocketService,
        public auth: AuthService,
        public configuracionPantallaService: ConfiguracionService
    ) { }

    ngOnInit() {
        moment.locale('es');
        setInterval(() => {
            this.now = moment().format('HH:mm');
        }, 1000);
        this.fecha = moment(new Date()).format('LL');

        this.ws.auth(this.auth.token);

        this.ws.events.subscribe((turno) => {
            console.log(turno);
        })

        // const nombreP = localStorage.getItem('NombrePantalla');


    // this.connection = this.pantallaService.getNumero(pantalla.nombrePantalla).subscribe(turno => {
    //   debugger;
    //   console.log("Numero:  ", turno);
    //   this.paciente.nombre = turno.paciente.nombre;
    //   this.paciente.apellido = turno.paciente.apellido;
    //   // this.numero = numero;
    // });


        // const datosPantalla = {
        //     pantalla: nombreP,
        //     prestaciones: []
        // };

    //     this.configuracionPantallaService.get({ nombrePantalla: nombreP }).subscribe(datos => {

    //   //  this.traeTurnos()
    //     if (datos) {
    //         const prest = datos[0].prestaciones;
    //         prest.forEach(element => {
    //             datosPantalla.prestaciones.push(element.conceptId);
    //         });
    //     }

    //     this.pantallaService.getTurno(datosPantalla).subscribe(turnoEntrante => {

    //     if (this.sinNombre === true) {
    //         if (turnoEntrante.paciente.id === this.turnoAlista.paciente[0].id) {
    //             if (this.cantidadLlamados < 3) {
    //                 this.cantidadLlamados++;
    //             }

    //         } else {
    //             this.cantidadLlamados = 1;
    //         }
    //         const index = this.ultimosTurnos.findIndex(obj => obj.paciente[0].id === this.turnoAlista.paciente[0].id);
    //         if (index === -1) {
    //             if (turnoEntrante.paciente.id !== this.turnoAlista.paciente[0].id) {
    //                 this.ultimosTurnos.push(this.turnoAlista);
    //                 if (this.ultimosTurnos.length === 4) {
    //                     this.ultimosTurnos.splice(0, 1);
    //                 }
    //             }

    //         }
    //     }
    //     this.turno.espacioFisico = '';
    //     if (turnoEntrante) {
    //         this.audio = true;
    //         this.turno.paciente.nombre = turnoEntrante.paciente.nombre;
    //         this.turno.paciente.apellido = turnoEntrante.paciente.apellido;
    //         if (turnoEntrante.profesional) {
    //             this.turno.profesional.nombre = turnoEntrante.profesional.nombre;
    //             this.turno.profesional.apellido = turnoEntrante.profesional.apellido;
    //         } else {
    //             this.turno.profesional.nombre = '';
    //             this.turno.profesional.apellido = '';
    //         }

    //         if (turnoEntrante.espacioFisico) {
    //             this.turno.espacioFisico = turnoEntrante.espacioFisico.nombre;
    //         } else {
    //             this.turno.espacioFisico = 'Consultar';
    //         }



    //         this.turnoAlista = {
    //             horaInicio: turnoEntrante.horaInicio,
    //             horaLlamada: turnoEntrante.horaLlamada,
    //             profesional: [turnoEntrante.profesional],
    //             paciente: [turnoEntrante.paciente],
    //             espacioFisico: this.turno.espacioFisico
    //         };
    //         this.sinNombre = true;

    //     }
    //     setTimeout(() => {
    //         this.audio = false;
    //     }, 2200);

    //   });

    // });

}
// prueba() {
//     this.audio = true;
//     setTimeout(() => {
//         this.audio = false;
//     }, 2200);
// }

// traeTurnos() {

//     this.pantallaService.getTotalTurnos({ limit: 3 }).subscribe(data => {
//         this.ultimosTurnos = data;
//     });
// }




}
