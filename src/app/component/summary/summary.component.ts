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
import * as fileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import { LoadingService } from 'src/app/shared/service/loading.service';
var mimetype = [
  { ext: "txt", fileType: "text/plain" },
  { ext: "pdf", fileType: "application/pdf" },
  { ext: "png", fileType: "image/png" },
  { ext: "jpg", fileType: "image/jpeg" },
  { ext: "jpeg", fileType: "image/jpeg" },
  { ext: "gif", fileType: "image/gif" },
  { ext: "csv", fileType: "text/csv" },
  { ext: "doc", fileType: "application/vnd.ms-word" },
  { ext: "docx", fileType: "application/vnd.ms-word" },
  { ext: "xls", fileType: "application/vnd.ms-excel" },
  { ext: "msg", fileType: "application/vnd.ms-outlook" },
  { ext: "xlsx", fileType: "application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet" },

];

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {

  missionTypeList: MissionType[] = [];
  statusList: Status[] = [];
  jobDegreeList: JobDegree[] = [];

  searchKey: string = '';
  IsAdmin: boolean = true;
  Isnotapprove = false;
  warning = false;

  /////////////////
  missions: MissionList[] = [];
  advSearchMission: AdvancedSearch = <AdvancedSearch>{};


  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = [
    'all',
    'id',
    'jobNumber',
    'jobDegree',
    'user',
    'companyType',
    'missionPurpose',
    'missionType',
    'missionPlace',
    'missionTypeCost',
    'centerOfCost',


    'startDateMission',
    'endDateMission',
    'startDateStay',
    'endDateStay',

    'noOfNights',
    'stay',
    'mealsAndIncidentals',


    'permissionRequest',
    'permissionDuration',

    'comment',
    'createdBy',
    'creationDate',
    'updatedBy',
    'updateDate',

    'status',

    'exporAttach',
    'exportmission',
    'action',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingtype = '';
  editUsr: any;
  editdisabled: boolean = false;
  isCreator = false;
  constructor(
    private titleService: Title,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private dailogService: DeleteService,
    private missionService: MissionService,
    private userService: UserService,
    private loader: LoadingService,
    private _router: Router
  ) {
    this.titleService.setTitle('المأموريات');
  }
  ////////////////pagenation variables/////////////////////////
  pageNumber = 1;
  pageSize = 100;
  sortColumnDef: string = 'Id';
  SortDirDef: string = 'asc';

  lastcol: string = 'Id';
  lastdir: string = 'asc';
  ///////////////
  /////pagenation////////
  getMisssions(pageNum: number, pagesize: number, searchValue: string, sortColumn: string, sortDir: string) {

    // this.loader.busy();
    this.missionService.getAllMissions(pageNum, pagesize, searchValue, sortColumn, sortDir)
    .subscribe((respose) => {
        this.missions = respose?.data;
        this.dataSource = new MatTableDataSource<any>(this.missions);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator as MatPaginator;
        console.log(this.missions);
     
      }); //end of subscribe
    // setTimeout(()=>{
    //   this.loader.idle();
    // },2000)
  } //end of getallmission
  //sort
  sortData(sort: any) {
    if (this.lastcol == sort.active && this.lastdir == sort.direction) {
      if (this.lastdir == 'asc') {
        sort.direction = 'desc';
      } else {
        sort.direction = 'asc';
      }
    }
    this.lastcol = sort.active;
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
    this.getMisssions(1, 100, searchData, this.sortColumnDef, 'asc');
  } //applyfilter

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  ////////end of pagenation//////
  ngOnInit(): void {

    var role =localStorage.getItem("role");
    // localStorage.getItem("role").toLocaleLowerCase().replace(/\s/, '');
    var team = localStorage.getItem("team");
    //role is creator and not efo cash team
    if (role == '1' && team != "1") {
      this.IsAdmin = false;
    }

    else {
      this.IsAdmin = true;
    }

//if creator or super admin
    if (role == "1"||role=='3') {
      this.isCreator = true;
    }

    this.getMisssions(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }
  //next previous page
  pageIn = 0;
  public pIn: number = 0;
  pagesizedef: number = 100;
  previousSizedef: number = 100;
  pageChanged(event: any) {
    //this.loading = true;
    this.pIn = event.pageIndex;
    this.pageIn = event.pageIndex;
    this.pagesizedef = event.pageSize;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.previousSizedef = previousSize;
    this.getRequestdataNext(previousSize, pageSize, pageIndex + 1, '', this.sortColumnDef, this.SortDirDef)
    let previousIndex = event.previousPageIndex;
  }
  getRequestdataNext(cursize: number, pageSize: number, pageNum: number, search: string, sortColumn: string, sortDir: string) {
    this.missionService.getAllMissions(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
      if (res.status == true) {
        console.log(res);
        this.missions.length = cursize;
        this.missions.push(...res?.data);
        this.missions.length = res.pagination?.totalCount;
        this.dataSource = new MatTableDataSource<any>(this.missions);
        this.dataSource._updateChangeSubscription();
        this.dataSource.paginator = this.paginator as MatPaginator;
      }
      else this.toastr.error(res.error)
    }, err => {
      if (err.status == 401)
        this._router.navigate(['/login'], { relativeTo: this.route });
      else
        this.toastr.error("! Fail");
    })
  }
  //////add (open add component as dialog)
  addMission() {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { dialogTitle: 'اضافة مأمورية' };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = '50%';
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog
      .open(AddMissionComponent, dialogGonfig)
      .afterClosed()
      .subscribe((result) => {
        this.getMisssions(1, 100, '', this.sortColumnDef, this.SortDirDef);
      });
  }
  /////////////////delete
  onDelete(r: any) {
    this.dailogService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.missionService.deleteMission(r.id).subscribe(
            (res) => {
              this.toastr.success('Deleted Successfully');
              this.getMisssions(1, 100, '', this.sortColumnDef, this.SortDirDef);
            },
            (error) => {
              this.toastr.warning('failed ');
            }
          ); //deletemission
        } //end of if
      }); //end of subscribe
  } //delete

  onEdit(row: any) {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { dialogTitle: ' تعديل' };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = '50%';
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog
      .open(EditComponent, {
        panelClass: 'modals-dialog',
        disableClose: true,
        autoFocus: true,
        width: '50%',
        data: row,
      })
      .afterClosed()
      .subscribe((result) => {
        if (this.form.value == '') {
          this.getMisssions(1, 100, '', this.sortColumnDef, this.SortDirDef);
        }
        else {
          this.AdvancedSearchSubmit();
        }
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
    this.missionService.getLists().subscribe((res) => {
      if (res.status == true) {
        this.missionTypeList = res.missionTypesList;
        this.statusList = res.statusesList;
      }
    });
    this.userService.getUserlists().subscribe((res) => {
      if (res.status) {
        this.jobDegreeList = res.data.jobDegrees;
      }
    });
  }

  AdvancedSearchSubmit() {
    // this.isFilterationData = true;
    // this.panelOpenState = true;

    this.loader.busy();

    this.advSearchMission.createdDateFrom =
      this.form.value.createdDateFrom == ''
        ? null
        : this.form.value.createdDateFrom;
    this.advSearchMission.createdDateTo =
      this.form.value.createdDateTo == ''
        ? null
        : this.form.value.createdDateTo;
    //
    this.advSearchMission.updatedDateFrom =
      this.form.value.updatedDateFrom == ''
        ? null
        : this.form.value.updatedDateFrom;
    this.advSearchMission.updatedDateTo =
      this.form.value.updatedDateTo == ''
        ? null
        : this.form.value.updatedDateTo;
    //
    this.advSearchMission.startDateMission =
      this.form.value.startDateMission == ''
        ? null
        : this.form.value.startDateMission;
    this.advSearchMission.endDateMission =
      this.form.value.endDateMission == ''
        ? null
        : this.form.value.endDateMission;
    //
    this.advSearchMission.startDateStay =
      this.form.value.startDateMission == ''
        ? null
        : this.form.value.startDateStay;
    this.advSearchMission.endDateStay =
      this.form.value.endDateMission == '' ? null : this.form.value.endDateStay;
    this.advSearchMission.createdBy = this.form.value.createdBy;
    this.advSearchMission.updatedBy = this.form.value.updatedBy;
    this.advSearchMission.missionPurpose = this.form.value.missionPurpose;
    this.advSearchMission.jobNumber = Number(this.form.value.jobNumber);
    this.advSearchMission.noOfNights = Number(this.form.value.noOfNights);
    this.advSearchMission.missionTypeCost = Number(
      this.form.value.missionTypeCost
    );
    this.advSearchMission.comment = this.form.value.comment;

    this.advSearchMission.id = Number(this.form.value.id);
    this.advSearchMission.companyType = this.form.value.companyType;
    this.advSearchMission.userName = this.form.value.userName;
    this.advSearchMission.missionPlace = this.form.value.missionPlace;
    this.advSearchMission.mealsAndIncidentals = Number(
      this.form.value.mealsAndIncidentals
    );
    this.advSearchMission.permissionDuration =
      this.form.value.permissionDuration;
    this.advSearchMission.permissionRequest = this.form.value.permissionRequest;
    this.advSearchMission.statusId = Number(this.form.value.statusId);
    this.advSearchMission.missionTypeId = Number(this.form.value.missionTypeId);
    this.advSearchMission.jobDegreeId = Number(this.form.value.jobDegreeId);

    this.missionService
      .AdvancedSearch(this.advSearchMission)
      .subscribe((res) => {
        this.missions = res as MissionList[];
        this.dataSource = new MatTableDataSource<any>(this.missions);
        this.dataSource.paginator = this.paginator as MatPaginator;
        this.dataSource.sort = this.sort as MatSort;
        setTimeout(() => {
          this.loader.idle();
        }, 2000)
      });
  }
  exportAttach(row: any) {
    this.missionService.DownloadAttach(row.attachFileId).subscribe(res => {
      const linkSource =
        'data:' + res.type + ';base64,' + res.data;
      const downloadLink = document.createElement('a');
      const fileName = res.name;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();

    });
  }






  IntialValCreateBy: string = '';
  IntialValDate: string = '';
  clearAdvancedSearch() {
    this.form.reset();
    this.getMisssions(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }

  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  Ids = [];
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
    //this.Ids = [];

  } //end of toggleAll

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1
      }`;
  }

  exportPdf() {
    this.Ids = [];
    //without choose rows or select all and click on download
    if (this.selection.selected.length == 0) {
      // this.toastr.warning('Please select approved row');
      //   return
      this.dataSource.data.forEach((element: any) => {
        if (element.status == "approved") {
          this.Ids.push(element.id)
        }
        this.missionService.CoverReportsIds = this.Ids;
        this.router.navigateByUrl('/mission/cover');
      })
    }

    else {
      // when select all
      if (this.isAllSelected()) {
        this.dataSource.data.forEach((element: any) => {
          if (element.status == "approved") {
            this.Ids.push(element.id)
          }
        })
        this.missionService.CoverReportsIds = this.Ids;
        this.router.navigateByUrl('/mission/cover');
      }
      //select specific rows
      else {
        this.selection.selected.forEach((element: any) => {
          if (element.status == "approved") {
            this.Ids.push(element.id)
            this.Isnotapprove = false;
            this.warning = false;
          }
          else {
            this.Isnotapprove = true;
            this.warning = true;
          }

        })

        if (this.Isnotapprove && this.warning) {
          this.toastr.warning(`some rows is not approved`, 'PLease select approved row');
          return
        }
        else {
          this.missionService.CoverReportsIds = this.Ids;
          this.router.navigateByUrl('/mission/cover');
        }
      }
    }

    this.Ids = [];
  }
  exportMissionFormPdf(element) {
    this.missionService.missionForm = element;
    this.router.navigateByUrl('/mission/missionform')
  }
  exportExpensesPdf() {
    this.router.navigateByUrl('/mission/expenses');
  }

  onDetails(row) {
    this.dialog
      .open(MissionDetailsComponent, {
        panelClass: 'modals-dialog',
        disableClose: true,
        width: '70%',
        data: row,
      })
      .afterClosed()
      .subscribe((result) => {
        this.getMisssions(1, 100, '', this.sortColumnDef, this.SortDirDef);
      });
  }
  onEditMission(row) {
    this.dialog
      .open(EditMissionComponent, {
        panelClass: 'edit-dialog',
        disableClose: true,
        width: '50%',
        data: row,
      })
      .afterClosed()
      .subscribe((result) => {
        this.getMisssions(1, 100, '', this.sortColumnDef, this.SortDirDef);
      });
  }
}
