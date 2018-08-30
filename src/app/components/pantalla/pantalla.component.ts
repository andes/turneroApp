import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ConfiguracionService } from '../../services/configuracion/configuracionPantalla.service';
import { WebSocketService } from '../../services/websocket.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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

    public playListUrl;
    public pantalla;
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
        private router: Router,
        public configuracionPantallaService: ConfiguracionService,
        public pantallaService: ConfiguracionService,
        public domSanitizer: DomSanitizer
    ) { }

    get showVideo () {
        return this.pantalla && this.pantalla.playlist && this.pantalla.playlist.length;
    }

    onTurnoEntrante (turnoEntrante) {
        this.audio = true;

        if (this.turno.id === turnoEntrante.id) {
            this.turno.llamados++;
        } else {

            if (this.turno.id) {
                const historico = JSON.parse(JSON.stringify(this.turno));
                this.ultimosTurnos = [historico, ...this.ultimosTurnos];
            }

            const turno = this.ultimosTurnos.find((t) => t.id === turnoEntrante.id);
            if (turno) {
                turno.llamados++;
                this.turno = JSON.parse(JSON.stringify(turno));

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

        this.ws.setToken(this.auth.token);
        this.ws.emitAuth();

        this.ws.events.subscribe((packet) => {
            switch (packet.event) {
                case 'mostrar-turno':
                    this.onTurnoEntrante(packet.data);
                    break;
                case 'turnero-update':
                    this.pantalla = packet.data.pantalla;
                    if (this.pantalla.playlist) {
                        this.playListUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/videoseries?list=${this.pantalla.playlist}&autoplay=1`);
                    }
                    break;
            }
        });

        this.pantallaService.detalle(this.auth.id).subscribe((pantalla) => {
            this.pantalla = pantalla;
            this.playListUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/videoseries?list=${this.pantalla.playlist}&autoplay=1`);
        }, (e) => {
            if (e.status === 401) {
                this.auth.setToken(null);
                this.router.navigate(['/start']);
            }
        });
    }
}
