import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComedorEmpresarialComponent } from './comedor-empresarial.component';

const routes: Routes = [{ path: '', component: ComedorEmpresarialComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComedorEmpresarialRoutingModule { }
