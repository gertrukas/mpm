import { Component } from '@angular/core';
import { SEOService } from 'src/app/services/seo.service';
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-alianzas-estrategicas',
  templateUrl: './alianzas-estrategicas.component.html',
  styleUrls: ['./alianzas-estrategicas.component.sass']
})
export class AlianzasEstrategicasComponent {
  secondaryItem: string = 'Alianzas estratégicas';
  item: string  = 'Beneficios';
  search: boolean  = false;
  titulo: string = this.secondaryItem;

  constructor(private title: Title,
              private meta: Meta,
              private seoService: SEOService,
  ) { }

  ngOnInit() {

    this.title.setTitle('Lounge & food MPM Alianzas estratégicas')
    this.meta.addTag( { name: 'description', href: '27 años apoyando a empresas en Certificaciones e implementaciones.' });
    this.seoService.createLinkForCanonicalURL();

  }
}
