import { HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
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
    if(PageNumber!==null&& PageSize!==null)
    {
       params =params.append('pageNumber',PageNumber.toString());
       params=params.append('pageSize',PageSize.toString());
       params=params.append('searchValue',searchValue.toString());
       params=params.append('sortcolumn',sortcolumn.toString());
       params=params.append('sortcolumndir',sortcolumndir.toString());
    }
    
    return this.httpClient.get<any>(`${this.url}/GetMissions`,{observe:'response' , params}).pipe(
      map(response=>
        {
          return response.body;
        })
    )
  }
  upload(file:any,id:Number):Observable<any>
  {
    const formData = new FormData();
    formData.append('file',file,file.name);
   return this.httpClient.post<any>(`${this.url}/UploadedFile/`+id,formData);
  }
  addMission(mission:any):Observable<any>
  {
     return this.httpClient.post<any>(`${this.url}/AddMission`,mission);
  }
  updateMission(mission:any):Observable<any>
  {
    console.log(mission,"pppp")
     return this.httpClient.post<any>(`${this.url}/EditMission`,mission);
  }
  deleteMission(id:number):Observable<any>
  {
     return this.httpClient.delete<any>(`${this.url}/DeleteMission/`+id);
  }
  getLists():Observable<any>
  {
return this.httpClient.get<any>(`${this.url}/GetLists`);
  }
  AdvancedSearch(searchModel:any):Observable<any>
  {
    return this.httpClient.post<any>(`${this.url}/AdvancedSearch`, searchModel);
  }
  checkSameTeam(id:number):Observable<any>
  {
    console.log("CheckSameTeamseevice",id)
     return this.httpClient.get<any>(`${this.url}/CheckSameTeam/`+id);
  }
  CoverReportsIds:number[];
  CoverReport(CoverReportsIds):Observable<any>
  {
    console.log(this.CoverReportsIds)
   return this.httpClient.post<any>(`${this.url}/CoverReport`,CoverReportsIds);
  }
  DownloadAttach(id:number):any
  {
   return this.httpClient.get<any>(`${this.url}/DownloadFile/`+id,
  // {responseType: 'blob'});
  {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response'
  })
  }
  DeleteAttachFile(id:number):Observable<any>
  {
    return this.httpClient.delete<any>(`${this.url}/DeleteFile/`+id);
    }
}//end of service

