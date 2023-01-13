import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionTypeService {
private url:string=`${environment.apiUrl}MissionType`;
  constructor(private httpClient:HttpClient) { }
  getAllMissionType(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string)
  {
   let params: HttpParams;
   if(PageNumber!==null && PageSize!==null)
   {
    params=params.append('pageNumber',PageNumber.toString());
    params=params.append('pageSize',PageSize.toString());
    params=params.append('searchValue',searchValue.toString());
    params=params.append('sortcolumn',sortcolumn.toString());
    params=params.append('sortcolumndir',sortcolumndir.toString());
   }
   return this.httpClient.get<any>(`${this.url}/GetMissionTypes`,{observe:'response',params}).pipe(
    map(response=>
      {
        return response.body;
      })
   );
  }
  addMissionType(missionType:any):Observable<any>
  {
     return this.httpClient.post<any>(`${this.url}/AddMissionType`,missionType);
  }
  updateMissionType(missionType:any):Observable<any>
  {
     return this.httpClient.post<any>(`${this.url}/UpdateMissionType`,missionType);
  }
  deleteMissionType(id:number):Observable<any>
  {
     return this.httpClient.delete<any>(`${this.url}/DeleteMissionType/`+id);
  }
}//end of service
