import { Component } from '@angular/core';
import { SEOService } from 'src/app/services/seo.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-comedor-empresarial',
  templateUrl: './comedor-empresarial.component.html',
  styleUrls: ['./comedor-empresarial.component.sass']
})
export class ComedorEmpresarialComponent {
  secondaryItem: string = 'Comedor empresarial';
  item: string  = 'Servicios';
  search: boolean  = false;
  titulo: string = this.item;

  constructor(private title: Title,
              private meta: Meta,
              private seoService: SEOService

  ) { }

  ngOnInit() {

    this.title.setTitle('Lounge & food MPM servicio de comedor empresarial')
    this.meta.updateTag( { name: 'description', href: 'Servicio de comedor industrial con los mejores servicios, ingredientes y atención personalizada donde su personal podrá disfrutar de sana convivencia con una alimentación adecuada.' });
    this.seoService.createLinkForCanonicalURL();

  }

}
