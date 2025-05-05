import { Component } from '@angular/core';
import { SEOService } from 'src/app/services/seo.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cafeterias',
  templateUrl: './cafeterias.component.html',
  styleUrls: ['./cafeterias.component.sass']
})
export class CafeteriasComponent {
  secondaryItem: string = 'Cafeterías';
  item: string  = 'Servicios';
  search: boolean  = false;
  titulo: string = this.item;

  constructor(private title: Title,
              private meta: Meta,
              private seoService: SEOService,

  ) { }

  ngOnInit() {

    this.title.setTitle('Lounge & food MPM servicio para cafeterías')
    this.meta.updateTag( { name: 'description', href: 'Convierte cada pausa en un momento de inspiración. Nuestras cafeterías corporativas combinan sabor, comodidad y eficiencia, creando un espacio ideal para recargar energías.' });
    this.seoService.createLinkForCanonicalURL();
  }


}
