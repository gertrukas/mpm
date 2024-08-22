import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E500Component } from './e500.component';

const routes: Routes = [{ path: '', component: E500Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class E500RoutingModule { }
