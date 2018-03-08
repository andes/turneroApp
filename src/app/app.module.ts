import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

/* Componentes */
import { AppComponent } from './app.component';

/* Servicios */
import { PantallaService } from '../app/services/pantalla/pantalla.service';
import { TipoPrestacionService } from '../app/services/pantalla/tipoPrestacion.service';
import { ConfiguracionService } from '../app/services/configuracion/configuracionPantalla.service';


/* Componentes Angular Material*/
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { PantallaComponent } from './components/pantalla/pantalla.component';
import { ConfiguracionComponent } from './components/configuracionPantalla/configuracion.component';
import { MenuComponent } from './components/menu/menu.component'
import {MatIconModule} from '@angular/material/icon';
import { routing, appRoutingProviders } from './app.routing';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    PantallaComponent,
    ConfiguracionComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    FormsModule,
    HttpModule,
    routing,
    HttpClientModule,
    AngularMultiSelectModule
  ],
  providers: [PantallaService,
    TipoPrestacionService,
    ConfiguracionService,
    appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
