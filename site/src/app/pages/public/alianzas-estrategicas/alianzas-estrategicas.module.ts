import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlianzasEstrategicasRoutingModule } from './alianzas-estrategicas-routing.module';
import { AlianzasEstrategicasComponent } from './alianzas-estrategicas.component';
import {ComponentsModule} from "../../../components/components.module";


@NgModule({
  declarations: [
    AlianzasEstrategicasComponent
  ],
    imports: [
        CommonModule,
        AlianzasEstrategicasRoutingModule,
        ComponentsModule
    ]
})
export class AlianzasEstrategicasModule { }
