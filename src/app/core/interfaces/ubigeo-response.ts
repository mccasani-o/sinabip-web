import { GenericResponse } from './generic-response';
import { Ubigeo } from './ubigeo';

export interface UbigeoResponse extends GenericResponse {
  data: Ubigeo[];
}
