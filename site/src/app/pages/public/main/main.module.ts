import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        PipesModule,
        ComponentsModule,
        MatProgressSpinnerModule,
        PipesModule,

    ]
})
export class MainModule { }
