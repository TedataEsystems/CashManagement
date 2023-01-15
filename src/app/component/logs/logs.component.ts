import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Logs } from 'src/app/model/logs';
import { LogsService } from 'src/app/shared/service/logs.service';


export interface PeriodicElement {
  CallDate: string;
  CustName:string;
  User:string;
  Serial: string;
  MonitorName:string;
  Status:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { CallDate: 'oooo', CustName: 'Hydrogen',User:"user",  Serial: 'H',MonitorName: 'Hydrogen', Status: 'Hydrogen'},
  { CallDate: 'oooo', CustName: 'Hydrogen',User:"user",  Serial: 'H',MonitorName: 'Hydrogen', Status: 'Hydrogen'},
  { CallDate: 'oooo', CustName: 'Hydrogen',User:"user",  Serial: 'H',MonitorName: 'Hydrogen', Status: 'Hydrogen'},
  { CallDate: 'oooo', CustName: 'Hydrogen',User:"user",  Serial: 'H',MonitorName: 'Hydrogen', Status: 'Hydrogen'},
  { CallDate: 'oooo', CustName: 'Hydrogen',User:"user",  Serial: 'H',MonitorName: 'Hydrogen', Status: 'Hydrogen'},
  { CallDate: 'oooo', CustName: 'Hydrogen',User:"user",  Serial: 'H',MonitorName: 'Hydrogen', Status: 'Hydrogen'},
  { CallDate: 'oooo', CustName: 'Hydrogen',User:"user",  Serial: 'H',MonitorName: 'Hydrogen', Status: 'Hydrogen'},
  { CallDate: 'oooo', CustName: 'Hydrogen',User:"user",  Serial: 'H',MonitorName: 'Hydrogen', Status: 'Hydrogen'},
  { CallDate: 'oooo', CustName: 'Hydrogen',User:"user",  Serial: 'H',MonitorName: 'Hydrogen', Status: 'Hydrogen'}
];
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('1100ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class LogsComponent implements OnInit {

  searchKey:string ='' ;
  constructor(private title:Title,private toastr:ToastrService,private logsService:LogsService){

    this.title.setTitle("History")

  }

  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  displayedColumns: string[] = ['Id', 'userName' ,'creationDate','parentType', 'actionType' ,'Details'];
  dataSource = new MatTableDataSource();
  logsList:Logs[]=[]
  sortColumnDef: string = "Id";
  SortDirDef: string = 'desc';
  loader: boolean = false;


  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.logsService.getLogs(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.logsList = response?.data;
      this.logsList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.logsList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
      this.loader = false;

    })
    
  
  }
  ngOnInit(){
    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);

  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;}

    onSearchClear(){
      this.searchKey ='';
      this.applyFilter();
    }
    applyFilter(){
      let searchData = this.searchKey.trim().toLowerCase();
      this.getRequestdata(1, 100, searchData, this.sortColumnDef, "desc");
      // this.dataSource.filter=this.searchKey.trim().toLowerCase();
    }



    pageIn = 0;
    public pIn: number = 0;
    lastcol: string = 'Id';
    lastdir: string = 'asc';
   
  
    sortData(sort: any) {
  
        if (this.pIn != 0)
          window.location.reload();
        if (this.lastcol == sort.active && this.lastdir == sort.direction) {
          if (this.lastdir == 'asc')
            sort.direction = 'desc';
          else
            sort.direction = 'asc';
        }
        this.lastcol = sort.active; 
        this.lastdir = sort.direction;
        var c = this.pageIn;
        this.getRequestdata(1, 100, '', sort.active, this.lastdir);
      
    }
   



}
