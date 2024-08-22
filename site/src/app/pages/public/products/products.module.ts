import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {PipesModule} from "../../../pipes/pipes.module";


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PipesModule,
    CommonModule,
    PipesModule,
    PipesModule
  ]
})
export class ProductsModule { }
