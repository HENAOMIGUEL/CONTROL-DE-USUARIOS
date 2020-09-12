import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { GestionPersonasComponent } from './gestion-personas/gestion-personas.component';
import { FormsModule } from '@angular/forms';
import { FormularioPersonaComponent } from './formulario-persona/formulario-persona.component';
import { FiltroBusquedaComponent } from './filtro-busqueda/filtro-busqueda.component'
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; 




//servicios
import { personaService } from './Servicios/personaService';
import { personasFiltradasService } from './Servicios/personasFiltradas';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoadingPageComponent } from './loading-page/loading-page.component'; 


@NgModule({
  declarations: [
    AppComponent,
    MenuComponentComponent,
    GestionPersonasComponent,
    FormularioPersonaComponent,
    FiltroBusquedaComponent,
    LoginComponent,
    PrincipalComponent,
    LoadingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [personaService,personasFiltradasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
