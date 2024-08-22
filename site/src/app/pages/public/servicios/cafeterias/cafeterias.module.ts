import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CafeteriasRoutingModule } from './cafeterias-routing.module';
import { CafeteriasComponent } from './cafeterias.component';
import {ComponentsModule} from "../../../../components/components.module";


@NgModule({
  declarations: [
    CafeteriasComponent
  ],
    imports: [
        CommonModule,
        CafeteriasRoutingModule,
        ComponentsModule
    ]
})
export class CafeteriasModule { }
