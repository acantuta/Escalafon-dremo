import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service'; // Assuming you have an AuthService
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Allow access if authenticated
  } else {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false;
  }
};
