import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginatedRequest } from '../core/interfaces/paginated-request';
import { VMantenimientoEvaluacionDesempenioMotivoAccion } from '../interfaces/v-mantenimiento-evaluacion-desempenio-motivo-accion';
import { PaginatedResponse } from '../core/interfaces/paginated-response';
import { ApiResponse } from '../core/interfaces/api-response';
import { GetAllFilterParams } from '../core/interfaces/get-all-filter-params';
import { ErrorHandlerService } from '../core/services/error-handler-service';

@Injectable({
    providedIn: 'root'
})
export class VMantenimientoEvaluacionDesempenioMotivoAccionService {
    private readonly apiUrl = `/v-mantenimiento-evaluaciones-desempenios-motivos-acciones`;

    constructor(
        private readonly http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) {}

    getAll(params?: GetAllFilterParams): Observable<VMantenimientoEvaluacionDesempenioMotivoAccion[]> {
        let httpParams = new HttpParams();
        if (params?.campo && params?.valor) {
            httpParams = httpParams
                .set('campo', params.campo)
                .set('valor', params.valor);
        }

        return this.http.get<PaginatedResponse<VMantenimientoEvaluacionDesempenioMotivoAccion>>(this.apiUrl, { params: httpParams })
            .pipe(
                map(response => response.data),
                catchError(this.handleError)
            );
    }

    getById(id: number): Observable<VMantenimientoEvaluacionDesempenioMotivoAccion> {
        return this.http.get<ApiResponse<VMantenimientoEvaluacionDesempenioMotivoAccion>>(`${this.apiUrl}/${id}`)
            .pipe(
                map(response => response.data),
                catchError(this.handleError)
            );
    }

    create(data: Omit<VMantenimientoEvaluacionDesempenioMotivoAccion, 'id'>): Observable<VMantenimientoEvaluacionDesempenioMotivoAccion> {
        return this.http.post<ApiResponse<VMantenimientoEvaluacionDesempenioMotivoAccion>>(this.apiUrl, data)
            .pipe(
                map(response => response.data),
                catchError(this.handleError)
            );
    }

    update(id: number, data: Partial<VMantenimientoEvaluacionDesempenioMotivoAccion>): Observable<VMantenimientoEvaluacionDesempenioMotivoAccion> {
        return this.http.put<ApiResponse<VMantenimientoEvaluacionDesempenioMotivoAccion>>(`${this.apiUrl}/${id}`, data)
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

    listarPaginado(request: PaginatedRequest): Observable<PaginatedResponse<VMantenimientoEvaluacionDesempenioMotivoAccion>> {
        return this.http.post<PaginatedResponse<VMantenimientoEvaluacionDesempenioMotivoAccion>>(
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