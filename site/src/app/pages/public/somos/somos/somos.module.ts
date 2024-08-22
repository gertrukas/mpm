import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SomosRoutingModule } from './somos-routing.module';
import { SomosComponent } from './somos.component';
import {ComponentsModule} from "../../../../components/components.module";


@NgModule({
  declarations: [
    SomosComponent
  ],
    imports: [
        CommonModule,
        SomosRoutingModule,
        ComponentsModule
    ]
})
export class SomosModule { }
