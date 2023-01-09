import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';


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
  constructor(private title:Title){

    this.title.setTitle("History")

  }

  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  displayedColumns: string[] = ['Id', 'User' ,'Creationdate', 'action' ,'Details'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngOnInit(){

  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;}

    onSearchClear(){
      this.searchKey ='';
      this.applyFilter();
    }
    applyFilter(){
      this.dataSource.filter=this.searchKey.trim().toLowerCase();
    }




}
