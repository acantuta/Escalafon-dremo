import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Archivo } from '../../interfaces/archivo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ConfigService } from '../../core/services/config.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-archivo-handler',
  templateUrl: './archivo-handler.component.html',
  styleUrls: ['./archivo-handler.component.css']
})
export class ArchivoHandlerComponent {
  @Input() maxFileSize: number = 5; // En MB
  @Input() allowedExtensions: string[] = ['.pdf'];
  @Input() containerClass: string = 'w-1/2';
  @Input() required: boolean = false;
  @Input() showFolios: boolean = true; // Nuevo Input para controlar la visibilidad de folios
  @Input() set archivoId(value: number | null) {
    if (value === this.archivoActual?.iArchId) {
      return;
    }

    if (!value) {
      this.limpiar();
      return;
    }

    this.uploading = true;
    this.cdr.detectChanges();

    this.http.get<any>(`/archivo-handler/${value}`).pipe(
      finalize(() => {
        this.uploading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (response) => {
        if (response.status) {
          this.archivoActual = {
            iArchId: response.data.iArchId,
            iArchFolios: response.data.iArchFolios,
            cArchExtension: response.data.cArchExtension,
            cArchUuid: response.data.cArchUuid
          };
          
          this.archivoForm.patchValue({
            iFolios: response.data.iArchFolios
          }, { emitEvent: false });

          if (response.data.cArchUuid) {
            this.fileUrl = this.configService.getArchivoDownloadUrl(response.data.cArchUuid);
            this.fileUrlChange.emit(this.fileUrl);
          } else {
            this.fileUrl = '';
            this.fileUrlChange.emit('');
          }

          console.log('Folios cargados:', response.data.iArchFolios);
        }
      },
      error: (error) => {
        console.error('Error al obtener archivo:', error);
        this.uploading = false;
      }
    });
  }
  @Output() archivoSeleccionado = new EventEmitter<Archivo>();
  @Output() iArchId = new EventEmitter<number | undefined>();
  @Output() archivo = new EventEmitter<Archivo>();
  @Output() fileUrlChange = new EventEmitter<string>();

  archivoForm: FormGroup;
  selectedFile?: File;
  uploadProgress: number = 0;
  uploading: boolean = false;
  archivoActual?: Archivo;
  fileUrl: string = '';
  private touched: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.archivoForm = this.fb.group({
      iFolios: [null],
    });
  }

  onFileSelected(event: any): void {
    this.markAsTouched();
    const fileInput = event.target;
    
    const file = fileInput.files[0];
    if (file) {
        console.log('Detalles del archivo:', {
            nombre: file.name,
            tipo: file.type,
            tamaño: file.size,
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            webkitRelativePath: file.webkitRelativePath
        });

        if (file.size > this.maxFileSize * 1024 * 1024) {
            this.snackBar.open(`El archivo no debe superar ${this.maxFileSize}MB`, 'Cerrar', {
                duration: 3000
            });
            return;
        }

        // Verificar el tipo de archivo según las extensiones permitidas
        const isValidType = this.allowedExtensions.some(ext => {
            switch (ext.toLowerCase()) {
                case '.pdf':
                    return file.type === 'application/pdf';
                case '.jpg':
                case '.jpeg':
                    return file.type === 'image/jpeg';
                case '.png':
                    return file.type === 'image/png';
                default:
                    return false;
            }
        });

        if (!isValidType) {
            this.snackBar.open(`Solo se permiten archivos: ${this.allowedExtensions.join(', ')}`, 'Cerrar', {
                duration: 3000
            });
            return;
        }

        const extension = file.name.toLowerCase().slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
        if (!this.allowedExtensions.includes(`.${extension}`)) {
            this.snackBar.open(`Solo se permiten archivos: ${this.allowedExtensions.join(', ')}`, 'Cerrar', {
                duration: 3000
            });
            return;
        }

        this.selectedFile = file;
        this.subirArchivo();
    }

    // Limpiar el input después de procesar el archivo
    fileInput.value = '';
  }

