import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
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
  public colname: string = 'Id';
  public coldir: string = 'asc';
  loader: boolean = false;
  users:UserList[]=[];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @Input() param = 'file';


@ViewChild('LIST') template!:TemplateRef<any>;
 @ViewChild('fileInput') fileInput?: ElementRef;

 @ViewChild('data') data?: ElementRef;
  fileAttr = 'Choose File';
  fileAttrF = 'Choose File';
  htmlToAdd:string="";

fileuploaded:any;
  // displayedColumns: string[] = ['Num','Id', 'Name','Team','User','Staffdegree','Role', 'action'];
  displayedColumns: string[] = ['id','jobNumber', 'Name','Team','jobDegree','createdBy','creationDate',
  'updateBy', 'updateDate','action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();
  settingtype = ''

  editUsr: any;
  editdisabled: boolean = false;









  constructor(private titleService: Title,private toastr:ToastrService, private router: Router,private bottomSheet: MatBottomSheet,
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

//this is comment
  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();
    this.getUsers(1,100,searchData,this.sortColumnDef,this.SortDirDef)
  }

  onEdit(row:any){
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { dialogTitle: " تعديل" };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog.open(AddUserComponent,{ disableClose: true, autoFocus: true, width: "50%", data: row }).afterClosed().subscribe(result => {
      this.getUsers(1, 100, '', this.sortColumnDef, this.SortDirDef)
    });
  }



  onDelete(r:any) {
      this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
        if (res) {
          this.userService.deleteUser(r.id).subscribe(res => {
            this.toastr.success(':: successfully Deleted');
            this.getUsers(1, 100, '', this.sortColumnDef, this.SortDirDef);
          }, error => { this.toastr.warning('::failed'); }
          )//end of subscribe
        }//end of if
      })//end of first subscriob

          //}

  }
  addUser(){
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data= {dialogTitle: "اضافة جديد"};
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = 'modals-dialog';
     this.dialog.open(AddUserComponent,dialogGonfig).afterClosed().subscribe(res=>{
      this.getUsers(1,10, '', this.sortColumnDef, this.SortDirDef);
     });

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
    this.getUsers(1, 100, '', this.colname, this.coldir);
  }
  UploadPdf(){

      this.bottomSheet.open(this.template,{
          panelClass:'botttom-dialog-container',
          disableClose: true


      });

  }


  upLoadF(){

    const fd = new FormData();
    fd.append(this.param, this.fileuploaded);
  //   this.userService.addFromFile(fd).subscribe(res=>{
  //     if(res.status==true)
  //     {
  //       this.getUsers(1, 100, '', this.sortColumnDef, this.SortDirDef);
  //   this.fileAttr = 'Choose File';
  //   this.resetfile();
  this.toastr.success("File Uploaded")
    this.bottomSheet.dismiss();

  //      this.htmlToAdd=res.data
  //       console.log(res.data)
  //     }
  //     else
  //     {


  //      this.htmlToAdd=res.error;

  //     }
  //   }
  //   ,err=>{
  //     this.toastr.error("!! Fail")
  //     this.resetfile();
  //  }
  //   );


  }


  close(){
    this.resetfile();
   this.bottomSheet.dismiss();

   }


   resetfile() {

     //(this.fileInput as ElementRef).nativeElement.value = "";
     this.fileAttr = 'Choose File';

   }
   uploadFileEvtF(imgFile: any) {

    this.fileuploaded = imgFile.target.files[0];

    console.log(this.fileuploaded);

    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.prototype.forEach.call(imgFile.target.files, (file) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML25 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      (this.fileInput as ElementRef).nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

}
