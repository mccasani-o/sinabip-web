import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BusquedaAlfanumericaService } from '../../../../core/service/busqueda-alfanumerica.service';
import { BusquedaAlfanumericaRequest } from '../../../../core/interfaces/busqueda-alfanumerica-request';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BusquedaAlfanumericaResponse } from '../../../../core/interfaces/busqueda-alfanumerica-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { UbigeoRequest } from '../../../../core/interfaces/ubigeo-request';
import { UbigeoResponse } from '../../../../core/interfaces/ubigeo-response';
import { Ubigeo } from '../../../../core/interfaces/ubigeo';

@Component({
  standalone: true,
  selector: 'app-busqueda-principal',
  imports: [TableModule, Dialog, ButtonModule, ReactiveFormsModule],
  templateUrl: './busqueda-principal.component.html',
  styleUrl: './busqueda-principal.component.css',
})
export class BusquedaPrincipalComponent implements OnInit {
btnLimpiarFormularioAvanzado() {
throw new Error('Method not implemented.');
}
btnBuscarAvanzado() {
throw new Error('Method not implemented.');
}
  oBusquedaPredios: BusquedaAlfanumericaResponse[] = [];
  departamentos: Ubigeo[] = [];
  visibleDetalle: boolean = false;
  visibleAvanzado: boolean = false;
  modalAvanzado: boolean = false;
  busquedaPredioForm!: FormGroup;

  first = 0;
  rows = 10;
  totalRecords: number = 0;
  tamanioPagina: number = 10; // Tamaño inicial de la página
  
  lastRequest: BusquedaAlfanumericaRequest | null = null;

  requestUbigeo: UbigeoRequest = {
    codigoDepartamento: '0',
    codigoProvincia: '0',
    codigoDistrito: '0',
    tipo: 1,
  };

  currentComponent = 'datos-generales';
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  private container!: ViewContainerRef;

  constructor(
    private busquedaAlfanumericaService: BusquedaAlfanumericaService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.cargarDepartamentos('0', '0', '0', 1);
  }

  private initForm(): void {
    this.busquedaPredioForm = this.fb.group({
      inputRuc: [''],
      inputCus: [''],
    });
  }

  onClickBuscarPredio(): void {
    if (this.busquedaPredioForm.invalid) {
      return;
    }
    // Resetear paginación al hacer una nueva búsqueda
    this.first = 0;
    this.loadPredios(1, this.rows);
  }
  loadPrediosLazy(event: any): void {
    if (!this.lastRequest) return; // No hacer nada si no hay una búsqueda previa

    const page = event.first! / event.rows! + 1;
    this.loadPredios(page, event.rows!);
  }

  private loadPredios(page: number, pageSize: number): void {
    //this.loading = true;
    this.spinner.show();

    const request: BusquedaAlfanumericaRequest = {
      rucEntidad: this.busquedaPredioForm.get('inputRuc')?.value || null,
      cus: this.busquedaPredioForm.get('inputCus')?.value || null,
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
      pagina: page.toString(),
      numeroPagina: pageSize.toString(),
    };

    this.lastRequest = request;

    this.busquedaAlfanumericaService.buscarPredios(request).subscribe({
      next: (response) => {
        this.oBusquedaPredios = response.data.lista;
        this.totalRecords = response.data.total;
        //this.loading = false;
        this.spinner.hide();
      },
      error: () => {
        //this.loading = false;
        this.spinner.hide();
      },
    });
  }

  cargarDepartamentos(
    codDepa: string,
    codProv: string,
    codDist: string,
    tipo: number
  ) {
    debugger;
    this.requestUbigeo.codigoDepartamento = codDepa;
    this.requestUbigeo.codigoProvincia = codProv;
    this.requestUbigeo.codigoDistrito = codDist;
    this.requestUbigeo.tipo = tipo;
    debugger;
    this.busquedaAlfanumericaService.buscarUbigeo(this.requestUbigeo).subscribe(
      (response: UbigeoResponse) => {
        this.departamentos = response.data;
      },
      (error) => {
        console.error('Error al cargar departamentos', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.loadComponent(this.currentComponent);
  }

  onClickLimpiarPredio(): void {
    this.busquedaPredioForm.reset();
    this.oBusquedaPredios = [];
    this.totalRecords = 0;
    this.first = 0;
    this.lastRequest = null;
  }

  showDialogAvanzada() {
    debugger;
    this.visibleAvanzado=true;
  }

  showDialogDetalle() {
    debugger;
    this.visibleDetalle = true;
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
