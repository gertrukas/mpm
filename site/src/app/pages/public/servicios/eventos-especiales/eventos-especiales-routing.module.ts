import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosEspecialesComponent } from './eventos-especiales.component';

const routes: Routes = [{ path: '', component: EventosEspecialesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosEspecialesRoutingModule { }
