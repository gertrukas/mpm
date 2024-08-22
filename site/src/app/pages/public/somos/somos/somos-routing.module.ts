import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SomosComponent } from './somos.component';

const routes: Routes = [{ path: '', component: SomosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SomosRoutingModule { }
