import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {BehaviorSubject, first, Observable, Subscription} from "rxjs";
import { GeneralService } from "../../../services/general.service";



@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.sass']
})
export class ContactoComponent implements OnInit, OnDestroy{

  secondaryItem: string = 'Contacto';
  item: string  = 'Contacto';
  search: boolean  = false;
  titulo: string = this.secondaryItem;


  defaultContact: any = {
    name: ' ',
    email: '',
    phone: '',
    message: '',
  };
  // @ts-ignore
  contactForm: FormGroup;
  sendCorrect: boolean = false;
  sendError: boolean = false;
  hasError: boolean | undefined;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean = false;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/


  constructor(private fb: FormBuilder,
              private generalService: GeneralService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void{
    this.initForm();
    this.contactForm.controls['name'].setValue(undefined)

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.contactForm.controls;
  }

  initForm() {
    this.contactForm = this.fb.group({
      name: [
        this.defaultContact.email,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      email: [
        this.defaultContact.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(10),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      phone: [
        this.defaultContact.phone,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      message: [
        this.defaultContact.message,
        Validators.compose([
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(500),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    this.sendError = false;
    this.isLoading$.next(true);
    const contactSubscr = this.generalService
      // @ts-ignore
      .contact(this.f.name.value, this.f.phone.value, this.f.email.value, this.f.message.value)
      .pipe(first())
      .subscribe(response => {
        if(response  !== undefined) {
          // @ts-ignore
          this.contactForm.controls.name.setValue('')
          // @ts-ignore
          this.contactForm.controls.email.setValue('');
          // @ts-ignore
          this.contactForm.controls.phone.setValue('');
          // @ts-ignore
          this.contactForm.controls.message.setValue('');
          this.sendCorrect = true;
        } else {
          this.isLoading$.next(false);
          this.sendError = true;
        }
      }, error => {
        console.log(error);
        this.sendError = true;
      });
    this.unsubscribe.push(contactSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }


}


