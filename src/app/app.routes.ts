import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { BusquedaPrincipalComponent } from './modules/backoffice/busqueda-alfanomerica/busqueda-principal/busqueda-principal.component';
import { DatosGeneralesComponent } from './modules/backoffice/busqueda-alfanomerica/datos-generales/datos-generales.component';
import { AdquisicionInscripcionComponent } from './modules/backoffice/busqueda-alfanomerica/adquisicion-inscripcion/adquisicion-inscripcion.component';
import { ActoAdministracionDisposicionComponent } from './modules/backoffice/busqueda-alfanomerica/acto-administracion-disposicion/acto-administracion-disposicion.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'busqueda-predios',
        component: BusquedaPrincipalComponent,
        children: [
          {
            path: '',
            redirectTo: 'datos-generales',
            pathMatch: 'full',
          },
          { path: 'datos-generales', component: DatosGeneralesComponent },
          {
            path: 'adquisicion',
            component: AdquisicionInscripcionComponent,
          },
          {
            path: 'actos',
            component: ActoAdministracionDisposicionComponent,
          },
        ],
      },
    ],
  },
];
