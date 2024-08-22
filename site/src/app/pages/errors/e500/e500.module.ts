import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { E500RoutingModule } from './e500-routing.module';
import { E500Component } from './e500.component';


@NgModule({
  declarations: [
    E500Component
  ],
  imports: [
    CommonModule,
    E500RoutingModule
  ]
})
export class E500Module { }
