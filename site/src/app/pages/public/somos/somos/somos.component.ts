import { Component, OnInit } from '@angular/core';
import { SEOService } from 'src/app/services/seo.service';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-somos',
  templateUrl: './somos.component.html',
  styleUrls: ['./somos.component.sass']
})

export class SomosComponent {
 
  item: string  = 'Quienes Somos';
  search: boolean  = false;
  titulo: string = this.item;

  constructor(private title: Title,
              private meta: Meta,
              private seoService: SEOService,
  ) { }

  ngOnInit() {

    this.title.setTitle('Lounge & food MPM les da la bienvenida');

    this.meta.updateTag({ name: 'description', content: 'cambio de descripción' });
    this.seoService.createLinkForCanonicalURL();


  }

}