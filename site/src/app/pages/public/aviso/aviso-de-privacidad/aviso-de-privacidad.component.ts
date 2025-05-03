import { Component } from '@angular/core';
import { SEOService } from 'src/app/services/seo.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-aviso-de-privacidad',
  templateUrl: './aviso-de-privacidad.component.html',
  styleUrls: ['./aviso-de-privacidad.component.sass']
})
export class AvisoDePrivacidadComponent{

  item: string  = 'Aviso de Privacidad';
  search: boolean  = false;
  titulo: string = this.item;

  constructor(private title: Title,
              private meta: Meta,
              private seoService: SEOService,
  ) { }

  ngOnInit() {

    this.seoService.setPageTitle('Lounge & food MPM Avíso de privacidad');
    this.seoService.setMetaDescription('Aviso dirigido a los titulares de datos personales que obran en posesión de Lounge & Food MPM.');
    this.seoService.createLinkForCanonicalURL();

  }

}
