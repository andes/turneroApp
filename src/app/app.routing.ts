import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { ConfiguracionComponent } from './components/configuracionPantalla/configuracion.component';
import { PantallaComponent } from './components/pantalla/pantalla.component';




const appRoutes: Routes = [
    { path: 'inicio', component: PantallaComponent},
    { path: 'configuracion', component: ConfiguracionComponent },
    { path: '**', redirectTo: 'inicio' }

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
