import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { AddMissionComponent } from '../add-mission/add-mission.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  searchKey: string = '';

  loading: boolean = true;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['Id', 'Name','Team','Staffdegree','Costcenter','CompanyType','Location','Durationofstay','NightsNum','stay',
                                 'Meals','transition','Durationofmission','Missionpurpose','Permission','Durationofpermission',
                                 'Approvalmail', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingtype = ''

  editUsr: any;
  editdisabled: boolean = false;
  constructor(private titleService: Title,private toastr:ToastrService,private dialog:MatDialog ,
              private router: Router, private route: ActivatedRoute, private dailogService: DeleteService
  ) {
    this.titleService.setTitle('المأموريات');

  }




  ngOnInit(): void {
    // if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    // {
    //   this.router.navigateByUrl('/login');
    // }

  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  onSearchClear() {
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    this.searchKey = '';
    this.applyFilter();}
  }


  applyFilter() {
    if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    {
      this.router.navigateByUrl('/login');
    }
    else{
    let searchData = this.searchKey.trim().toLowerCase();

  }

  }

  onEdit(row:any){
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data= {dialogTitle: " تعديل"};
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = 'modals-dialog';
     this.dialog.open(EditComponent,{panelClass:'modals-dialog',disableClose:true,autoFocus:true, width:"50%",data:row})

  }



  onDelete(r:any) {

            this.toastr.success(':: successfully Deleted');

  }



  onselectcheckall(e:Event){}


  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  addMission(){
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data= {dialogTitle: "اضافة مأمورية"};
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = 'modals-dialog';
     this.dialog.open(AddMissionComponent,dialogGonfig)
  }

}
