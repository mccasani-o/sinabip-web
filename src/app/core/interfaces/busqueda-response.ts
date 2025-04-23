import { BusquedaAlfanumericaResponse } from './busqueda-alfanumerica-response';
import { GenericResponse } from './generic-response';

export interface BusquedaResponse extends GenericResponse {
  data: {
    total: number;
    lista: BusquedaAlfanumericaResponse[];
  };
}
