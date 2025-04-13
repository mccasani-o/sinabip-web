import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusquedaAlfanumericaService {

  constructor() { }
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
