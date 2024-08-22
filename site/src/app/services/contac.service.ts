import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

const API_URL = `${environment.apiUrl}`;
const ADMIN_URL = `${environment.adminUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  // public methods
  contact(name: string, telephone: string, email: string, message: string): Observable<any> {

    return this.http.post<any>(`${API_URL}/emails/send/contact`, {
      name,
      email,
      telephone,
      message,
    });
  }

  subscribe(email: string): Observable<any> {

    return this.http.post<any>(`${API_URL}/public/subscribe`, {
      email
    });
  }
}
