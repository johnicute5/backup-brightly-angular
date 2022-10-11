import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageToken: LocalstorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();
    if (token) {
      if (this.router.url.includes('cart')) {
        return true;
      } else {
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
        if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp))
          return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
