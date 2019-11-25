import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Componentes */
import { AppComponent } from './app.component';

/* Servicios */
import { ConfiguracionService } from '../app/services/configuracion/configuracionPantalla.service';

/* Componentes Angular Material*/
import { PantallaComponent } from './components/pantalla/pantalla.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { routing, appRoutingProviders } from './app.routing';
import { AuthService } from './services/auth.service';
import { RoutingGuard } from './app.ruotings-guard.class';
import { StartComponent } from './components/start/start.component';
import { WebSocketService } from './services/websocket.service';

@NgModule({
    declarations: [
        AppComponent,
        PantallaComponent,
        MenuComponent,
        StartComponent
    ],
    imports: [
        BrowserModule,
        MatIconModule,
        FormsModule,
        routing,
        HttpClientModule
    ],
    providers: [
        ConfiguracionService,
        appRoutingProviders,
        AuthService,
        RoutingGuard,
        WebSocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
