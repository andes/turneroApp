import { Component, OnInit } from '@angular/core';
import { PantallaService } from '../../services/pantalla/pantalla.service';
import { TipoPrestacionService } from '../../services/pantalla/tipoPrestacion.service';
import { ConfiguracionService } from '../../services/configuracion/configuracionPantalla.service';

declare var jquery: any;
declare var $: any;


@Component({
    selector: 'app-pantalla-configuracion',
    templateUrl: './configuracion.html'
})


export class ConfiguracionComponent implements OnInit {
    public prestaciones: any = ['prestacion1', 'prestacion2', 'prestacion3'];
    public prestacionesSelect = [];
    public config = {
        nombrePantalla: 'pantalla_5',
        prestaciones: null
    };

    public listadoPantallas: any;
    public nombrePantalla;
    public inputBusqueda = '';
    public limit = 5;
    public pantallaSelect;
    public nuevaPantalla;
    ngOnInit() {
        $(document).ready(function() {
        // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();

        });
        this.nombrePantalla = localStorage.getItem('NombrePantalla');
        this.traePantallas();
        this.configuracionPantallaService.get({ nombrePantalla: this.nombrePantalla }).subscribe(datos => {


        if (datos.length > 0) {

            this.config = datos[0];
            this.prestacionesSelect = datos[0].prestaciones;
        }
            // this.limit = this.limit + this.prestacionesSelect.length;
            this.loadTipoPrestaciones();

        });




    }

    constructor(
        public pantallaService: PantallaService,
        public servicioTipoPrestacion: TipoPrestacionService,
        public configuracionPantallaService: ConfiguracionService) { }

    traeListado() {

    }

    seleccionar(prestacion) {
        this.prestacionesSelect.push(prestacion);
        this.config.prestaciones = this.prestacionesSelect;
        this.configuracionPantallaService.post(this.config).subscribe();
        this.loadTipoPrestaciones();
    }

    baja(index) {
        this.prestacionesSelect.splice(index, 1);
        this.config.prestaciones = this.prestacionesSelect;
        this.configuracionPantallaService.post(this.config).subscribe();
        this.loadTipoPrestaciones();
        // this.limit = 6;
    }

    buscar() {

    }

    loadTipoPrestaciones(event?: any) {

        // if (this.inputBusqueda !== '') {
        //   this.limit = 5;
        // }


        this.servicioTipoPrestacion.get({ turneable: 1, limit: this.limit, termTurnero: this.inputBusqueda }).subscribe((data: any) => {
            this.prestaciones = data;
            if (this.prestacionesSelect.length > 0) {
                this.prestacionesSelect.forEach(element => {
                    this.prestaciones.forEach((entrante, index: any) => {
                        if (element.term === entrante.term) {
                            this.prestaciones[index].seleccionada = true;
                            if (this.limit < 6) {
                                this.limit = this.limit + 1;
                            }
                        }
                    });
                });
            }
        });
    }


    cambioNombrePantalla(pantalla?) {
        localStorage.setItem('NombrePantalla', pantalla);
        this.configuracionPantallaService.get({ nombrePantalla: pantalla }).subscribe(datos => {
            if (datos.length > 0) {
                this.config = datos[0];
                this.prestacionesSelect = datos[0].prestaciones;
            } else {
                this.prestacionesSelect = [];
            }
            this.nombrePantalla = pantalla;
            this.loadTipoPrestaciones();
        });
    }


    traePantallas() {
        this.configuracionPantallaService.get().subscribe(datos => {
            this.listadoPantallas = datos;
        });
    }


    agregarPantalla() {
        const nuevaP = {
            nombrePantalla: 'pantalla_' + this.nuevaPantalla,
            prestaciones: []
        };
        this.configuracionPantallaService.post(nuevaP).subscribe(data => {
            if (data === null) {
                $('.modal').modal();
                $('#modal2').modal('open');
            }

            this.traePantallas();
        });

    }
}
