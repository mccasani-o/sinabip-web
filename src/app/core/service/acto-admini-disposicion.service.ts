import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActoAdminiDisposicionService {
  public ActoAdminiDisposicionService(){}

  getData() {
    return [
      {
        item: 1,
        detalle: 'INSCRIPCION EN PRIMERA DE DOMINIO',
        InstitucionFavorecida: 'MINISTERIO DE EDUCACION - CENTRO EDUCATIVO N° 16478',
        areaDispuesta: '10,000.00',
        vigente: 'NO'
       
      },
      {
        item: 2,
        detalle: ' EN PRIMERA DE DOMINIO',
        InstitucionFavorecida: 'MINISTERIO DE EDUCACION - CENTRO EDUCATIVO N° 16478',
        areaDispuesta: '10,000.00',
        vigente: 'SI'
       
      },
      {
        item: 3,
        detalle: 'INSCRIPCION EN PRIMERA DE DOMINIO',
        InstitucionFavorecida: 'MINISTERIO DE EDUCACION - CENTRO EDUCATIVO N° 16478',
        areaDispuesta: '10,000.00',
        vigente: 'NO'
       
      },
      {
        item: 4,
        detalle: 'DOMINIO',
        InstitucionFavorecida: 'MINISTERIO DE EDUCACION - CENTRO EDUCATIVO N° 16478',
        areaDispuesta: '10,000.00',
        vigente: 'SI'
       
      },{
        item: 5,
        detalle: 'INSCRIPCION EN PRIMERA DE DOMINIO',
        InstitucionFavorecida: 'MINISTERIO DE EDUCACION - CENTRO EDUCATIVO N° 16478',
        areaDispuesta: '10,000.00',
        vigente: 'NO'
       
      },
      {
        item: 6,
        detalle: 'INSCRIPCION EN PRIMERA DE DOMINIO',
        InstitucionFavorecida: 'MINISTERIO DE EDUCACION - CENTRO EDUCATIVO N° 16478',
        areaDispuesta: '10,000.00',
        vigente: 'SI'
       
      }
    ];
  }

  getCustomersData() {
    return Promise.resolve(this.getData().slice(0, 200));
  }
}

