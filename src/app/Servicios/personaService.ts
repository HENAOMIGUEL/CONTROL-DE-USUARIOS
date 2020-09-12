import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { personasFiltradasService } from './personasFiltradas';

@Injectable()
export class personaService {

  usuarioLoggeado : any = {};


  constructor(private httpClient: HttpClient,
    private personasFiltradasService: personasFiltradasService) { }







  guardarPersonasOL(personasOL: any[]) {
    this.httpClient.put('https://ol-people.firebaseio.com/Personas-OL.json', personasOL).subscribe();
  }

  getAllPersonasOL() {
    return this.httpClient.get('https://ol-people.firebaseio.com/Personas-OL.json');
  }

  modificarPersona(index: number, personaOL: any) {
    var url: string;
    url = 'https://ol-people.firebaseio.com/Personas-OL/' + index + '.json';

    this.httpClient.put(url, personaOL).subscribe();
  }

  eliminarPersonaOL(id: number, personasOL: any[]) {
    var url: string;
    url = 'https://ol-people.firebaseio.com/Personas-OL/' + id + '.json';
    this.httpClient.delete(url).subscribe();
    this.guardarPersonasOL(personasOL);
  }

  filtrarPersonas(personaOL: any) {
    var querys ="";
    for (const property in personaOL) {
      if(personaOL[property]!="" && personaOL[property]!=null){  
        querys += '"'+property+'":'+'"'+personaOL[property]+'",';
      }
    }
     querys = "{ "+ querys.substr(0,querys.length-1)+" }";
     const filter= JSON.parse(querys);
    console.log(filter);
    
    this.getAllPersonasOL().subscribe((data: any[]) => {
      if(data!=null){
        this.personasFiltradasService.personasFiltradas = [];
        this.personasFiltradasService.personasFiltradas = data.filter(function(item) {
          for (var key in filter) {
            if (item[key] === undefined || item[key] != filter[key])
              return false;
          }
          
          return true;
        });
      }
      if(this.personasFiltradasService.personasFiltradas.length!=0){
        this.usuarioLoggeado = this.personasFiltradasService.personasFiltradas[0];
      }else{
        this.usuarioLoggeado = {};
      }
      
    })
  }


}