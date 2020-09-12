import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { personaService } from '../Servicios/personaService';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit {


  timeLeft: number = 2;
  interval;
  saludo = "Estamos preparando todo para ti";

  constructor(private router: Router, public personaService: personaService) {
  }


  ngOnInit() {
    this.startTimer();

  }

  startTimer() {
    if(Object.keys(this.personaService.usuarioLoggeado).length==0){
      this.saludo= "Cerrando sesion";
    }
      this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        console.log(this.timeLeft);
        if (this.timeLeft == 0) {
            this.router.navigateByUrl('principal');
          
        }
      }
    }, 1000)
  }


}
