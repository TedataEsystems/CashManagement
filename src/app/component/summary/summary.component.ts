import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MissionList } from 'src/app/model/mission-list';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { MissionService } from 'src/app/shared/service/mission.service';
import { AddMissionComponent } from '../Forms/add-mission/add-mission.component';
import { EditComponent } from '../Forms/edit/edit.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  searchKey: string = '';

  loading: boolean = true;
  /////////////////
  missions:MissionList[]=[];
  ////////////////pagenation variables////////
  pageNumber = 1;
  pageSize = 100;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  loader: boolean = false;
  
  ///////////////

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['all','id','jobNumber','jobDegree','user','missionPurpose','centerOfCost','companyType','missionPlace','startDateMission','endDateMission','noOfNights','stay',
                                 'mealsAndIncidentals','startDateStay','endDateStay','missionTypeCost','permissionRequest','permissionDuration','comment','createdBy',
                                 'updateBy','creationDate','updateDate','status','missionType','action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingtype = ''

  editUsr: any;
  editdisabled: boolean = false;
  constructor(private titleService: Title,private toastr:ToastrService,private dialog:MatDialog ,
              private router: Router, private route: ActivatedRoute, private dailogService: DeleteService,private missionService:MissionService
  ) {
    this.titleService.setTitle('المأموريات');

  }
getMisssions(pageNum:number,pagesize:number,searchValue:string,sortColumn:string,sortDir:string)
{
this.loader=true;
this.missionService.getAllMissions(pageNum,pagesize,searchValue,sortColumn,sortDir).subscribe(respose=>
  {
   this.missions=respose?.data;
  // this.missions.length=respose?.pagenation.totalCount;
   this.dataSource=new MatTableDataSource<any>(this.missions);
   this.dataSource._updateChangeSubscription();
   this.dataSource.paginator=this.paginator as MatPaginator;
  })//end of subscribe
  setTimeout(() => {
    this.loader=false
  }, (2000));

}//end of getallmission



  ngOnInit(): void {
   
this.getMisssions(1,100,'',this.sortColumnDef,this.SortDirDef);
console.log(this.missions);
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

           // if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
    //   this.router.navigateByUrl('/login');
    // }
    // else {
      // this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {

      //   this.toastr.success(':: successfully Deleted');
      // })

      //}

  }



  // onselectcheckall(e:Event){}


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
