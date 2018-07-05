import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class RoutingGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) { }

    canActivate() {
        if (this.auth.getToken()) {
            return true;
        } else {
            this.router.navigate(['start']);
            return false;
        }
    }
}
