import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './truncate.pipe';
import { ImagePipe } from './image.pipe';
import {ImageGalleryPipe} from "./image-gallery.pipe";



@NgModule({
    declarations: [
        TruncatePipe,
        ImagePipe,
        ImageGalleryPipe
    ],
    exports: [
        TruncatePipe,
        ImagePipe,
        ImageGalleryPipe
    ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
