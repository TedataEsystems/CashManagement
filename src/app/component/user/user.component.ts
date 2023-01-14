import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserList } from 'src/app/model/user-list';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { UserService } from 'src/app/shared/service/user.service';
import { AddUserComponent } from '../Forms/add-user/add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  searchKey: string = '';
  listName: string = '';
  loading: boolean = true;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  loader: boolean = false;
  users:UserList[]=[];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  // displayedColumns: string[] = ['Num','Id', 'Name','Team','User','Staffdegree','Role', 'action'];
  displayedColumns: string[] = ['id','jobNumber', 'Name','Team','jobDegree','createdBy','creationDate', 
  'updateBy', 'updateDate','action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingtype = ''

  editUsr: any;
  editdisabled: boolean = false;
  constructor(private titleService: Title,private toastr:ToastrService, private router: Router,
    private route: ActivatedRoute, private dailogService: DeleteService, private dialog:MatDialog,private userService:UserService
  ) {
    this.titleService.setTitle('المستخدمين');

  }

 // show: boolean = false;
  



  ngOnInit(): void {
    // if(localStorage.getItem("userName")==""||localStorage.getItem("userName")==undefined||localStorage.getItem("userName")==null)
    // {
    //   this.router.navigateByUrl('/login');
    // }
    this.getUsers(1, 100, '', this.sortColumnDef, this.SortDirDef);

  }
  getUsers(pageNum: number, pagesize: number, searchValue: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.userService.getUsers(pageNum, pagesize, searchValue, sortColumn, sortDir).subscribe(respose => {
      this.users = respose?.data;
     
      console.log(this.users );
      console.log(respose);
      this.dataSource = new MatTableDataSource<any>(this.users);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })//end of subscribe
    setTimeout(() => {
      this.loader = false
    }, (2000));

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
    this.getUsers(1,100,searchData,this.sortColumnDef,this.SortDirDef)
  }

  onEdit(row:any){

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
  addUser(){
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data= {dialogTitle: " "};
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = 'modals-dialog';
     this.dialog.open(AddUserComponent,dialogGonfig)
  }


}
