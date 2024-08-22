import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "../../environments/environment";

const URL = environment.backUrl + '/assets';

@Pipe({
  name: 'imageGallery'
})
export class ImageGalleryPipe implements PipeTransform {

  transform(img: string, id: string, collection:string): string {
    return `${ URL }/${ collection }/${ img }`;
  }

}
