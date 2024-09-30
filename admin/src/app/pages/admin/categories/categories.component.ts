import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from "../../../interfaces/category";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Title } from "@angular/platform-browser";
import { CategoriesService } from "../../../services/admin/categories.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgForm } from "@angular/forms";
import { AuthService, UserType } from "../../../modules/auth";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @ViewChild('btn') btn: ElementRef;

  categories: Category[]=[];
  categoryDialog: boolean;
  unit: boolean;
  category:{ _id: string;  name: string; slug: string; description: string;  active: boolean; image: string }=<Category>{
    _id: '',
    name: '',
    slug: '',
    description: '',
    image:'',
    active: false,
  };
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  submitted: boolean;
  selectedCategories: Category[];
  roles:any[]=[];
  statuses: any[];
  types: any[];
  loading: boolean = true;
  image:any;
  imageInit:any;
  thumbnail:any;
  create:boolean=false;
  viewPassword:boolean=false;
  viewPass:boolean=false;
  pError:boolean=false;
  role={};
  private unsubscribe: Subscription[] = [];
  signedUser$: Observable<UserType>;


  constructor(private titleService: Title,
              private cdr: ChangeDetectorRef,
              private service: CategoriesService,
              private auth: AuthService) {
    this.titleService.setTitle("Categorias");
    const loadingSubscr = this.isLoading$
        .asObservable()
        .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.getData();
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
    this.service.getCategories().subscribe(response => {
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
    this.category = {
      _id: '',
      name: '',
      slug: '',
      description: '',
      image:'',
      active: false,
    };
    this.create=true;
    this.submitted = false;
    this.categoryDialog = true;
  }

  editCategory(category: Category) {
    this.category = {...category};
    this.categoryDialog = true;
    this.create=false;
    this.pError=false;
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  isObjEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }

  saveCategory(form: NgForm){
    console.log(form.value.description);
    if (this.create) {
      this.store(form.value.name, form.value.description);
    }
    else {
      this.update(form.value.name, form.value.description);
    }
    this.categoryDialog = false;
    this.category = {
      _id: '',
      name: '',
      slug: '',
      description: '',
      image:'',
      active: false,
    };
    this.pError=false;
  }

  store(name: string, description: string) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', name);
    params.append('description', description);
    if (this.image != ''){
      params.append('file', this.image);
    }
    this.service.postCategory(params).subscribe( response => {
      this.categories.push(response.category);
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'La Categoria se creó con exíto.',
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

  update(name: string, description: string) {
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('name', name);
    params.append('description', description);
    if (this.image != ''){
      params.append('file', this.image);
    }
    this.service.putCategory(this.category._id, params).subscribe( response => {
      const index = this.categories.findIndex(item => item._id == response.category._id);
      this.categories[index] = response.category;
      this.isLoading$.next(false);
      this.getData();
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'La Categoria se actualizo con exíto.',
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


  active(category: string, option: boolean){
    this.isLoading$.next(true);
    let params = new FormData();
    params.append('Content-Type', 'multipart/form-data');
    params.append('id', category);
    params.append('option', option.toString());
    this.service.activeCategory(params).subscribe(response => {
      let active = '';
      const index = this.categories.findIndex(item => item._id == response.category._id);
      this.categories[index] = response.category;
      this.isLoading$.next(false);
      this.getData();
      if (response.category.active){
        active = 'activo';
      } else {
        active = 'des activo';
      }
      this.cdr.detectChanges();
      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: `La Categoria se ${active} con exíto.`,
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

  delete(category: string){
    Swal.fire({
      title: '¿Esta seguro que decea eliminar la categoria?',
      text: '¡Esta apunto de eliminar la categoria!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.isLoading$.next(true);
        this.service.deleteCategory(category).subscribe(response => {
          const index = this.categories.findIndex(item => item._id == response.category._id);
          this.categories.splice(index, 1);
          this.isLoading$.next(false);
          this.cdr.detectChanges();
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'La Categoria se elimino con exíto.',
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
            'No se elimino la categoria',
            'error'
        )
      }
    })
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

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
