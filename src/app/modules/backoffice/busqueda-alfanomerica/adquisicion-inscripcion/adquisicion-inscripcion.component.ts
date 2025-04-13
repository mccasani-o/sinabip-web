import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-adquisicion-inscripcion',
  imports: [TableModule, CommonModule],
  templateUrl: './adquisicion-inscripcion.component.html',
  styleUrl: './adquisicion-inscripcion.component.css'
})
export class AdquisicionInscripcionComponent {

}
