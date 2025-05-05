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

    this.title.setTitle('Lounge & food MPM servicio de catering')
    this.meta.updateTag( { name: 'description', href: '¡Sorprende a tus empleados con un catering que lo tiene todo! Diseñado para organizaciones sin cocina, nuestro servicio se adapta a tus horarios y necesidades.' });
    this.seoService.createLinkForCanonicalURL();

  }
}
