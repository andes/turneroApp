import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PantallaComponent } from './components/pantalla/pantalla.component';
import { RoutingGuard } from './app.ruotings-guard.class';
import { StartComponent } from './components/start/start.component';

const appRoutes: Routes = [
    { path: 'inicio', component: PantallaComponent, canActivate: [RoutingGuard]},
    { path: 'start', component: StartComponent },
    { path: '**', redirectTo: 'inicio' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
