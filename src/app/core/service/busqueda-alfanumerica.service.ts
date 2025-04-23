import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusquedaAlfanumericaRequest } from '../interfaces/busqueda-alfanumerica-request';
import { BusquedaResponse } from '../interfaces/busqueda-response';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UbigeoRequest } from '../interfaces/ubigeo-request';
import { UbigeoResponse } from '../interfaces/ubigeo-response';

@Injectable({
  providedIn: 'root'
})
export class BusquedaAlfanumericaService {

  constructor(private http: HttpClient) { }

  buscarPredios(request: BusquedaAlfanumericaRequest): Observable<BusquedaResponse> {
    return this.http.post<BusquedaResponse>(`${environment.API_URL}/predios/busqueda/avanzado`, request);
  }

  buscarUbigeo(request: UbigeoRequest): Observable<UbigeoResponse> {
    return this.http.post<UbigeoResponse>(`${environment.API_URL}/ubigeos`, request);
  }



  
}
