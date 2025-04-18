import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BusquedaAlfanumericaService } from '../../../../core/service/busqueda-alfanumerica.service';
import { BusquedaAlfanumericaRequest } from '../../../../core/interfaces/busqueda-alfanumerica-request';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { BusquedaAlfanumericaResponse } from '../../../../core/interfaces/busqueda-alfanumerica-response';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  standalone: true,
  selector: 'app-busqueda-principal',
  imports: [TableModule, Dialog, ButtonModule, ReactiveFormsModule],
  templateUrl: './busqueda-principal.component.html',
  styleUrl: './busqueda-principal.component.css',
})
export class BusquedaPrincipalComponent implements OnInit {
  oBusquedaPredios: BusquedaAlfanumericaResponse[] = [];
  visible: boolean = false;
  busquedaPredioForm!: FormGroup;
  
  currentComponent = 'datos-generales';
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  private container!: ViewContainerRef;

  constructor(
    private busquedaAlfanumericaService: BusquedaAlfanumericaService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    debugger;
    this.busquedaPredioForm = this.fb.group({
      inputRuc: [''],
      inputCus: [''], 
    });
  }

  onClickBuscarPredio() {
    
    if (this.busquedaPredioForm.invalid) {
      return;
    }
    this.spinner.show();
   

    const request: BusquedaAlfanumericaRequest = {
      rucEntidad: this.busquedaPredioForm.get('inputRuc')?.value || null,
      cus: this.busquedaPredioForm.get('inputCus')?.value ||  null,
      codigoDepartamento: null,
      codigoProvincia: null,
      codigoDistrito: null,
      direccion: null,
      propietario: null,
      areaMinima: null,
      areaMaxima: null,
      tipoPartida: null,
      numeroSolictudIngreso: null,
      ocurrencia: null,
      pagina: '1',
      numeroPagina: '10000',
    };

    this.busquedaAlfanumericaService.buscarPredios(request).subscribe({
      next: (response) => {
        this.oBusquedaPredios = response.data;
        this.spinner.hide();
      },
    });
  }

  ngAfterViewInit(): void {
    this.loadComponent(this.currentComponent);
  }

  onClickLimpiarPredio() {
    this.busquedaPredioForm.reset();  
    this.oBusquedaPredios = [];  
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
