import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url:string=`${environment.apiUrl}Team`;
  constructor(private httpClient:HttpClient) { }
  getAllTeams(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string)
  {
   let params= new HttpParams();
   if(PageNumber!==null && PageSize!==null)
   {
    params=params.append('pageNumber',PageNumber.toString());
    params=params.append('pageSize',PageSize.toString());
    params=params.append('searchValue',searchValue.toString());
    params=params.append('sortcolumn',sortcolumn.toString());
    params=params.append('sortcolumndir',sortcolumndir.toString());
   }
   return this.httpClient.get<any>(`${this.url}/GetTeams`,{observe:'response',params}).pipe(
    map(response=>
      {
        return response.body;
      })
   );
  }
 
  addTeam(team:any):Observable<any>
   {
      return this.httpClient.post<any>(`${this.url}/AddTeam`,team);
   }
  updateTeam(team:any):Observable<any>
   {
      return this.httpClient.put<any>(`${this.url}/UpdateTeam`,team);
  }
  deleteTeam(id:number):Observable<any>
   {
      return this.httpClient.delete<any>(`${this.url}/DeleteTeam/`+id);
   }
   TeamIsAlreadySigned(name:string,id:number):Observable<any>
   {
 return this.httpClient.get<any>(`${this.url}/TeamIsAlreadySigned/`+name+`/`+id);
   }
}
