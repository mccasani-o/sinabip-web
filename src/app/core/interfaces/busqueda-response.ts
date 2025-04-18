import { BusquedaAlfanumericaResponse } from './busqueda-alfanumerica-response';

export interface BusquedaResponse {
  total: number;
  data: BusquedaAlfanumericaResponse[];
}
