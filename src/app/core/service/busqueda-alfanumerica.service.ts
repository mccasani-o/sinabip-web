import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusquedaAlfanumericaRequest } from '../interfaces/busqueda-alfanumerica-request';
import { BusquedaResponse } from '../interfaces/busqueda-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaAlfanumericaService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/v1/busqueda/avanzado/predios';



  buscarPredios(request: BusquedaAlfanumericaRequest): Observable<BusquedaResponse> {
    return this.http.post<BusquedaResponse>(this.apiUrl, request);
  }
  
  getData() {
    return [
      {
        id: 1,
        codigo: 204060,
        nombre: 'PUESTO DE SALUD - MARAYPAMPA',
        departamento: 'PIURA',
        provincia: 'HUANCABAMBA',
        distrito: 'HUARMACA',
        partida_electronica: 'P.E. - 11308742',
        titular: 'ESTADO PERUANO',
        area_m2: 2647.9,
        condicion: 'PROPIETARIO',
      },
    ];
  }

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  }
}
