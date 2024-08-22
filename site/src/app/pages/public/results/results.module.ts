import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { ComponentsModule } from "../../../components/components.module";
import { PipesModule } from "../../../pipes/pipes.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    ComponentsModule,
    PipesModule,
    MatProgressSpinnerModule
  ]
})
export class ResultsModule { }
