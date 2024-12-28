import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error inesperado';
    let errorDetails = '';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Error de conexión: ' + error.error.message;
    } else {
      if (error.error) {
        if (error.error.mensaje) {
          errorMessage = error.error.mensaje;
          
          if (error.error.errores) {
            errorDetails = Object.entries(error.error.errores)
              .map(([campo, mensajes]) => {
                const mensaje = Array.isArray(mensajes) ? mensajes[0] : mensajes;
                return `${campo}: ${mensaje}`;
              })
              .join('\n');
          }
        }
      } else {
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else {
          switch (error.status) {
            case 400:
              errorMessage = 'Solicitud incorrecta';
              break;
            case 401:
              errorMessage = 'No autorizado';
              break;
            case 403:
              errorMessage = 'Acceso denegado';
              break;
            case 404:
              errorMessage = 'Recurso no encontrado';
              break;
            case 500:
              errorMessage = 'Error interno del servidor';
              break;
            default:
              errorMessage = `Error ${error.status}: ${error.message}`;
          }
        }
      }
    }

    this.snackBar.open(errorMessage, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });

    this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      data: {
        message: errorMessage,
        details: errorDetails,
        status: error.status
      }
    });

    console.group('Error Details');
    console.error('Message:', errorMessage);
    console.error('Status:', error.status);
    console.error('Status Text:', error.statusText);
    console.error('URL:', error.url);
    console.error('Error object:', error.error);
    console.groupEnd();
  }
}