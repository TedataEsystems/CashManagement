import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
private url:string=`${environment.apiUrl}Mission`;
  constructor(private httpClient:HttpClient) { }
  getAllMissions(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string)
  {
    let params= new HttpParams();
    console.log(PageNumber.toString(),PageSize.toString(),searchValue.toString(),sortcolumn.toString(),sortcolumndir.toString());
    if(PageNumber!==null&& PageSize!==null)
    {
      
       params=params.append('pageSize',PageSize.toString());
       params=params.append('searchValue',searchValue.toString());
       params=params.append('sortcolumn',sortcolumn.toString());
       params=params.append('sortcolumndir',sortcolumndir.toString());
    }
    
    return this.httpClient.get<any>(`${this.url}/GetMissions`,{observe:'response' , params}).pipe(
      map(response=>
        {console.log(response.body);
          return response.body;
        })
    )
  }
  addMission(mission:any):Observable<any>
  {
     return this.httpClient.post<any>(`${this.url}/AddMission`,mission);
  }
  updateMission(mission:any):Observable<any>
  {
     return this.httpClient.post<any>(`${this.url}/EditMission`,mission);
  }
  deleteMission(id:number):Observable<any>
  {
     return this.httpClient.delete<any>(`${this.url}/DeleteMission/`+id);
  }
}//end of service

