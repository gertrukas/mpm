import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  constructor(private title: Title,
              @Inject(DOCUMENT) private doc: any,
              private meta: Meta
              ) {
  }
  setPageTitle(title: string) {
    this.title.setTitle(title);
  }
  getPageTitle() {
    return this.title.getTitle();
  }

  createLinkForCanonicalURL() {
    //const head = this.doc.head;
    const canonicalTag = this.meta.getTag('rel="canonical"');

    let link: HTMLLinkElement = this.doc.createElement('link');

    // link.setAttribute('rel', 'canonical');
    // this.doc.head.appendChild(link);
    // link.setAttribute('href', this.doc.URL);*/
    //console.log('el canonical ---->', canonicalTag);

    if (canonicalTag) {
      canonicalTag.parentNode?.removeChild(canonicalTag);
      this.meta.updateTag({ rel: 'canonical', href: this.doc.URL });
    } else {
      this.meta.addTag({ rel: 'canonical', href: this.doc.URL });
    }
  }



}
