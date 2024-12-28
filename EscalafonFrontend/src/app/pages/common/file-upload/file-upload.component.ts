import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  selectedFolio: string = '';
  folios: string[] = ['Folio1', 'Folio2', 'Folio3']; // Ejemplo de opciones
  isFileRequired: boolean = true; // Cambia esto según tus necesidades
  isFolioRequired: boolean = true; // Cambia esto según tus necesidades

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.uploadFile(file);
    }
}

uploadFile(file: File): void {
    console.log('Uploading file:', file.name);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folio', this.selectedFolio);

    this.http.post('/archivo', formData).subscribe(
      (response) => {
        console.log('Archivo subido con éxito:', response);
        alert('Archivo subido con éxito.');
      },
      (error) => {
        console.error('Error al subir el archivo:', error);
        alert('Error al subir el archivo.');
      }
    );
}
}
