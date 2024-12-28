import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from '../../core/services/config.service';

interface ErrorResponse {
  status: string;
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hidePassword: boolean = true;
  loading: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar,
    public configService: ConfigService
  ) {}

  login() {
    if (!this.username || !this.password) {
      this.showError('Por favor, complete todos los campos');
      return;
    }

    this.loading = true;
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status === 'success') {
          this.authService.setToken(response.access_token);
          this.router.navigate(['/principal/dashboard']);
        } else {
          this.showError(response.message || 'Error al iniciar sesión');
        }
      },
      error: (error) => {
        this.loading = false;
        if (error.error && error.error.status === 'error') {
          const errorResponse = error.error as ErrorResponse;
          
          if (errorResponse.errors) {
            // Si hay errores específicos, mostrar el primero
            const firstError = Object.values(errorResponse.errors)[0];
            this.showError(firstError[0]);
          } else {
            // Si no hay errores específicos, mostrar el mensaje general
            this.showError(errorResponse.message || 'Error al iniciar sesión');
          }
        } else {
          // Error genérico
          this.showError('Error de conexión. Por favor, intente nuevamente.');
        }
      }
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}
