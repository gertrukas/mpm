import { Component } from '@angular/core';
import { SEOService } from 'src/app/services/seo.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.sass']
})
export class CertificacionesComponent {
  secondaryItem: string = 'Certificaciones';
  item: string  = 'Beneficios';
  search: boolean  = false;
  titulo: string = this.secondaryItem;

  constructor(private title: Title,
              private meta: Meta,
              private seoService: SEOService,
  ) { }

  ngOnInit() {

    this.title.setTitle('Lounge & food MPM Certificaciones')
    this.meta.addTag( { name: 'description', href: 'Programas y certificaciones: Todos nuestros procedimientos en basados en normas NORMA Oficial Mexicana NOM-251-SSA1-2009 , nmx-f-605-normex-2016' });
    this.seoService.createLinkForCanonicalURL();

  }

}
