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
import { EditMissionComponent } from '../Forms/edit-mission/edit-mission.component';
import { EditComponent } from '../Forms/edit/edit.component';
import { MissionDetailsComponent } from '../Forms/mission-details/mission-details.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  searchKey: string = '';

  loading: boolean = true;
  /////////////////
  missions: MissionList[] = [];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['all', 'id', 'jobNumber', 'jobDegree', 'user', 'missionPurpose', 'centerOfCost', 'companyType', 'missionPlace', 'startDateMission', 'endDateMission', 'noOfNights', 'stay',
    'mealsAndIncidentals', 'startDateStay', 'endDateStay', 'missionTypeCost', 'permissionRequest', 'permissionDuration', 'comment', 'createdBy',
    'updateBy', 'creationDate', 'updateDate', 'status', 'missionType','exportexpenses','exportmission', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingtype = ''
  editUsr: any;
  editdisabled: boolean = false;
  constructor(private titleService: Title, private toastr: ToastrService, private dialog: MatDialog,
    private router: Router, private route: ActivatedRoute, private dailogService: DeleteService, private missionService: MissionService
  ) {
    this.titleService.setTitle('المأموريات');

  }
  ////////////////pagenation variables/////////////////////////
  pageNumber = 1;
  pageSize = 100;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  loader: boolean = false;
  lastcol: string = 'Id';
  lastdir: string = 'asc';
  ///////////////
  /////pagenation////////
  getMisssions(pageNum: number, pagesize: number, searchValue: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.missionService.getAllMissions(pageNum, pagesize, searchValue, sortColumn, sortDir).subscribe(respose => {
      this.missions = respose?.data;
      // this.missions.length=respose?.pagenation.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.missions);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })//end of subscribe
    setTimeout(() => {
      this.loader = false
    }, (2000));

  }//end of getallmission
  //sort
  sortData(sort: any) {
    if (this.lastcol == sort.active && this.lastdir == sort.direction) {
      if (this.lastdir == 'asc') {
        sort.direction = 'desc';
      }
      else {
        sort.direction = 'asc';
      }
      console.log(sort.active, this.lastdir, 'if');
    }
    this.lastcol = sort.active;
    // if (this.lastdir == 'asc'){
    //   sort.direction = 'desc';}
    // else{
    //   sort.direction = 'asc';}
    this.lastdir = sort.direction;
    console.log(sort.active, this.lastdir, 'kk');
    this.getMisssions(1, 100, '', sort.active, this.lastdir);
  }
  //when empty search input
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  // when add search value and key up
  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();
    this.getMisssions(1, 100, searchData, this.sortColumnDef, "asc");
  }//applyfilter


  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  ////////end of pagenation//////
  ngOnInit(): void {
    this.getMisssions(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }
  //////add (open add component as dialog)
  addMission() {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { dialogTitle: "اضافة مأمورية" };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "70%";
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog.open(AddMissionComponent, dialogGonfig).afterClosed().subscribe(result => {
     // debugger
    // console.log("close");
      this.getMisssions(1, 100,'', this.sortColumnDef, this.SortDirDef)
    });
  }
  /////////////////delete
  onDelete(r: any) {
    this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {
        this.missionService.deleteMission(r.id).subscribe(res => {
            this.toastr.success(": deleted successfully");
            this.getMisssions(1,100,'',this.sortColumnDef,this.SortDirDef);
        },error => {  this.toastr.warning(": failed "); }
        )//deletemission
      }//end of if
    })//end of subscribe
  }//delete



  onEdit(row: any) {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { dialogTitle: " تعديل" };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "70%";
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog.open(EditComponent, { panelClass: 'modals-dialog', disableClose: true, autoFocus: true, width: "70%", data: row }).afterClosed().subscribe(result => {
      this.getMisssions(1, 100, '', this.sortColumnDef, this.SortDirDef)
    });


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




  exportPdf(){
    this.router.navigate(['/cover']);
  }
  exportMissionFormPdf(){

this.router.navigate(['/missionform'])
  }
  exportExpensesPdf(){
    this.router.navigate(['/expenses']);
  }


  onDetails(row){

    this.dialog.open(MissionDetailsComponent, { panelClass: 'modals-dialog', disableClose: true, width: "70%", data: row }).afterClosed().subscribe(result => {
      this.getMisssions(1, 100, '', this.sortColumnDef, this.SortDirDef)
    });

  }
  onEditMission(row){
    this.dialog.open(EditMissionComponent, { panelClass: 'edit-dialog', disableClose: true, width: "50%", data: row }).afterClosed().subscribe(result => {
      this.getMisssions(1, 100, '', this.sortColumnDef, this.SortDirDef)
    });

  }








}
