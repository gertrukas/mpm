import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlianzasEstrategicasComponent } from './alianzas-estrategicas.component';

const routes: Routes = [{ path: '', component: AlianzasEstrategicasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlianzasEstrategicasRoutingModule { }
