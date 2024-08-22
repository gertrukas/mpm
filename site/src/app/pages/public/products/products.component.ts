import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../../services/products.service";
import {Product} from "../../../interfaces/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  item: string  = '';
  private actualPage: number = 1;
  isloading: boolean = false;

  constructor(private service: ProductsService) {
  }

  ngOnInit() {
    this.getData(1, this.item);
  }

  getData(page: number, item: any) {
    this.isloading = true;
    this.products = [];
    this.service.getProducts(page, item).subscribe(response => {
      for(let i=0;response.products.length>i;i++){
        this.products.push(response.products[i]);
      }
      this.isloading = false;
    }, error => {
      console.error(error);
      this.isloading = false;
    });
  }

}
