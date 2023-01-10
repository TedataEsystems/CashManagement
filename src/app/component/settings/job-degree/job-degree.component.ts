import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteService } from 'src/app/shared/service/delete.service';
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
  isNameRepeated: boolean = false;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['Id','Staffdegree', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();


  constructor(private titleService: Title,private toastr:ToastrService, private router: Router,
    private route: ActivatedRoute, private dailogService: DeleteService, private dialog:MatDialog
  ) {
    this.titleService.setTitle('المستخدمين');

  }

 // show: boolean = false;
  loader: boolean = false;

  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),

  })

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



  onDelete(r:any) {
 // if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
    //   this.router.navigateByUrl('/login');
    // }
    // else {
      this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {

        this.toastr.success(':: successfully Deleted');
      })

      //}

  }
  editROw(r: any) {

    this.editUsr = r.id;
    this.editdisabled = true;
  }



  cancelEdit() {

    this.editdisabled = false;
    this.isNameUpdatedRepeated = false;

  }
  updateEdit(row: any) {



        this.toastr.success(":: update successfully");

        // this.form['controls']['status'].setValue('');
        // this.form['controls']['id'].setValue(0);
        //   this.form.reset();
        this.cancelEdit();

  }
  onCreateUpdate() {

    this.isShowDiv = false;
  }//end of submit

  addJob(){
    // const dialogGonfig = new MatDialogConfig();
    // dialogGonfig.data= {dialogTitle: " "};
    // dialogGonfig.disableClose = true;
    // dialogGonfig.autoFocus = true;
    // dialogGonfig.width = "50%";
    // dialogGonfig.panelClass = 'modals-dialog';
    //  this.dialog.open(AddJobComponent,dialogGonfig)
    this.isShowDiv = !this.isShowDiv;
  }


}
