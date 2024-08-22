import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComedorEmpresarialRoutingModule } from './comedor-empresarial-routing.module';
import { ComedorEmpresarialComponent } from './comedor-empresarial.component';
import {ComponentsModule} from "../../../../components/components.module";


@NgModule({
  declarations: [
    ComedorEmpresarialComponent
  ],
  imports: [
    CommonModule,
    ComedorEmpresarialRoutingModule,
    ComponentsModule
  ]
})
export class ComedorEmpresarialModule { }
