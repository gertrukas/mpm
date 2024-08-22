import {Component, OnInit} from '@angular/core';
import { ProductsService } from "../../../services/products.service";
import { Product } from "../../../interfaces/product";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import {Category} from "../../../interfaces/category";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  product: Product = {
    _id: '',
    name: '',
    slug: '',
    description: '',
    intro: '',
    date: new Date(),
    model: '',
    key: '',
    new: '',
    size: '',
    // @ts-ignore
    categories: [],
    image: '',
    images: [],
    active: false,
    delete: false,
  };
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = false;
  slug: string | undefined = '';

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private service: ProductsService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.slug = params['slug']?.toString();
      this.getData(this.slug);
    });
  }

  getData(slug: any) {
    this.isLoading$.next(true);
    this.service.getProduct(slug).subscribe(response => {
      this.product = response.product;
      console.log(response)
      this.isLoading$.next(false);
    }, error => {
      console.error(error);
      this.isLoading$.next(false);
    });
  }

}
