import { Component } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Route } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { environment } from 'src/environments/environment';
import { SearchService } from "../../../services/search.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent {

    blog: Blog = {
      _id: '',
      name: '',
      author: 0,
      slug: '',
      intro: '',
      description: '',
      image: '',
      images: [],
      post_type: '',
      active: true,
      delete: false,
      date:  new Date(),
    };

    linkface: any = this.sanitizer.bypassSecurityTrustResourceUrl('');
    imglink: any;
    slug: string | undefined = '';
    isloading: boolean = false;
    view: boolean = false;

    constructor(private router: ActivatedRoute,
      private service: SearchService,
      private sanitizer: DomSanitizer,
      private titleService: Title,
      private metaService: Meta,
  ) {
      this.router.params.subscribe( params => {
      this.slug = params['slug']?.toString();
      this.getData(this.slug);
      //@ts-ignore
      // this.blog = JSON.parse(blog);
      this.titleService.setTitle( 'Heron Pazzi / comunicado / ' + this.blog.name );
      this.metaService.updateTag({ property: 'og:url', content: environment.pageUrl + 'blog/' + this.blog.slug});
      this.metaService.updateTag({ property: 'og:title', content: this.blog.name});
      this.metaService.updateTag({ property: 'og:description', content: this.blog.intro});




      let ilink = 'https://backend.can-inn.com/uploads/news/' + this.blog.image;

      this.metaService.updateTag({ property: 'og:image', content: ilink });

      let link = 'https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fcan-inn.com%2Fblog%2F'
        + this.blog.slug + '&width=450&layout=standard&action=like&size=small&share=true&height=35&appId=875029200167861';


      this.linkface = this.sanitizer.bypassSecurityTrustResourceUrl(link);
      this.view = true;
  });

}

  getData(slug: any) {
    this.isloading = true;
    this.service.getBlog(slug).subscribe(response => {
      console.log(response);
      this.blog = response.blog;
      this.isloading = false;
    }, error => {
      console.error(error);
      this.isloading = false;
    });
  }


  ngOnInit() {
    this.titleService.setTitle(this.blog.name);
  }

}
