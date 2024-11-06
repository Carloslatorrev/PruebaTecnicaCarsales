import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private baseUrl = 'http://localhost:5000/api/episode';
  constructor(private http: HttpClient) { }

  // Obtener todos los episodios
  getAllEpisodes(page: number = 1): Observable<any> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // Obtener un episodio por ID
  getEpisodeById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Obtener múltiples episodios por sus IDs
  getMultipleEpisodesByIds(ids: number[]): Observable<any> {
    const params = new HttpParams().set('ids', ids.join(','));
    return this.http.get(`${this.baseUrl}/multiple`, { params });
  }

  // Filtrar episodios por nombre y código de episodio
  filterEpisodes(name: string, episode: string, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('name', name)
      .set('episode', episode)
      .set('page', page.toString());
    return this.http.get(`${this.baseUrl}/filter`, { params });
  }
}