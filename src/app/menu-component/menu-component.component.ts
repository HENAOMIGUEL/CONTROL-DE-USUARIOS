import { Component, OnInit } from '@angular/core';
import { personaService } from '../Servicios/personaService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit {

  hideTittle = true;

  constructor(public personaService : personaService,private router : Router) { }

  ngOnInit() {
  }

  showTitle(){
    if(this.hideTittle){
      this.hideTittle = false;
    }else{
      this.hideTittle = true;
    }
  }


  logOut(){
    this.personaService.usuarioLoggeado = {};

    this.router.navigateByUrl("loadingPage");
  }
}
