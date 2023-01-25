import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient:HttpClient) { }

  getComments(missionId:any):Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}Comment/GetComments/`+missionId);
  }

  addComment(model: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}Comment/AddComment`, model);
  }
}
