import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunicadosRoutingModule } from './comunicados-routing.module';
import { ComunicadosComponent } from './comunicados.component';
import {ComponentsModule} from "../../../components/components.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PipesModule} from "../../../pipes/pipes.module";


@NgModule({
  declarations: [
    ComunicadosComponent
  ],
  imports: [
    CommonModule,
    ComunicadosRoutingModule,
    ComponentsModule,
    MatProgressSpinnerModule,
    PipesModule
  ]
})
export class ComunicadosModule { }
