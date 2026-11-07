import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SEOService {
  constructor(private title: Title,
              private router: Router,
              @Inject(DOCUMENT) private doc: Document,
              private meta: Meta
              ) {
  }
  setPageTitle(title: string) {
    this.title.setTitle(title);
  }
  getPageTitle() {
    return this.title.getTitle();
  }

  setMetaDescription(description: string) {
    const existingMeta = this.meta.getTag('name="description"');

    if (existingMeta) {
      this.meta.removeTagElement(existingMeta);
    }

    this.meta.addTag({
      name: 'description',
      content: description
    });
  }

  // Dominio canónico fijo: evita que el SSR genere canonical con http:// o con www
  // (el servidor SSR ve las peticiones internas por HTTP y eso contaminaba el canonical)
  private readonly canonicalBaseUrl = 'https://mpisolutionsgroup.com';

  createLinkForCanonicalURL() {
    const url = this.canonicalBaseUrl + this.router.url;

    // Buscar etiqueta canonical existente y eliminarla si existe
    const existingLink = this.doc.head.querySelector("link[rel='canonical']");
    if (existingLink) {
      existingLink.remove();
    }

    // Crear y agregar nueva etiqueta canonical
    const link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.doc.head.appendChild(link);
  }



}
