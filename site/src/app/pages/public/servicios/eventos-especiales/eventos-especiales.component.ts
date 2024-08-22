import { Component } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {SEOService} from "../../../../services/seo.service";

@Component({
  selector: 'app-eventos-especiales',
  templateUrl: './eventos-especiales.component.html',
  styleUrls: ['./eventos-especiales.component.sass']
})
export class EventosEspecialesComponent {
  secondaryItem: string = 'Eventos especiales';
  item: string  = 'Servicios';
  search: boolean  = false;
  titulo: string = this.item;

  constructor(private title: Title,
              private meta: Meta,
              private seoService: SEOService

  ) { }

  ngOnInit() {

    this.title.setTitle('Lounge & food MPM servicio para Eventos especiales')
    this.meta.addTag({
      name: 'description',
      href: 'Servicio de comedor industrial con los mejores servicios, ingredientes y atención personalizada donde su personal podrá disfrutar de sana convivencia con una alimentación adecuada.'
    });
    this.seoService.createLinkForCanonicalURL();
  }
}
