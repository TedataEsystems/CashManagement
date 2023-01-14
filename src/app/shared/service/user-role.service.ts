import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private url:string=`${environment.apiUrl}UserRole`;
  constructor(private httpClient:HttpClient) {}
  getAllUserRoles(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string)
  {
   let params= new HttpParams();
   if(PageNumber!==null && PageSize!==null)
   {
   console.log("hi");
    params=params.append('pageNumber',PageNumber.toString());
    params=params.append('pageSize',PageSize.toString());
    params=params.append('searchValue',searchValue.toString());
    params=params.append('sortcolumn',sortcolumn.toString());
    params=params.append('sortcolumndir',sortcolumndir.toString());
   }
   return this.httpClient.get<any>(`${this.url}/GetRoles`,{observe:'response',params}).pipe(
    map(response=>
      {
        return response.body;
      })
   );
  }
  getUserRoleById(id:number):Observable<any>
  {
     return this.httpClient.get<any>(`${this.url}`+id);
  }
  addUserRole(userrole:any):Observable<any>
   {
      return this.httpClient.post<any>(`${this.url}/AddUserRole`,userrole);
   }
  updateUserRole(userrole:any):Observable<any>
   {
      return this.httpClient.post<any>(`${this.url}/UpdateUserRole`,userrole);
  }
  deleteUserRole(id:number):Observable<any>
   {
      return this.httpClient.delete<any>(`${this.url}/DeleteUserRole/`+id);
   }
   userRoleIsAlreadySigned(name:string,id:number):Observable<any>
   {
 return this.httpClient.get<any>(`${this.url}/UserRoleIsAlreadySigned/`+name+`/`+id);
   }

}
