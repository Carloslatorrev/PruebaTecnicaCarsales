import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl = 'http://localhost:5000/api/character';

  constructor(private http: HttpClient) { }

  // Obtener todos los personajes
  getAllCharacters(page: number = 1): Observable<any> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // Obtener un personaje por ID
  getCharacterById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Obtener múltiples personajes por sus IDs
  getMultipleCharactersByIds(ids: number[]): Observable<any> {
    const params = new HttpParams().set('ids', ids.join(','));
    return this.http.get(`${this.baseUrl}/multiple`, { params });
  }

  // Filtrar personajes según varios parámetros
  filterCharacters(name: string, status: string, species: string, type: string, gender: string, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('name', name)
      .set('status', status)
      .set('species', species)
      .set('type', type)
      .set('gender', gender)
      .set('page', page.toString());
    return this.http.get(`${this.baseUrl}/filter`, { params });
  }

  // Método para buscar personajes por nombre
  searchCharacters(name: string): Observable<any> {
    const params = new HttpParams().set('name', name);
    return this.http.get(`${this.baseUrl}/filter`, { params }); // Usamos el filtro por nombre
  }
}