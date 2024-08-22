import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosEspecialesRoutingModule } from './eventos-especiales-routing.module';
import { EventosEspecialesComponent } from './eventos-especiales.component';
import {ComponentsModule} from "../../../../components/components.module";


@NgModule({
  declarations: [
    EventosEspecialesComponent
  ],
  imports: [
    CommonModule,
    EventosEspecialesRoutingModule,
    ComponentsModule
  ]
})
export class EventosEspecialesModule { }
