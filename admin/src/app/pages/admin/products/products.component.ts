import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from "../../../interfaces/product";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import { ProductsService } from "../../../services/admin/products.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgForm } from "@angular/forms";
import { AuthService, UserType } from "../../../modules/auth";
import { UploadsService } from "../../../services/admin/uploads.service";
import { CategoriesService } from "../../../services/admin/categories.service";
import { Category } from "../../../interfaces/category";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('btn') btn: ElementRef;

  categories: Category[]=[];
  products: Product[]=[];
  productDialog: boolean;
  unit: boolean;
  product = {
    _id: '',
    name: '',
    slug: '',
    description: '',
    intro: '',
    date: '',
    model: '',
    key: '',
    new: '',
    size: '',
    categories: [],
    image: '',
    images: [],
    active: false,
    delete: false,
  };
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  submitted: boolean;
  selectedProducts: Product[];
  roles:any[]=[];
  statuses: any[];
  types: any[];
  files: File[] = [];
  loading: boolean = true;
  image:any;
  imageInit:any;
  thumbnail:any;
  create:boolean=false;
  pError:boolean=false;
  role={};
  private unsubscribe: Subscription[] = [];
  signedUser$: Observable<UserType>;


  constructor(private titleService: Title,
              private cdr: ChangeDetectorRef,
              private serviceCategories: CategoriesService,
              private uploads: UploadsService,
              private service: ProductsService,
              private auth: AuthService) {
    this.titleService.setTitle("Productos");
    const loadingSubscr = this.isLoading$
        .asObservable()
        .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.statuses = [
      {label: 'Activo', value: true},
      {label: 'In Activo', value: false},
    ];
    this.getData();
    this.getDataCategories();
    this.signedUser$ = this.auth.currentUserSubject.asObservable();
  }

  setUnit(){
    if (this.unit){
      this.unit = false;
    } else {
      this.unit = true;
    }
  }

  getData(){
    this.service.getProducts().subscribe(response => {
      this.products = response.products;
      this.loading = false;
      this.cdr.detectChanges();
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: error.error.msg,
        timer: 2000
      });
      this.cdr.detectChanges();
    });
  }
  getDataCategories(){
    this.serviceCategories.getCategories().subscribe(response => {
      this.categories = response.categories;
      this.loading = false;
      this.cdr.detectChanges();
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: error.error.msg,
        timer: 2000
      });
      this.cdr.detectChanges();
    });
  }



  replaceImage(image: any){
    image.onerror = '';
    image.src = 'assets/images/missing.png'
  }

  created() {
    this.product = {
      _id: '',
      name: '',
      slug: '',
      description: '',
      intro: '',
      date: '',
      model: '',
      key: '',
      new: '',
      size: '',
      categories: [],
      image: '',
      images: [],
      active: false,
      delete: false,
    };
    this.create=true;
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    // @ts-ignore
    this.product = {...product};
    this.productDialog = true;
    this.create=false;
    this.pError=false;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  isObjEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  saveProduct(form: NgForm){
    console.log(form.value.description);
    if (this.create) {
      this.store(
          form.value.name,
          form.value.description,
          form.value.intro,
          form.value.model,
          form.value.key,
          form.value.new,
          form.value.size,
          form.value.categories
          );
    }
    else {
      this.update(
          form.value.name,
          form.value.description,
          form.value.intro,
          form.value.model,
          form.value.key,
          form.value.new,
          form.value.size,
          form.value.categories
      );
    }
    this.productDialog = false;
    this.product = {
      _id: '',
      name: '',
      slug: '',
      description: '',
      intro: '',
      date: '',
      model: '',
      key: '',
      new: '',
      size: '',
      categories: [],
      image: '',
      images: [],
      active: false,
      delete: false,
    };
    this.pError=false;
  }

  store(name: string, description: string, intro: string, model: string, key: string, news: string, size: string, categories: any) {
    this.isLoading$.next(true);
    let _categories: any[] = [];
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', name);
    params.append('intro', intro);
    params.append('description', description);
    params.append('key', key);
    params.append('model', model);
    params.append('new', news);
    params.append('size', size);
    // @ts-ignore
    categories.forEach(category => {
      _categories.push(category._id);
    });
    params.append('categories', _categories.toString());
    for(let p=0;this.files.length>p;p++){
      params.append('image', this.files[p]);
    }
    if (this.image != ''){
      params.append('file', this.image);
    }
    console.log(categories);
    this.service.postProduct(params).subscribe( response => {
      this.products.push(response.product);
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'El producto se creó con exíto.',
        timer: 2000
      });
      this.image = '';
      this.thumbnail = '';
    }, error => {
      console.log(error);
      let msg;
      if (error.error.errors > 0){
        msg = error.error.errors[0].msg;
      } else {
        msg = error.error
      }
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: msg,
        timer: 2000
      });
      this.cdr.detectChanges();
    });
  }

  update(name: string, description: string, intro: string, model: string, key: string, news: string, size: string, categories: any) {
    this.isLoading$.next(true);
    let _categories: any[] = [];
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', name);
    params.append('intro', intro);
    params.append('description', description);
    params.append('key', key);
    params.append('model', model);
    params.append('new', news);
    params.append('size', size);
    // @ts-ignore
    categories.forEach(category => {
      _categories.push(category._id);
    });
    params.append('categories', _categories.toString());
    for(let p=0;this.files.length>p;p++){
      params.append('image', this.files[p]);
    }
    if (this.image != ''){
      params.append('file', this.image);
    }
    this.service.putProduct(this.product._id, params).subscribe( response => {
      const index = this.products.findIndex(item => item._id == response.product._id);
      this.products[index] = response.product;
      this.isLoading$.next(false);
      this.getData();
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'El producto se actualizo con exíto.',
        timer: 3000
      });
      this.image = '';
      this.thumbnail = '';
    }, error => {
      console.log(error);
      let msg;
      if (error.error.errors > 0){
        msg = error.error.errors[0].msg;
      } else {
        msg = error.error
      }
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: msg,
        timer: 2000
      });
      this.cdr.detectChanges();
    });
  }


  active(product: string, option: boolean){
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('id', product);
    params.append('option', option.toString());
    this.service.activeProduct(params).subscribe(response => {
      let active = '';
      const index = this.products.findIndex(item => item._id == response.product._id);
      this.products[index] = response.product;
      this.isLoading$.next(false);
      this.getData();
      if (response.product.active){
        active = 'activo';
      } else {
        active = 'des activo';
      }
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: `El producto se ${active} con exíto.`,
        timer: 2000
      });
    }, error => {
      console.log(error);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: error.error.msg,
        timer: 2000
      });
      this.cdr.detectChanges();
    });
  }

  delete(product: string){
    Swal.fire({
      title: '¿Esta seguro que decea eliminar el producto?',
      text: '¡Esta apunto de eliminar el producto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.isLoading$.next(true);
        this.service.deleteProduct(product).subscribe(response => {
          const index = this.products.findIndex(item => item._id == response.product._id);
          this.products.splice(index, 1);
          this.isLoading$.next(false);
          this.cdr.detectChanges();
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El producto se elimino con exíto.',
            timer: 2000
          });
        }, error => {
          console.log(error);
          this.isLoading$.next(false);
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: error.error.msg,
            timer: 2000
          });
          this.cdr.detectChanges();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelado',
            'No se elimino el producto',
            'error'
        )
      }
    })
  }


  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.cdr.detectChanges();
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.cdr.detectChanges();
  }

  clearDropZone(){
    this.files.splice(0);
    this.cdr.detectChanges();
  }

  getImage(e: any){
    let file = e.target.files[0];
    this.image = file;
    this.uploadImage(file);
  }

  uploadImage(file: any){
    let reader = new FileReader();
    reader.onload = (e) => {
      //@ts-ignore
      this.thumbnail = e.target.result;
      this.cdr.detectChanges();
    }

    reader.readAsDataURL(file);
  }

  deleteImageGallery(img: string){
    this.isLoading$.next(true);
    this.uploads.deleteUploadGallery('products', this.product._id, img).subscribe(response => {
      console.log(response);
      this.product = response.model;
      this.getData();
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: `La imagen se eliminocon exíto.`,
        timer: 2000
      });
      this.cdr.detectChanges();
    }, error => {
      let message;
      if(error.status == 400){
        message = error.error.msg;
      } else {
        message = 'Se encontro un error, comunicate con el administrador del web-site';
      }
      console.log(error);
      this.isLoading$.next(false);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: message,
        timer: 2000
      });
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
