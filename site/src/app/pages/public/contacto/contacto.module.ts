import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule, NgIf} from '@angular/common';

import { ContactoRoutingModule } from './contacto-routing.module';
import { ContactoComponent } from './contacto.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    ContactoComponent
  ],
  imports: [
    CommonModule,
    ContactoRoutingModule,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class ContactoModule { }