  subirArchivo(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('archivo', this.selectedFile);
    if (this.showFolios) {
      formData.append('iFolios', this.archivoForm.get('iFolios')?.value || '1');
    } else {
      formData.append('iFolios', '1');
    }

    this.uploading = true;
    this.uploadProgress = 0;

    this.archivoActual = undefined;
    this.iArchId.emit(undefined);
    this.fileUrl = '';
    this.fileUrlChange.emit('');

    this.http.post<any>(this.configService.getArchivoUploadUrl(), formData, {
      reportProgress: true,
      observe: 'events',
      headers: {
        Accept: 'application/json'
      }
    })
    .pipe(
      finalize(() => {
        this.uploading = false;
        this.uploadProgress = 0;
      })
    )
    .subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        }
        
        if (event.type === HttpEventType.Response) {
          if (event.body?.status) {
            const archivo: Archivo = {
              iArchId: event.body.data.iArchId,
              iArchFolios: event.body.data.iArchFolios,
              cArchExtension: event.body.data.cArchExtension,
              cArchUuid: event.body.data.cArchUuid
            };
            
            this.archivoActual = archivo;
            
            this.archivoForm.patchValue({
              iFolios: archivo.iArchFolios
            }, { emitEvent: false });

            if (archivo.cArchUuid) {
              this.fileUrl = this.configService.getArchivoDownloadUrl(archivo.cArchUuid);
              this.fileUrlChange.emit(this.fileUrl);
            } else {
              this.fileUrl = '';
              this.fileUrlChange.emit('');
            }

            this.iArchId.emit(archivo.iArchId);
            this.archivoSeleccionado.emit(archivo);
            this.archivo.emit(archivo);

            this.snackBar.open('Archivo subido correctamente', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          } else {
            throw new Error(event.body?.message || 'Error al subir el archivo');
          }
        }
      },
      error: (error: any) => {
        console.error('Error completo:', error);
        this.uploading = false;
        let mensaje = 'Error al subir el archivo';
        if (error.error?.message) {
          mensaje = error.error.message;
        } else if (error.message) {
          mensaje = error.message;
        }
        this.snackBar.open(mensaje, 'Cerrar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      }
    });
  }

  descargarArchivo(): void {
    if (!this.archivoActual?.cArchUuid) return;
    
    const url = this.configService.getArchivoDownloadUrl(this.archivoActual.cArchUuid);
    const token = this.authService.getToken();
    
    // Agregar el token como parámetro de consulta
    const urlWithToken = `${url}?token=${token}`;
    
    // Abrir en nueva pestaña
    window.open(urlWithToken, '_blank');
  }

  limpiar(): void {
    this.touched = false;
    this.selectedFile = undefined;
    this.archivoActual = undefined;
    this.uploadProgress = 0;
    this.uploading = false;
    this.fileUrl = '';
    this.fileUrlChange.emit('');

    this.archivoForm.reset({
      iFolios: null,
    }, {
      emitEvent: false,
      onlySelf: true
    });

    // Emitir los eventos de limpieza
    this.archivo.emit(undefined);
    this.archivoSeleccionado.emit(undefined);
    this.iArchId.emit(undefined);
  }

  onFoliosBlur(): void {
    if (this.archivoActual) {
      const folios = this.archivoForm.get('iFolios')?.value;
      
      // Llamada al backend para actualizar folios
      this.http.put<any>(`/archivo-handler/${this.archivoActual.iArchId}`, {
        iArchFolios: folios
      }).subscribe({
        next: (response) => {
          if (response.status) {
            // Actualizar el archivo actual
            this.archivoActual = {
              ...this.archivoActual,
              iArchFolios: folios
            };

            // Emitir el archivo actualizado
            if (this.archivoSeleccionado.observers.length > 0) {
              this.archivoSeleccionado.emit(this.archivoActual);
            }
            if (this.archivo.observers.length > 0) {
              this.archivo.emit(this.archivoActual);
            }

            this.snackBar.open('Folios actualizados correctamente', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          }
        },
        error: (error) => {
          console.error('Error al actualizar folios:', error);
          this.snackBar.open('Error al actualizar folios', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  // Método para verificar si el campo es válido
  get isValid(): boolean {
    return !this.required || (this.selectedFile !== undefined || this.archivoActual !== undefined);
  }

  // Método para verificar si debe mostrar error
  get showError(): boolean {
    return this.touched && this.required && !this.selectedFile && !this.archivoActual;
  }

  // Agregar método para marcar como tocado
  markAsTouched(): void {
    this.touched = true;
  }
} 