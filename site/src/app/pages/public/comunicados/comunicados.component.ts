import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { SearchService } from 'src/app/services/search.service';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.component.html',
  styleUrls: ['./comunicados.component.sass']
})

export class ComunicadosComponent implements OnInit {

  blogs: Blog[]= [];
  item: string  = 'Comunicados';
  search: boolean  = false;
  private actualPage: number = 1;
  isloading: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: SearchService,
              private title: Title,
              private meta: Meta,
              private seoService: SEOService

  ) { }

  ngOnInit() {
    this.getData();

    this.title.setTitle('Lounge & food MPM les da la bienvenida')
    this.meta.addTag( { name: 'description', href: 'Desde 1997 contribuimos al bienestar y compromiso de las personas, facilitando la jornada laboral, mejorando la calidad de vida, productividad y resultados en las organizaciones.' });
    this.seoService.createLinkForCanonicalURL();



  }

  getData() {
    this.isloading = true;
    this.blogs = [];
    this.service.getBlogs().subscribe(response => {
      for(let i=0;response.blogs.length>i;i++){
        this.blogs.push(response.blogs[i]);
      }
      this.isloading = false;
    }, error => {
      console.error(error);
      this.isloading = false;
    });
  }

  getPlus() {
    this.isloading = true;
    this.actualPage = this.actualPage + 1;
    this.service.getBlogs(this.actualPage).subscribe(response => {
      for(let i=0;response.blogs.length>i;i++){
        this.blogs.push(response.blogs[i]);
      }
      this.isloading = false;
    }, error => {
      console.error(error);
      this.isloading = false;
    });
  }

}
