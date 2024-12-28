import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  status: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: number;
    usuario: string;
  };
  message?: string;
  errors?: {
    [key: string]: string[];
  };
}

interface JwtPayload {
  nombres: string;
  apellidos: string;
  permisos: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.status === 'success' && response.access_token) {
            this.setToken(response.access_token);
          }
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.removeToken();
        })
      );
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh`, {})
      .pipe(
        tap(response => {
          if (response.access_token) {
            this.setToken(response.access_token);
          }
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  getFullName(): string {
    const token = this.getToken();
    if (!token) return '';
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return `${decoded.nombres} ${decoded.apellidos}`.trim();
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
  }

  hasPermission(permission: string): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.permisos?.includes(permission) || false;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }
}
