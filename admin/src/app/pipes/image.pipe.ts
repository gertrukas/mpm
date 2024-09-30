import { Pipe, PipeTransform } from '@angular/core';
import { environment } from "../../environments/environment";

const URL = environment.backUrl + '/assets';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(id: string, collection: string, image: string): string {
    return `${ URL }/${ collection }/${image}`;
  }

}
