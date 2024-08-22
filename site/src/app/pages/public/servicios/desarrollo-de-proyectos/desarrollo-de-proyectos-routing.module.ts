import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesarrolloDeProyectosComponent } from './desarrollo-de-proyectos.component';

const routes: Routes = [{ path: '', component: DesarrolloDeProyectosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesarrolloDeProyectosRoutingModule { }
