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

    this.title.setTitle('Lounge & food MPM servicio de cafeterías')
    this.meta.addTag( { name: 'description', href: 'Contribuimos al bienestar de los colaboradores dentro de su espacio laboral, creando un ambiente agradable.' });
    this.seoService.createLinkForCanonicalURL();


  }


}
