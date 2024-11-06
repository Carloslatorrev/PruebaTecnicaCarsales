import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = 'http://localhost:5000/api/location';

  constructor(private http: HttpClient) { }

  // Obtener todas las ubicaciones
  getAllLocations(page: number = 1): Observable<any> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // Obtener una ubicación por ID
  getLocationById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Obtener múltiples ubicaciones por sus IDs
  getMultipleLocationsByIds(ids: number[]): Observable<any> {
    const params = new HttpParams().set('ids', ids.join(','));
    return this.http.get(`${this.baseUrl}/multiple`, { params });
  }

  // Filtrar ubicaciones según varios parámetros
  filterLocations(name: string, type: string, dimension: string, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('name', name)
      .set('type', type)
      .set('dimension', dimension)
      .set('page', page.toString());
    return this.http.get(`${this.baseUrl}/filter`, { params });
  }
}