import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from '../../services/configuracion/configuracionPantalla.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-start',
    templateUrl: './start.html',
    styleUrls: ['start.scss']
})
export class StartComponent implements OnInit {
    public codigo = '';

    constructor(
        public configScreen: ConfiguracionService,
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    ingresar() {
        this.configScreen.activate({codigo: this.codigo}).subscribe((body: any) => {
            this.auth.setToken(body.token);
            this.router.navigate(['/inicio']);
        });
    }

}
