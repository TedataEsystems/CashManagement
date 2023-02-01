import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobDegree } from 'src/app/model/job-degree';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { JobDegreeService } from 'src/app/shared/service/job-degree.service';
import { AddJobComponent } from '../Forms/add-job/add-job.component';

@Component({
  selector: 'app-job-degree',
  templateUrl: './job-degree.component.html',
  styleUrls: ['./job-degree.component.css']
})
export class JobDegreeComponent implements OnInit {


  searchKey: string = '';
  listName: string = '';
  loading: boolean = true;
  isNameUpdatedRepeated: boolean = false;
  editUsr: any;
  editdisabled: boolean = false;
  isShowDiv = false;
  dis=false;
 isDisabled: boolean = false;
  isNameRepeated: boolean = false;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['Id','Staffdegree', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
 jobDegreeList:JobDegree[]=[]
 jobDegree = {id: 0,name:'',createdBy:''}

  constructor(private titleService: Title,private jobDegreeService:JobDegreeService,private toastr:ToastrService, private router: Router,
    private route: ActivatedRoute, private dailogService: DeleteService, private dialog:MatDialog
  ) {
    this.titleService.setTitle('الدرجة الوظيفية');

  }

 // show: boolean = false;
  loader: boolean = false;

  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),

  })
  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.jobDegreeService.getJObDegree(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.jobDegreeList = response?.data;
      this.jobDegreeList.length = response?.pagination.totalCount;
      this.dataSource = new MatTableDataSource<any>(this.jobDegreeList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })
    setTimeout(() => this.loader = false, 2000);

  }

  ngOnInit(): void {

    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);

  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }



  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();
    this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");


  }




  editROw(r: any) {

    this.editUsr = r.id;
    this.editdisabled = true;
  }



  cancelEdit() {

    this.editdisabled = false;
    this.isNameUpdatedRepeated = false;
    this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);

  }
  OnEditSubmit(row: any) {
    let jobDegree={
      id:row.id,
      name:row.name,
      updatedBy: localStorage.getItem('userName') || ''
    };

    this.jobDegreeService.updateJobDegree(jobDegree).subscribe(res=>{
      if (res.status) {
        setTimeout(() => {
          this.loader = false;
        }, 1500)
        this.toastr.success(" update successfully");
        this.form['controls']['Name'].setValue('');
        this.form['controls']['Id'].setValue(0);
        this.cancelEdit();
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
      }
    })


  }
  addJobDegree(){

    // const dialogGonfig = new MatDialogConfig();
    // dialogGonfig.data= {dialogTitle: " "};
    // dialogGonfig.disableClose = true;
    // dialogGonfig.autoFocus = true;
    // dialogGonfig.width = "50%";
    // dialogGonfig.panelClass = 'modals-dialog';
    //  this.dialog.open(AddApproveStatusComponent,dialogGonfig)
    this.form.reset();
    this.isShowDiv = !this.isShowDiv;

  }

  // onAddSubmit() {
  //   this.jobDegree.id = this.form.value.id;
  //   this.jobDegree.name=this.form.value.Name
  //    this.jobDegree.createdBy = localStorage.getItem('userName') || '';
  //   if (this.form.invalid || this.form.value.name == '') {
  //      if (this.form.value.name == ' ')
  //       //  this.setReactValue(Number(0), "");
  //   //   this.isDisabled = false;

  //     return;
  //   }
  //   else{
  //     // this.isDisabled=true;

  //   this.jobDegreeService.addJobDegree(this.jobDegree).subscribe(res=>
  //     {
  //        this.form['controls']['Name'].setValue('');
  //         this.form['controls']['Id'].setValue(0);
  //       this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);

  //     }
  //   )
  //   this.isShowDiv = false;

  //   }
  // }



  onAddSubmit() {
    let jobDegree={
      id:this.form.value.id,
      name:this.form.value.Name,
      createdBy:localStorage.getItem('userName') || ''
    };

    if (this.form.valid ) {
      this.jobDegreeService.addJobDegree(jobDegree).subscribe(res=>
      {
         this.form['controls']['Name'].setValue('');
          this.form['controls']['Id'].setValue(0);
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);

      }
    )
    this.isShowDiv = false;

    }

  }

  onDelete(r:any) {

    this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
      if(res)
      {
        this.jobDegreeService.deleteJobDegree(r.id).subscribe(res=>{
        this.toastr.success(' successfully Deleted');
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
        }),
        error => { this.toastr.error(' An Error Occured') }
      }
    })



  }

  IsAddNameRepeated() {
    let status={
    name:this.form.value.Name,
    id:0
  };
  if(this.form.valid)
  {
    this.jobDegreeService.isNameRepeated(status.name, status.id).subscribe(
      res => {
        if (res.status == true) {
          this.isDisabled = false;
          this.isNameRepeated = false;


        } else {
          this.isDisabled = true;
          this.isNameRepeated = true;

        }

      });
  }}

  IsUpdateNameRepeated(row: any) {
    let status={
      name:row.name,
      id:row.id
    };
    if(row.name.length>0&&row.name!=' ')
    {
    this.jobDegreeService.isNameRepeated(status.name, status.id).subscribe(
      res => {
        if (res.status == true) {
          this.dis = false;
          this.isNameUpdatedRepeated = false;
        } else {
          this.dis = true;
          this.isNameUpdatedRepeated = true;
        }
      });
    }
    else{
this.dis=true;
    }
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
