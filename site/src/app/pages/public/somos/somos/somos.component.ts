import { Component } from '@angular/core';
import { SEOService } from 'src/app/services/seo.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-somos',
  templateUrl: './somos.component.html',
  styleUrls: ['./somos.component.sass']
})

export class SomosComponent {
  item: string  = 'Quienes Somos';
  search: boolean  = false;

  constructor(private title: Title,
              private meta: Meta,
              private seoService: SEOService,
  ) { }

  ngOnInit() {

    this.title.setTitle('Lounge & food MPM les da la bienvenida')
    this.meta.addTag( { name: 'description', href: 'Desde 1997 contribuimos al bienestar y compromiso de las personas, facilitando la jornada laboral, mejorando la calidad de vida, productividad y resultados en las organizaciones.' });
    this.seoService.createLinkForCanonicalURL();

  }

}
