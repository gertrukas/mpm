import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificacionesRoutingModule } from './certificaciones-routing.module';
import { CertificacionesComponent } from './certificaciones.component';
import {ComponentsModule} from "../../../components/components.module";


@NgModule({
    declarations: [
        CertificacionesComponent
    ],
    exports: [
        CertificacionesComponent
    ],
  imports: [
    CommonModule,
    CertificacionesRoutingModule,
    ComponentsModule
  ]
})
export class CertificacionesModule { }
