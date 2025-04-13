import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { BusquedaPrincipalComponent } from './modules/backoffice/busqueda-alfanomerica/busqueda-principal/busqueda-principal.component';

export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: 'busqueda-predios',
            component: BusquedaPrincipalComponent,
          },
        ]
      },
];
