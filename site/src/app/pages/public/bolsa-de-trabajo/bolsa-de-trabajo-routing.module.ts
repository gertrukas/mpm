import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BolsaDeTrabajoComponent } from './bolsa-de-trabajo.component';

const routes: Routes = [{ path: '', component: BolsaDeTrabajoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BolsaDeTrabajoRoutingModule { }
