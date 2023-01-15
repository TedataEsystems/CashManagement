import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient:HttpClient) { }

  getStatus(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${environment.apiUrl}Status/GetStatus`  , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }

  addStatus(model: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}Status/AddStatus`, model);
  }
  updateStatus(model: any): Observable<any> {      //cahnge to model
    return this.httpClient.put<any>(`${environment.apiUrl}Status/UpdateStatus`, model
    );
  }
  deleteStatus(id:any):Observable<any>
  {
    console.log(`${environment.apiUrl}Status/DeleteStatus`+id);
    return this.httpClient.delete(`${environment.apiUrl}Status/DeleteStatus/`+id );
  }
 
  isNameRepeated(name:string,id:number):Observable<any>
  {
return this.httpClient.get<any>(`${environment.apiUrl}Status/IsNameRepeated/`+name+`/`+id);
  }
 
}
