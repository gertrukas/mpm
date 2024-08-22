import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {PipesModule} from "../../../pipes/pipes.module";


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    PipesModule,
    CommonModule,
    PipesModule,
    PipesModule
  ]
})
export class ProductModule { }
