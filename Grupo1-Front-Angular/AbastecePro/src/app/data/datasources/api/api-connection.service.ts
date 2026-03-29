/**
 * @fileoverview Servicio de conexión HTTP con la API REST.
 * Centraliza todas las peticiones HTTP (GET, POST, PUT, DELETE) hacia el
 * backend ASP.NET, aplicando headers y configuración por defecto.
 */

// #region Imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './api-config';
// #endregion

// #region Servicio
@Injectable({ providedIn: 'root' })
export class ApiConnectionService {
  /** URL base de la API obtenida de la configuración */
  private readonly baseUrl = API_CONFIG.baseUrl;

  /** Headers por defecto para todas las peticiones (JSON) */
  private readonly defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private readonly http: HttpClient) {}

  /**
   * Realiza una petición GET al endpoint indicado.
   * @param endpoint - Ruta relativa del endpoint (ej: '/Usuario')
   * @param params - Parámetros de consulta opcionales (query string)
   * @returns Observable con la respuesta tipada del servidor
   */
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.defaultHeaders,
      params,
    });
  }

  /**
   * Realiza una petición POST al endpoint indicado.
   * @param endpoint - Ruta relativa del endpoint
   * @param body - Cuerpo de la petición (se serializa a JSON)
   * @returns Observable con la respuesta tipada del servidor
   */
  post<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, {
      headers: this.defaultHeaders,
    });
  }

  /**
   * Realiza una petición PUT al endpoint indicado.
   * @param endpoint - Ruta relativa del endpoint
   * @param body - Cuerpo de la petición con los datos actualizados
   * @returns Observable con la respuesta tipada del servidor
   */
  put<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, {
      headers: this.defaultHeaders,
    });
  }

  /**
   * Realiza una petición DELETE al endpoint indicado.
   * @param endpoint - Ruta relativa del endpoint del recurso a eliminar
   * @returns Observable con la respuesta tipada del servidor
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      headers: this.defaultHeaders,
    });
  }
}
// #endregion
