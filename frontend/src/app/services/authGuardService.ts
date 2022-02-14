import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './authService';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this
    .authService
    .estConnecte()
    .pipe(
      first(),
      tap(connecte => {
        if (!connecte)
        {
          this.router.navigateByUrl('/auth')
        }
      })
    )
  }
}
