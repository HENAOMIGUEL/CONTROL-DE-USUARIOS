import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';


const routes: Routes = [
{ path: 'principal', component: PrincipalComponent },
{ path: 'loginPage', component: LoginComponent },
{ path: 'loadingPage', component: LoadingPageComponent },
{ path: '**', pathMatch:'full', redirectTo:'loginPage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

