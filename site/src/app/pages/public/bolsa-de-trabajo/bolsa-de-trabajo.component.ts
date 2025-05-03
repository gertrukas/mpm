import { Component } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {SEOService} from "../../../services/seo.service";

@Component({
  selector: 'app-bolsa-de-trabajo',
  templateUrl: './bolsa-de-trabajo.component.html',
  styleUrls: ['./bolsa-de-trabajo.component.sass']
})
export class BolsaDeTrabajoComponent {
  secondaryItem: string = 'Bolsa de trabajo';
  item: string  = 'Bolsa de trabajo';
  search: boolean  = false;
  titulo: string = this.secondaryItem;

  constructor(private title: Title,
              private meta: Meta,
              private seoService: SEOService,
  ) { }

  ngOnInit() {

    this.seoService.setPageTitle('Lounge & food MPM Bolsa de Trabajo');
    this.seoService.setMetaDescription('Estamos buscando al mejor talento entre los profesionales que se quieran unir a nuestro equipo de trabajo');
    this.seoService.createLinkForCanonicalURL();

  }
}
