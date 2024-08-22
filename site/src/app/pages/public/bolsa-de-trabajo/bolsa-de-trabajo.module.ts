import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BolsaDeTrabajoRoutingModule } from './bolsa-de-trabajo-routing.module';
import { BolsaDeTrabajoComponent } from './bolsa-de-trabajo.component';
import {ComponentsModule} from "../../../components/components.module";


@NgModule({
  declarations: [
    BolsaDeTrabajoComponent
  ],
    imports: [
        CommonModule,
        BolsaDeTrabajoRoutingModule,
        ComponentsModule
    ]
})
export class BolsaDeTrabajoModule { }
