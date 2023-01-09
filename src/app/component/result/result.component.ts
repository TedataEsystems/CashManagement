import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { EditComponent } from '../edit/edit.component';



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
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  searchKey:string ='' ;
  constructor(private title:Title,private dialogService: DeleteService, public toastr: ToastrService,private dialog: MatDialog ){

    this.title.setTitle("Result")

  }

  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  displayedColumns: string[] = ['CallDate','CustName', 'User', 'Serial', 'MonitorName' , 'Status' ,'Action'];
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





    onEdit(row:any){


       const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data= {dialogTitle: " Edit"};
      dialogGonfig.disableClose = true;
      dialogGonfig.autoFocus = true;
      dialogGonfig.width = "50%";
      dialogGonfig.panelClass = 'modals-dialog';
       this.dialog.open(EditComponent,dialogGonfig)


    }



    onDelete(){
     // this.dialogService.openConfirmDialog();
     this.dialogService.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {
        // this.service.deleteDailyOperation(r.id).subscribe(
        //   rs => {
           this.toastr.success(':: successfully Deleted');
        //     this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
        //   },
        //   error => { this.toastr.error(':: An Error Occured') }
        // );
      }
    });
}

}
