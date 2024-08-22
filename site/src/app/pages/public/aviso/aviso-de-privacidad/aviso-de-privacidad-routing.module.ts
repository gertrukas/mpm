import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvisoDePrivacidadComponent } from './aviso-de-privacidad.component';

const routes: Routes = [{ path: '', component: AvisoDePrivacidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisoDePrivacidadRoutingModule { }
