import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/model/login';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // Url="${environment.apiUrl}";
  constructor(private httpClient: HttpClient) { }
  login(usermodel: Login): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}account/Login`, usermodel);
  }
  logout(): Observable<any> 
  {
    return this.httpClient.get<any>(`${environment.apiUrl}account/Logout`);
  }

}
