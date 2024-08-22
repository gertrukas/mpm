import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    NewsComponent
  ],
    imports: [
        CommonModule,
        NewsRoutingModule,
        ComponentsModule,
        PipesModule,
        PipesModule
    ]
})
export class NewsModule { }
