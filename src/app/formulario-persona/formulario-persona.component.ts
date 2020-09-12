import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-formulario-persona',
  templateUrl: './formulario-persona.component.html',
  styleUrls: ['./formulario-persona.component.css']
})
export class FormularioPersonaComponent implements OnInit {

  @Input() personaOL = {}


  constructor() { }

  ngOnInit() {
    console.log(this.personaOL);
    
  }


 
}
