import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobDegreeService {

  constructor(private httpClient:HttpClient) { }

  getJObDegree(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.httpClient.get<any>(`${environment.apiUrl}JobDegree/GetJobDegree`  , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }

  addJobDegree(model: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}JobDegree/AddJobDegree`, model);
  }
  updateJobDegree(model: any): Observable<any> {      
    return this.httpClient.put<any>(`${environment.apiUrl}JobDegree/UpdateJobDegree`, model
    );
  }
  deleteJobDegree(id:any):Observable<any>
  {
    return this.httpClient.delete(`${environment.apiUrl}JobDegree/DeleteJobDegree/`+id );
  }
  isNameRepeated(name:string,id:number):Observable<any>
  {
return this.httpClient.get<any>(`${environment.apiUrl}JobDegree/IsNameRepeated/`+name+`/`+id);
  }
}
