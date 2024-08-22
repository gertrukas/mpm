import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = environment.apiUrl + '/blogs';
  urlSearch = environment.apiUrl + '/blogs/public';
  token = '';
  headers:any;

  constructor(private http: HttpClient) {}


  getSearch(page: number, item: string){
    let items = '?item=' + item;
    let pages = '';
    if (page != 0){
      pages = '&page=' + page;
    }
    return this.http.get<any>(`${this.urlSearch}/${items}${pages}`);
  }

  getBlogs(page: any = null, item: any = null){
    let items = '';
    let pages = '';
    if (item && page) {
      items = '?item=' + item
      pages = '&page=' + page;
      return this.http.get<any>(`${this.urlSearch}/${items}${pages}`);
    } else if(page) {
      items = '?item= '
      pages = '&page=' + page;
      return this.http.get<any>(`${this.urlSearch}/${items}${pages}`);
    } else {
      return this.http.get<any>(`${this.urlSearch}`);
    }
  }

  getBlog(slug: string){
    return this.http.get<any>(`${this.urlSearch}/${slug}`);
  }
}
