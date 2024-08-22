import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CafeteriasComponent } from './cafeterias.component';

const routes: Routes = [{ path: '', component: CafeteriasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafeteriasRoutingModule { }
