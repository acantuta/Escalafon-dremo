import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginatedRequest } from '../core/interfaces/paginated-request';
import { InfopefamiliarDeclaracionJurada } from '../interfaces/infopefamiliar-declaracion-jurada';
import { PaginatedResponse } from '../core/interfaces/paginated-response';
import { ApiResponse } from '../core/interfaces/api-response';
import { GetAllFilterParams } from '../core/interfaces/get-all-filter-params';
import { ErrorHandlerService } from '../core/services/error-handler-service';

@Injectable({
    providedIn: 'root'
})
export class InfopefamiliarDeclaracionJuradaService {
    private readonly apiUrl = `/infopefamiliar-declaraciones-juradas`;

    constructor(
        private readonly http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) {}

    getAll(params?: GetAllFilterParams): Observable<InfopefamiliarDeclaracionJurada[]> {
        let httpParams = new HttpParams();
        if (params?.campo && params?.valor) {
            httpParams = httpParams
                .set('campo', params.campo)
                .set('valor', params.valor);
        }

        return this.http.get<PaginatedResponse<InfopefamiliarDeclaracionJurada>>(this.apiUrl, { params: httpParams })
            .pipe(
                map(response => response.data),
                catchError(this.handleError)
            );
    }

    getById(id: number): Observable<InfopefamiliarDeclaracionJurada> {
        return this.http.get<ApiResponse<InfopefamiliarDeclaracionJurada>>(`${this.apiUrl}/${id}`)
            .pipe(
                map(response => response.data),
                catchError(this.handleError)
            );
    }

    create(data: Omit<InfopefamiliarDeclaracionJurada, 'id'>): Observable<InfopefamiliarDeclaracionJurada> {
        return this.http.post<ApiResponse<InfopefamiliarDeclaracionJurada>>(this.apiUrl, data)
            .pipe(
                map(response => response.data),
                catchError(this.handleError)
            );
    }

    update(id: number, data: Partial<InfopefamiliarDeclaracionJurada>): Observable<InfopefamiliarDeclaracionJurada> {
        return this.http.put<ApiResponse<InfopefamiliarDeclaracionJurada>>(`${this.apiUrl}/${id}`, data)
            .pipe(
                map(response => response.data),
                catchError(this.handleError)
            );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`)
            .pipe(
                map(response => response.data),
                catchError(this.handleError)
            );
    }

    listarPaginado(request: PaginatedRequest): Observable<PaginatedResponse<InfopefamiliarDeclaracionJurada>> {
        return this.http.post<PaginatedResponse<InfopefamiliarDeclaracionJurada>>(
            `${this.apiUrl}/listar-paginado`,
            request,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).pipe(
            catchError(this.handleError)
        );
    }

    private handleError = (error: HttpErrorResponse): Observable<never> => {
        this.errorHandler.handleError(error);
        return throwError(() => error);
    };
}