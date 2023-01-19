import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserList } from 'src/app/model/user-list';
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
  addUser(user:any):Observable<any>
  {
     return this.httpClient.post<any>(`${this.url}/AddUser`,user);
  }
  updateUser(user:any):Observable<any>
  {
     return this.httpClient.put<any>(`${this.url}/UpdateUser`,user);
  }
  deleteUser(id:number):Observable<any>
  {
     return this.httpClient.delete<any>(`${this.url}/DeleteUser/`+id);
  }
  getUserlists():Observable<any>
  {
     return this.httpClient.get<any>(`${this.url}/GetLists/`);
  }
  jobNumberIsAlreadyExist(name:string):Observable<any>
   {
    console.log("this is the service");
    console.log(name,"in the service");
    return this.httpClient.get<any>(`${this.url}/JobNumberExist/`+name);
   }
   public importExcelFile(file : any)
   {
     return this.httpClient.post<any>(this.url + '/importExcelFile' , file );
   }
   public getEmptyDataEXel():Observable < Blob >
  {
    return this.httpClient.get(`${this.url}/ExportEmptyExcel`,
    {responseType: 'blob'}); 
  }
}
