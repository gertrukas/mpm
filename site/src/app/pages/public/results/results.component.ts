import { Component, OnInit } from '@angular/core';
import { Blog } from "../../../interfaces/blog";
import { ActivatedRoute, Router } from "@angular/router";
import { SearchService } from "../../../services/search.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit{

  blogs: Blog[]= [];
  item: string  = '';
  search: boolean  = false;
  private actualPage: number = 1;
  isloading: boolean = false;
  countBlogs: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: SearchService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const item = params.get('item');
      if (item) {
        this.item = item
        this.search = true
        this.sheared(1, item);
      } else {
        this.item = '';
        this.search = false;
        this.getDataAll();
      }
    });
  }


  getDataAll() {
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

  sheared(page: number, item: any) {
    this.isloading = true;
    this.blogs = [];
    this.service.getBlogs(page, item).subscribe(response => {
      for(let i=0;response.blogs.length>i;i++){
        this.blogs.push(response.blogs[i]);
      }
      this.countBlogs = response.countBlogs;
      this.isloading = false;
    }, error => {
      console.error(error);
      this.isloading = false;
    });
  }

  shearedPlus() {
    this.isloading = true;
    this.actualPage = this.actualPage + 1;
    this.service.getBlogs(this.actualPage, this.item).subscribe(response => {
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
