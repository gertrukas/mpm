import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { ContactService } from "./contac.service";
import { catchError, finalize, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;


  constructor(private serviceContact: ContactService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }


  contact(name: string, telephone: string, email: string, message: string): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.serviceContact.contact(name, telephone, email, message).pipe(
      map( response => {
        return response;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
