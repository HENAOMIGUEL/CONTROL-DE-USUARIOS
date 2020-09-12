import { Component, OnInit } from '@angular/core';
import { personaService } from '../Servicios/personaService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  personasOL: any[] = [];
  personaMatch: any[] = [];
  contador = 0;


  personaLogin: any = {
    "nombres": "",
    "apellidos": "",
    "cc": "",
    "rol": "",
    "estado": "",
    "tel": "",
    "email": "",
    "pass": ""
  };



  constructor(private personaService: personaService, private router: Router) { }

  ngOnInit() {
    this.personaService.getAllPersonasOL().subscribe((data: any) => {
      this.personasOL = data;

      console.log(data);
      this.personasOL = data;

    });
  }

  iniciar(email, pass) {
    this.personaLogin.email = email;
    this.personaLogin.pass = pass;
    
    if (email.trim() != "" && pass.trim() != "") {

      this.getFiltro();
      if (this.personaMatch.length != 0) {
        this.personaLogin = this.personaMatch[0];
        this.personaService.usuarioLoggeado = this.personaLogin;
        console.log("usuario logeado");

        console.log(this.personaService.usuarioLoggeado);

        this.router.navigateByUrl('loadingPage');

      } else {
        alert("Usuario o contraseña incorrecta, si no está registrado, por favor pongase en contacto con un administrador");
      }

  

    } else {
      alert("ambos campos son requeridos");
    }


  }


  getFiltro() {
    var querys = "";
    for (const property in this.personaLogin) {
      if (this.personaLogin[property] != "" && this.personaLogin[property] != null) {
        querys += '"' + property + '":' + '"' + this.personaLogin[property] + '",';
      }
    }
    querys = "{ " + querys.substr(0, querys.length - 1) + " }";
    const filter = JSON.parse(querys);
    console.log(filter);

    if (this.personasOL != null) {
      this.personaMatch = this.personasOL.filter(function (item) {
        for (var key in filter) {
          if (item[key] === undefined || item[key] != filter[key])
            return false;
        }
        return true;
      });
    }
  }









}
