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
import { AddRoleComponent } from '../Forms/add-role/add-role.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {


  isShowDiv = false;
  isNameRepeated: boolean = false;
  searchKey: string = '';
  listName: string = '';
  loading: boolean = true;
  isNameUpdatedRepeated: boolean = false;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['Id','role', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();


  editUsr: any;
  editdisabled: boolean = false;
  constructor(private titleService: Title,private toastr:ToastrService, private router: Router,
    private route: ActivatedRoute, private dailogService: DeleteService, private dialog:MatDialog
  ) {
    this.titleService.setTitle('الصلاحيات');

  }
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),

  })
 // show: boolean = false;
  loader: boolean = false;



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
  addRole(){
    // const dialogGonfig = new MatDialogConfig();
    // dialogGonfig.data= {dialogTitle: " "};
    // dialogGonfig.disableClose = true;
    // dialogGonfig.autoFocus = true;
    // dialogGonfig.width = "50%";
    // dialogGonfig.panelClass = 'modals-dialog';
    //  this.dialog.open(AddRoleComponent,dialogGonfig)
    this.isShowDiv = !this.isShowDiv;
  }
  onCreateUpdate() {

    this.isShowDiv = false;
  }//end of submit


}
