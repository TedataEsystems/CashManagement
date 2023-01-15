import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url:string=`${environment.apiUrl}User`;
  constructor(private httpClient:HttpClient) { }
  getUsers(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string)
  {
    let params= new HttpParams();
  //  console.log(PageNumber.toString(),PageSize.toString(),searchValue.toString(),sortcolumn.toString(),sortcolumndir.toString());
    if(PageNumber!==null&& PageSize!==null)
    {
       params =params.append('pageNumber',PageNumber.toString());
       params=params.append('pageSize',PageSize.toString());
       params=params.append('searchValue',searchValue.toString());
       params=params.append('sortcolumn',sortcolumn.toString());
       params=params.append('sortcolumndir',sortcolumndir.toString());
    }
    
    return this.httpClient.get<any>(`${this.url}/GetUsers`,{observe:'response' , params}).pipe(
      map(response=>
        {
          return response.body;
        })
    )
  }
  getUserById(id:number):Observable<any>
  {
     return this.httpClient.get<any>(`${this.url}`+id);
  }
  addUser(mission:any):Observable<any>
  {
     return this.httpClient.post<any>(`${this.url}/AddUser`,mission);
  }
  updateUser(mission:any):Observable<any>
  {
     return this.httpClient.post<any>(`${this.url}/UpdateUser`,mission);
  }
  deleteUser(id:number):Observable<any>
  {
     return this.httpClient.delete<any>(`${this.url}/DeleteUser/`+id);
  }
}