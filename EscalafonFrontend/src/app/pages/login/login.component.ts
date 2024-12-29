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

interface AuthResponse {
  status: string;
  access_token?: string;
  message?: string;
}

interface VerificationResponse {
  status: string;
  access_token?: string;
  message?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  verificationCode: string = '';
  hidePassword: boolean = true;
  loading: boolean = false;
  showVerificationForm: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar,
    public configService: ConfigService
  ) {}

  login(): void {
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
      next: (response: AuthResponse) => {
        this.loading = false;
        if (response.status === 'success') {
          this.authService.setToken(response.access_token!);
          this.router.navigate(['/principal/dashboard']);
        } else if (response.status === 'pending_verification') {
          this.showVerificationForm = true;
          this.showMessage('Se ha enviado un código de verificación');
        } else {
          this.showError(response.message || 'Error al iniciar sesión');
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.handleError(error);
      }
    });
  }

  verifyCode(): void {
    if (!this.verificationCode) {
      this.showError('Por favor, ingrese el código de verificación');
      return;
    }

    this.loading = true;
    this.authService.verifyCode(this.username, this.verificationCode).subscribe({
      next: (response: VerificationResponse) => {
        this.loading = false;
        if (response.status === 'success') {
          this.authService.setToken(response.access_token!);
          this.router.navigate(['/principal/dashboard']);
        } else {
          this.showError(response.message || 'Error al verificar el código');
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.handleError(error);
      }
    });
  }

  private handleError(error: any): void {
    if (error.error && error.error.status === 'error') {
      const errorResponse = error.error as ErrorResponse;
      
      if (errorResponse.errors) {
        const firstError = Object.values(errorResponse.errors)[0];
        this.showError(firstError[0]);
      } else {
        this.showError(errorResponse.message || 'Error al iniciar sesión');
      }
    } else {
      this.showError('Error de conexión. Por favor, intente nuevamente.');
    }
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
