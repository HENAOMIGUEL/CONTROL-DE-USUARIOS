import { personaService } from '../Servicios/personaService';

import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styleUrls: ['./filtro-busqueda.component.css']
})
export class FiltroBusquedaComponent implements OnInit {

  personaOL : any = {};

  personasOL: any[] = [];

  constructor(private personaService: personaService) { }

  ngOnInit() {
    this.iniciarPersonaLimpia();
  }

  filtrarPersonas() {
    this.personaService.filtrarPersonas(this.personaOL);
  }

  iniciarPersonaLimpia(){
    this.personaOL = {
      "nombres": "",
      "apellidos": "",
      "cc": "",
      "rol": "",
      "estado": "",
      "tel": "",
      "email": "",
      "pass": ""
    };
  }


}
