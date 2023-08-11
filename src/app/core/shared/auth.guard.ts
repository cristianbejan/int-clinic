import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const patientAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      if (!user) {
        router.navigate(['login']);
      }

      if (user?.role === 'doctor') {
        router.navigate(['homepage']);
      }

      return user?.role === 'patient' || user?.role === 'admin';
    })
  );
};

export const patientAuthGuardChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
  patientAuthGuard(route, state);

export const doctorAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      if (user && user.role === 'doctor') {
        return true;
      } else if (user && user.role === 'admin') {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    })
  );
};

export const doctorAuthGuardChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
  doctorAuthGuard(route, state);

export const adminAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      if (user && user.role === 'admin') {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    })
  );
};

export const adminAuthGuardChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
  adminAuthGuard(route, state);
