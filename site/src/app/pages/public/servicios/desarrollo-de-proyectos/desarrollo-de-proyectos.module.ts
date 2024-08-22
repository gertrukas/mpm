import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesarrolloDeProyectosRoutingModule } from './desarrollo-de-proyectos-routing.module';
import { DesarrolloDeProyectosComponent } from './desarrollo-de-proyectos.component';
import {ComponentsModule} from "../../../../components/components.module";


@NgModule({
  declarations: [
    DesarrolloDeProyectosComponent
  ],
    imports: [
        CommonModule,
        DesarrolloDeProyectosRoutingModule,
        ComponentsModule
    ]
})
export class DesarrolloDeProyectosModule { }
