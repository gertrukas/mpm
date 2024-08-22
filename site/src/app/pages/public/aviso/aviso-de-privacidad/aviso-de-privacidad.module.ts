import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisoDePrivacidadRoutingModule } from './aviso-de-privacidad-routing.module';
import { AvisoDePrivacidadComponent } from './aviso-de-privacidad.component';
import {ComponentsModule} from "../../../../components/components.module";


@NgModule({
  declarations: [
    AvisoDePrivacidadComponent
  ],
    imports: [
        CommonModule,
        AvisoDePrivacidadRoutingModule,
        ComponentsModule
    ]
})
export class AvisoDePrivacidadModule { }
