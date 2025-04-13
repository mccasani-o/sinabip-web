import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ActoAdminiDisposicionService } from '../../../../core/service/acto-admini-disposicion.service';

@Component({
  selector: 'app-acto-administracion-disposicion',
  imports: [TableModule, CommonModule],
  templateUrl: './acto-administracion-disposicion.component.html',
  styleUrl: './acto-administracion-disposicion.component.css'
})
export class ActoAdministracionDisposicionComponent implements OnInit {
quitarActo() {
throw new Error('Method not implemented.');
}
modificarActo() {
throw new Error('Method not implemented.');
}
  elementos: any[] = [];

  constructor(
    private actoAdminiDisposicionService: ActoAdminiDisposicionService
  ) {}
  ngOnInit(): void {
    this.actoAdminiDisposicionService.getCustomersData().then((elementos) => {
      this.elementos = elementos;
    });
  }

}
