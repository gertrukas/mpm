import { Component } from '@angular/core';
import { SEOService } from 'src/app/services/seo.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-catering',
  templateUrl: './catering.component.html',
  styleUrls: ['./catering.component.sass']
})
export class CateringComponent {
  secondaryItem: string = 'Catering';
  item: string  = 'Servicios';
  search: boolean  = false;
  titulo: string = this.secondaryItem;

  constructor(private title: Title,
              private meta: Meta,
              private seoService: SEOService,

  ) { }

  ngOnInit() {

    this.title.setTitle('Lounge & food MPM servicio en desarrollo de proyectos')
    this.meta.addTag( { name: 'description', href: 'DISEÑO DE COMEDORES: Soluciones integrales que se adaptan a concepto, posibilidad y alcance. Mejorando espacios para tú bienestar, optimizando la distribución y funcionalidad.' });
    this.seoService.createLinkForCanonicalURL();


  }
}
