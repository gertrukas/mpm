import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = environment.apiUrl + '/products';
  urlpublic = environment.apiUrl + '/products/public';
  token = '';
  headers:any;

  constructor(private http: HttpClient) {}


  getProducts(page: number, item: string){
    let items = '?item=' + item;
    let pages = '';
    if (page != 0){
      pages = 'page=' + page;
    }
    if (item){
      return this.http.get<any>(`${this.urlpublic}/${items}&${pages}`);
    } else {
      return this.http.get<any>(`${this.urlpublic}/?${pages}`);
    }
  }

  getProduct(slug: string){
    return this.http.get<any>(`${this.urlpublic}/${slug}`);
  }



}
