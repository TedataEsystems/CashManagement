import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserolesList } from 'src/app/model/useroles-list';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { UserRoleService } from 'src/app/shared/service/user-role.service';
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
  displayedColumns: string[] = ['id', 'name','createdBy' ,'creationDate', 'updatedBy','updateDate', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  userRoles:UserolesList[]=[];
  public colname: string = 'Id';
  public coldir: string = 'asc';
  editUsr: any;
  editdisabled: boolean = false;
  loader: boolean = false;
  isDisabled = false;
  isDisable = false;
  userRole = {id: 0,name:'',createdBy:''}
  // show: boolean = false;
  constructor(private titleService: Title,private toastr:ToastrService, private router: Router,
    private route: ActivatedRoute, private dailogService: DeleteService, private dialog:MatDialog,private userRoleService:UserRoleService
  ) 
  {
    this.titleService.setTitle('الصلاحيات');
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  })
  ngOnInit(): void {
    // if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    // {
    //   this.router.navigateByUrl('/login');
    // }

    this.getUserRoles(1, 100, '', this.sortColumnDef, this.SortDirDef);
  }
  getUserRoles(pageNum: number, pagesize: number, searchValue: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.userRoleService.getAllUserRoles(pageNum, pagesize, searchValue, sortColumn, sortDir).subscribe(respose => {
      this.userRoles = respose?.data;
      console.log(this.userRoles );
      console.log(respose);
      this.dataSource = new MatTableDataSource<any>(this.userRoles);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })//end of subscribe
    setTimeout(() => {
      this.loader = false
    }, (2000));

  }
  sortData(sort: any) {
    if (this.colname == sort.active && this.coldir == sort.direction) {
      if (this.coldir == 'asc')
        sort.direction == 'desc';
      else
        sort.direction == 'asc';
    }
    this.coldir = sort.direction;
    this.colname = sort.active;
    this.getUserRoles(1, 100, '', this.colname, this.coldir);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  onSearchClear() {
    // if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    // {
    //   this.router.navigateByUrl('/login');
    // }
    // else{
    this.searchKey = '';
    this.applyFilter();

  }
  applyFilter() {
    // if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    // {
    //   this.router.navigateByUrl('/login');
    // }
    // else{
    let searchData = this.searchKey.trim().toLowerCase();
    this.getUserRoles(1, 100, searchData, this.sortColumnDef, 'asc');
  }
  editROw(r: any) {

    this.editUsr = r.id;
    this.editdisabled = true;
  }
  cancelEdit() {

    this.editdisabled = false;
    this.isNameUpdatedRepeated = false;
    this.getUserRoles(1,100,'',this.sortColumnDef,this.SortDirDef);

  }
  updateEdit(row: any) {
    let userRoleEdit:UserolesList={
      id:row.id,
      name:row.name,
      createdBy:row.name,
      creationDate:row.creationDate,
      updatedBy:localStorage.getItem('usernam') || ''
    }
  this.userRoleService.updateUserRole(userRoleEdit).subscribe(res=>
    {this.loader = true;
        if(res.status==true)
        {
          this.toastr.success("updated successfully");
          this.getUserRoles(1,100,'',this.sortColumnDef,this.SortDirDef);
          this.form['controls']['name'].setValue('');
          this.form['controls']['id'].setValue(0);
        }
        else
        this.toastr.warning("failed");
    })//end of subscribe
      this.cancelEdit();
  }
  onDelete(r:any) {
 // if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
    //   this.router.navigateByUrl('/login');
    // }
    // else {

  this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
    if (res) {
      this.userRoleService.deleteUserRole(r.id).subscribe(res => {
        this.toastr.success(' successfully Deleted');
        this.getUserRoles(1, 100, '', this.sortColumnDef, this.SortDirDef);
      }, error => { this.toastr.warning('failed'); }
      )//end of subscribe
    }//end of if
  })//end of first subscriob

      //}

  }
  addRole() {
    console.log("from add role method");
    this.form.reset();
    console.log("from add role method after reset form");
    this.isShowDiv = !this.isShowDiv;
  }
  onCreateUpdate() {
    let userRole = {
      id: 0,
      name: this.form.value.name,
      // createdBy:localStorage.getItem('userName') || ''
    };
    console.log(this.form, "Form");
    console.log(this.form.valid,"valid or not ");
    if (this.form.valid) {
      this.userRoleService.addUserRole(userRole).subscribe(res => {
        console.log( "from subscribe Form");
        this.form['controls']['name'].setValue('');
        this.form['controls']['id'].setValue(0);
        this.getUserRoles(1, 100, '', this.sortColumnDef, this.SortDirDef);
      }
      )
      this.isShowDiv = false;
    }
  }
  onChecknameIsalreadysign()
  {
    this.userRole.id=0;
    console.log(this.userRole.id);
    this.userRole.name=this.form.value.name;
    this.userRoleService.userRoleIsAlreadySigned(this.userRole.name,this.userRole.id).subscribe(res=>
      {
        //not asign before
        if(res.status==true)
        {
          this.isDisabled = false;
          console.log(this.isDisabled,"true")
          this.isNameRepeated = false;
        }
        //already exsit
        else
        {
          this.isDisabled = true;
          console.log(this.isDisabled,"false")
          this.isNameRepeated = true;
        }
      })
  }
  onChecknameIsalreadysignWhenUpdate(element:any)
  {
   this.userRoleService.userRoleIsAlreadySigned(element.name,element.id).subscribe(res=>
    {
      if(res.status==true)
      {
        this.isDisabled=false;
        this.isNameUpdatedRepeated=false;
      }
      else
      {
        this.isDisabled=true;
        this.isNameUpdatedRepeated=true;
      }
    })
  }
}
