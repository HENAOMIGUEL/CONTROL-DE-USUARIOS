import { Component, OnInit } from '@angular/core';
import { personaService } from '../Servicios/personaService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private personaService: personaService,private router: Router) { }

  ngOnInit() {
    if(Object.keys(this.personaService.usuarioLoggeado).length==0){
      this.router.navigateByUrl('loginPage');
    }

  }

}
