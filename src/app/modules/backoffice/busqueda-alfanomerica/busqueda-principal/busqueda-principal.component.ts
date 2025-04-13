import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BusquedaAlfanumericaService } from '../../../../core/service/busqueda-alfanumerica.service';

@Component({
  selector: 'app-busqueda-principal',
  imports: [TableModule, CommonModule, Dialog, ButtonModule],
  templateUrl: './busqueda-principal.component.html',
  styleUrl: './busqueda-principal.component.css',
})
export class BusquedaPrincipalComponent implements OnInit {
  elementos: any[] = [];
  visible: boolean = false;

  currentComponent = 'datos-generales';

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  private container!: ViewContainerRef;

  constructor(
    private busquedaAlfanumericaService: BusquedaAlfanumericaService
  ) {}

  ngOnInit(): void {
    this.busquedaAlfanumericaService.getCustomersLarge().then((elementos) => {
      this.elementos = elementos;
    });
  }

  showDialog() {
    this.visible = true;
  }

  async loadComponent(componentName: string) {
    this.currentComponent = componentName;
    this.container.clear();

    let component: any;

    switch (componentName) {
      case 'datos-generales':
        component = (
          await import('../datos-generales/datos-generales.component')
        ).DatosGeneralesComponent;
        break;
      case 'adquisicion':
        component = (
          await import(
            '../adquisicion-inscripcion/adquisicion-inscripcion.component'
          )
        ).AdquisicionInscripcionComponent;
        break;
      case 'actos':
        component = (
          await import(
            '../acto-administracion-disposicion/acto-administracion-disposicion.component'
          )
        ).ActoAdministracionDisposicionComponent;
        break;
      default:
        component = (
          await import('../datos-generales/datos-generales.component')
        ).DatosGeneralesComponent;
    }

    this.container.createComponent(component);
  }
}
