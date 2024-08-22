import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CateringRoutingModule } from './catering-routing.module';
import { CateringComponent } from './catering.component';
import {ComponentsModule} from "../../../../components/components.module";


@NgModule({
  declarations: [
    CateringComponent
  ],
    imports: [
        CommonModule,
        CateringRoutingModule,
        ComponentsModule
    ]
})
export class CateringModule { }
