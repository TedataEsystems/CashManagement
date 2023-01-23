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
import { MissionType } from 'src/app/model/mission-type';
import { Status } from 'src/app/model/status';
import { JobDegree } from 'src/app/model/job-degree';
import { UserService } from 'src/app/shared/service/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AdvancedSearch } from 'src/app/model/advanced-search';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  missionTypeList: MissionType[] = [];
  statusList: Status[] = [];
  jobDegreeList: JobDegree[] = [];

  searchKey: string = '';

  loading: boolean = true;
  /////////////////
  missions: MissionList[] = [];
 advSearchMission: AdvancedSearch = <AdvancedSearch>{};

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['all', 'id', 'jobNumber', 'jobDegree', 'user', 'missionPurpose', 'centerOfCost', 'companyType', 'missionPlace', 'startDateMission', 'endDateMission', 'noOfNights', 'stay',
    'mealsAndIncidentals', 'startDateStay', 'endDateStay', 'missionTypeCost', 'permissionRequest', 'permissionDuration', 'comment', 'createdBy',
    'updateBy', 'creationDate', 'updateDate', 'status', 'missionType','exportmission', 'action'];
    // 'updateBy', 'creationDate', 'updateDate', 'status', 'missionType','exportexpenses','exportmission', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingtype = ''
  editUsr: any;
  editdisabled: boolean = false;
  constructor(private titleService: Title, private toastr: ToastrService, private dialog: MatDialog,
    private router: Router, private route: ActivatedRoute, private dailogService: DeleteService, private missionService: MissionService,private userService: UserService
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
    }
    this.lastcol = sort.active;
    // if (this.lastdir == 'asc'){
    //   sort.direction = 'desc';}
    // else{
    //   sort.direction = 'asc';}
    this.lastdir = sort.direction;
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
    this.getMisssions(1,100,'',this.sortColumnDef,this.SortDirDef);
  }
  //////add (open add component as dialog)
  addMission() {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { dialogTitle: "اضافة مأمورية" };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog.open(AddMissionComponent,dialogGonfig).afterClosed().subscribe(result => {
     // debugger
      this.getMisssions(1,100,'',this.sortColumnDef,this.SortDirDef)
    });
  }
  /////////////////delete
  onDelete(r: any) {
    this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
      if (res) {
        this.missionService.deleteMission(r.id).subscribe(res => {
            this.toastr.success("Deleted Successfully");
            this.getMisssions(1,100,'',this.sortColumnDef,this.SortDirDef);
        },error => {  this.toastr.warning("failed "); }
        )//deletemission
      }//end of if
    })//end of subscribe
  }//delete



  onEdit(row: any) {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { dialogTitle: " تعديل" };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog.open(EditComponent, { panelClass: 'modals-dialog', disableClose: true, autoFocus: true, width: "50%", data: row }).afterClosed().subscribe(result => {
      this.getMisssions(1,100,'',this.sortColumnDef,this.SortDirDef)
    });


  }

  form: FormGroup = new FormGroup({
    createdDateFrom: new FormControl(''),
    createdDateTo: new FormControl(''),
    updatedDateTo: new FormControl(''),
    updatedDateFrom: new FormControl(''),
    startDateMission: new FormControl(''),
    endDateMission: new FormControl(''),
    startDateStay: new FormControl(''),
    endDateStay: new FormControl(''),
    createdBy: new FormControl(''),
    updatedBy: new FormControl(''),
    id: new FormControl(''),
    jobNumber: new FormControl(''),
    statusId: new FormControl(''),
    missionPurpose: new FormControl(''),
    userName: new FormControl(''),
    missionTypeId: new FormControl(''),
    missionPlace: new FormControl(''),
    mealsAndIncidentals: new FormControl(''),
    comment: new FormControl(''),
    jobDegreeId: new FormControl(''),
    noOfNights: new FormControl(''),
    companyType: new FormControl(''),
    permissionDuration: new FormControl(''),
    permissionRequest: new FormControl(''),
    missionTypeCost: new FormControl(''),

  });
  openAdvancedSearchPanel() {
    // this.panelOpenState = false;
    this.missionService.getLists().subscribe(res => {
      if (res.status == true) {
        this.missionTypeList = res.missionTypesList;
        this.statusList=res.statusesList
      }
    })
    this.userService.getUserlists().subscribe(res=>{
    if(res.status){
      this.jobDegreeList=res.data.jobDegrees;
    }
    })
  }

  AdvancedSearchSubmit() {
    // this.isFilterationData = true;
    // this.panelOpenState = true;
    this.loader = true;
    this.advSearchMission.createdDateFrom = this.form.value.createdDateFrom == "" ? null : this.form.value.createdDateFrom;
    this.advSearchMission.createdDateTo = this.form.value.createdDateTo == "" ? null : this.form.value.createdDateTo;
    //
    this.advSearchMission.updatedDateFrom = this.form.value.updatedDateFrom == "" ? null : this.form.value.updatedDateFrom;
    this.advSearchMission.updatedDateTo = this.form.value.updatedDateTo == "" ? null : this.form.value.updatedDateTo;
    //
    this.advSearchMission.startDateMission = this.form.value.startDateMission == "" ? null : this.form.value.startDateMission;
    this.advSearchMission.endDateMission = this.form.value.endDateMission == "" ? null : this.form.value.endDateMission;
    //
    this.advSearchMission.startDateStay = this.form.value.startDateMission == "" ? null : this.form.value.startDateStay;
    this.advSearchMission.endDateStay = this.form.value.endDateMission == "" ? null : this.form.value.endDateStay;
    this.advSearchMission.createdBy = this.form.value.createdBy;
    this.advSearchMission.updatedBy = this.form.value.updatedBy;
    this.advSearchMission.missionPurpose = this.form.value.missionPurpose;
    this.advSearchMission.jobNumber = Number(this.form.value.jobNumber);
    this.advSearchMission.noOfNights = Number(this.form.value.noOfNights);
    this.advSearchMission.missionTypeCost = Number(this.form.value.missionTypeCost);
    this.advSearchMission.comment = this.form.value.comment;

    // this.advSearchMission.id = Number(this.form.value.id);
    this.advSearchMission.companyType = this.form.value.companyType;
    this.advSearchMission.userName = this.form.value.userName;
    this.advSearchMission.missionPlace = this.form.value.missionPlace;
    this.advSearchMission.mealsAndIncidentals = Number(this.form.value.mealsAndIncidentals);
    this.advSearchMission.permissionDuration = this.form.value.permissionDuration;
    this.advSearchMission.permissionRequest = this.form.value.permissionRequest;
    this.advSearchMission.statusId = Number(this.form.value.statusId);
    this.advSearchMission.missionTypeId = Number(this.form.value.missionTypeId);
    this.advSearchMission.jobDegreeId = Number(this.form.value.jobDegreeId);
    console.log("ad", this.advSearchMission);
    this.missionService.AdvancedSearch(this.advSearchMission).subscribe(res => {
      this.missions = res as MissionList[];
      this.dataSource = new MatTableDataSource<any>(this.missions);
      this.dataSource.paginator = this.paginator as MatPaginator;
      this.dataSource.sort = this.sort as MatSort;
      setTimeout(() => this.loader = false, 3000);
      // this.form.reset();
    }
    )
  }


  IntialValCreateBy: string = "";
  IntialValDate: string = "";
  clearAdvancedSearch() {
    this.form.reset();
    this.getMisssions(1, 25, '', this.sortColumnDef, this.SortDirDef);
  }

  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
Ids=[];
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
   this.Ids = [];
   this.dataSource.data.forEach( (element:any) => {
    if(element.status=="approve"){
      this.Ids.push(element.id)}
});
  }//end of toggleAll
  

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }




  exportPdf(){
    console.log(this.selection.isSelected);
    //without choose rows or select all
    if(this.selection.selected.length==0){
      this.Ids=[];
       this.dataSource.data.forEach( (element:any) => {
          if(element.status=="approve"){
            this.Ids.push(element.id)}})
          } 
    this.router.navigate(['/cover']);
    this.Ids=[];
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
