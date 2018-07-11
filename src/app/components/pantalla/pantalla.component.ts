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
        id: null,
        espacioFisico: null,
        paciente: {
            nombre: null,
            apellido: null
        },
        profesional: {
            nombre: null,
            apellido: null
        },
        tipoPrestacion: null,
        llamados: 0
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

    get historico () {
        return this.ultimosTurnos.slice(0, 3);
    }

    constructor(
        public ws: WebSocketService,
        public auth: AuthService,
        public configuracionPantallaService: ConfiguracionService
    ) { }

    onTurnoEntrante (turnoEntrante) {
        this.audio = true;

        if (this.turno.id === turnoEntrante.id) {
            this.turno.llamados++;
        } else {

            if (this.turno.id) {
                let historico = JSON.parse(JSON.stringify(this.turno));
                this.ultimosTurnos = [historico, ...this.ultimosTurnos];
            }

            let turno = this.ultimosTurnos.find((t) => t.id === turnoEntrante.id);
            if (turno) {
                turno.llamados++;
                this.turno = JSON.parse(JSON.stringify(turno))

            } else {
                this.turno.id = turnoEntrante.id;
                this.turno.paciente.nombre = turnoEntrante.paciente.nombre;
                this.turno.paciente.apellido = turnoEntrante.paciente.apellido;
                if (turnoEntrante.profesional) {
                    this.turno.profesional.nombre = turnoEntrante.profesional.nombre;
                    this.turno.profesional.apellido = turnoEntrante.profesional.apellido;
                } else {
                    this.turno.profesional.nombre = '';
                    this.turno.profesional.apellido = '';
                }
                this.turno.llamados = 1;
                if (turnoEntrante.espacioFisico) {
                    this.turno.espacioFisico = turnoEntrante.espacioFisico.nombre;
                } else {
                    this.turno.espacioFisico = 'Consultar';
                }
            }

        }

        if (this.ultimosTurnos.length > 20) {
            this.ultimosTurnos.pop();
        }


        setTimeout(() => {
            this.audio = false;
        }, 3000);

    }

    ngOnInit() {
        moment.locale('es');
        setInterval(() => {
            this.now = moment().format('HH:mm');
        }, 1000);
        this.fecha = moment(new Date()).format('LL');

        this.ws.auth(this.auth.token);

        this.ws.events.subscribe((packet) => {
            switch (packet.event) {
                case 'mostrar-turno':
                    this.onTurnoEntrante(packet.data);
                    break;
            }
        })
    }
}
