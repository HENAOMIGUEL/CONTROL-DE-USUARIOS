import { Component, OnInit } from '@angular/core';
import { personaService } from '../Servicios/personaService';
import { personasFiltradasService } from '../Servicios/personasFiltradas';

@Component({
  selector: 'app-gestion-personas',
  templateUrl: './gestion-personas.component.html',
  styleUrls: ['./gestion-personas.component.css']
})
export class GestionPersonasComponent implements OnInit {

  personasOL: any[] = [];
  pageActual: number = 1;
  idPersonaSelected;
  personaOL: any = {
    "nombres": "",
    "apellidos": "",
    "cc": " as",
    "rol": "",
    "estado": "",
    "tel": "",
    "email": "",
    "pass": ""
  };
  showFormulario = false;

  constructor(public personaService: personaService, public personasFiltradasService: personasFiltradasService) { }

  ngOnInit() {
    this.personaService.getAllPersonasOL().subscribe((data: any) => {
      this.personasFiltradasService.personasFiltradas = [];
      this.personasOL = data;
      this.personasFiltradasService.personasFiltradas = this.personasFiltradasService.personasFiltradas.concat(this.personasOL);
      console.log("usuario logeadp");

      console.log(this.personaService.usuarioLoggeado);
      console.log(this.personasFiltradasService.personasFiltradas);

    });
  }


  abrirEditarPersona(persona, id) {
    this.idPersonaSelected = id;
    this.personaOL = persona;
    this.showFormulario = true;
  }

  abrirCrearPersona() {
    this.personaOL = {};
  }

  guardarPersona() {

    if (this.validarRequeridos()) {
      if (this.validarDuplicados()) {
        console.log(this.personaOL);
        this.personasOL.push(this.personaOL);
        this.personasFiltradasService.personasFiltradas.push(this.personaOL);
        this.personaService.guardarPersonasOL(this.personasFiltradasService.personasFiltradas);
        this.personaOL = {};
        alert("OK");

      } else {
        alert("Ups... esta persona ya existe en el sistema!");
      }
    } else {
      alert("Nombres e identificacion ( CC ) requeridos!");
    }
  }

  editarPersona() {

    if (this.validarRequeridos()) {
      if (this.idPersonaSelected == this.personaOL.cc) {
        var posicion = this.buscarPosicion();

        this.personasOL[posicion] = this.personaOL;

        console.log(this.personasOL);
        console.log(this.personasFiltradasService.personasFiltradas);
        this.personaService.modificarPersona(posicion, this.personaOL);
        this.showFormulario = false;
        alert("OK");
      } else {
        alert("No puede cambiar la identificacion!");
        this.personaOL.cc = this.idPersonaSelected;
      }
    } else {
      alert("Nombres,identificacion ( CC ),email y correo son  requeridos!");
    }

  }


  borrarPersona(id) {
    this.showFormulario = false;
    this.idPersonaSelected = id;
    if (confirm("¡Esta seguro?, este cambio no se puede deshacer.")) {
      var posOriginal = this.buscarPosicion();
      var posService;
      for (let index = 0; index < this.personasFiltradasService.personasFiltradas.length; index++) {
        if (this.personasFiltradasService.personasFiltradas[index].cc == this.idPersonaSelected) {
          posService = index;
        }
      }

      this.personasFiltradasService.personasFiltradas.splice(posService, 1);

      this.personasOL.splice(posOriginal, 1);
      this.personaService.eliminarPersonaOL(posOriginal, this.personasOL);
    }
  }
  buscarPosicion() {
    var posicion;
    for (let index = 0; index < this.personasOL.length; index++) {
      if (this.personasOL[index].cc == this.idPersonaSelected) {
        posicion = index;
      }
    }
    return posicion;
  }
  validarRequeridos() {
    var cc = this.personaOL.cc;
    var nombres = this.personaOL.nombres;
    var email = this.personaOL.email;
    var pass = this.personaOL.pass;


    if (cc == null || cc == "" || nombres == null || nombres.trim() == "" ||
     email == null || email == "" || pass == null || pass.trim() == "") {
      return false;
    } else {
      return true;
    }
  }
  validarDuplicados() {
    var ok = true;
    if (this.personaOL.length != null) {
      for (let index = 0; index < this.personaOL.length; index++) {
        var cc = this.personaOL[index].cc;
        if (cc == null) {
          cc = "x";
        }
        if (cc == this.personaOL.cc) {
          ok = false;
          break;
        }
      }
    }

    return ok;
  }


}