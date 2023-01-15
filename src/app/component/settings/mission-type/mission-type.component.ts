import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MissionType } from 'src/app/model/mission-type';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { MissionTypeService } from 'src/app/shared/service/mission-type.service';
import { AddMissonTypeComponent } from '../Forms/add-misson-type/add-misson-type.component';

@Component({
  selector: 'app-mission-type',
  templateUrl: './mission-type.component.html',
  styleUrls: ['./mission-type.component.css']
})
export class MissionTypeComponent implements OnInit {

  isShowDiv = false;
  isNameRepeated: boolean = false;
  searchKey: string = '';
  listName: string = '';
  loading: boolean = true;
  isNameUpdatedRepeated: boolean = false;
  editUsr: any;
  editdisabled: boolean = false;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['id', 'name', 'creationDate', 'createdBy', 'updateDate', 'updatedBy', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource();



  constructor(private titleService: Title, private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute, private dailogService: DeleteService, private dialog: MatDialog, private missionTypeService: MissionTypeService
  ) {
    this.titleService.setTitle('نوع المأموريات');

  }

  // show: boolean = false;
  loader: boolean = false;
  missionTypeList: MissionType[] = [];
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),

  })
  isDisable = false;
  missionType = {
    id: 0,
    name: '',
    createdBy: ''
  }
  //////pagenation
  isDisabled = false;
  pageNumber = 1;
  pageSize = 100;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  public colname: string = 'Id';
  public coldir: string = 'asc';
  getMissionTypes(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.missionTypeService.getAllMissionType(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.missionTypeList = response?.data;
      this.dataSource = new MatTableDataSource<any>(this.missionTypeList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })//end of sunscribe
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }//end getMissionTypes
  //sort
  sortData(sort: any) {
    if (this.colname == sort.active && this.coldir == sort.direction) {
      if (this.coldir == 'asc')
        sort.direction == 'desc';
      else
        sort.direction == 'asc';
    }
    this.coldir = sort.direction;
    this.colname = sort.active;
    this.getMissionTypes(1, 100, '', this.colname, this.coldir);
  }
  //empty search input
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  //search
  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();
    this.getMissionTypes(1, 100, searchData, this.sortColumnDef, 'asc');
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  ////////////////////////end of pagenation
  ngOnInit(): void {
    this.getMissionTypes(1, 100, '', this.sortColumnDef, this.SortDirDef);

  }
///////////////add crud operation/////////
//show and hide form to add 
addType() {
  this.isShowDiv = !this.isShowDiv;
}
//when add mission type name check if this name alredy exsit or not
onChecknameIsalreadysign()
{
  if(this.form.invalid){return ;}
  this.missionType.id=this.form.value.id;
  this.missionType.name=this.form.value.name;

  this.missionTypeService.MissionTypeIsAlreadySigned(this.missionType.name,this.missionType.id).subscribe(res=>
    {
      //not asign before
      if(res.status==true)
      {
        this.isDisabled = false;
        this.isNameRepeated = false;
      }
      //already exsit
      else
      {
        this.isDisabled = true;
        this.isNameRepeated = true;
      }
    })
}
//submit add
  onCreateUpdate() {
    this.isDisable = true;
    this.missionType.id = this.form.value.id;
    this.missionType.name = this.form.value.name;
    this.missionType.createdBy = localStorage.getItem('usernam') || '';
    if (this.form.invalid || this.form.value.name == '') {
      if (this.form.value.name == ' ')
        this.setReactValue(Number(0), "");
      this.isDisable = false;
      return;
    }//end of if
    else 
    {
  //add
  if(this.form.value.id==0)
  {
    this.isDisable=true;
    this.missionTypeService.addMissionType(this.missionType).subscribe(res=>
      {
        setTimeout(() => {
          this.loader = false;
        }, 1500)//end of settime out
        this.toastr.success('::add successfully');
        this.form['controls']['name'].setValue('');
        this.form['controls']['id'].setValue(0);
        this.getMissionTypes(1,100,'',this.sortColumnDef,this.SortDirDef);
      },error=>{this.toastr.warning('::failed');})//end of subscribe
  }
    }//end of else

    this.isShowDiv = false;
  }//end of submit
  setReactValue(id: number, val: any) {
    this.form.patchValue({
      id: id,
      name: val

    });

  }

//////end of add///////////////

///delete
onDelete(r: any) {

  this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
    if (res) {
      this.missionTypeService.deleteMissionType(r.id).subscribe(res => {
        this.toastr.success(':: successfully Deleted');
        this.getMissionTypes(1, 100, '', this.sortColumnDef, this.SortDirDef);
      }, error => { this.toastr.warning('::failed'); }
      )//end of subscribe
    }//end of if
  })//end of first subscriob
}//end of on delete
/////////////////end of delete

////////edit crud///////
//when in table click in  row make this row editable 
  editROw(r: any) {
    this.editUsr = r.id;
    this.editdisabled = true;
  }


//after make table editable we want to cancel the edit without doing any thing
  cancelEdit() {
    this.editdisabled = false;
    this.isNameUpdatedRepeated = false;
  }
  updateEdit(row: any) {

  let missionTypeEdit:MissionType={
    id:row.id,
    name:row.name,
    createdBy:row.name,
    creationDate:row.creationDate,
    updatedBy:localStorage.getItem('usernam') || ''
  }
this.missionTypeService.updateMissionType(missionTypeEdit).subscribe(res=>
  {this.loader = true;
      if(res.status==true)
      {
        this.toastr.success("::updated successfully");
        this.getMissionTypes(1,100,'',this.sortColumnDef,this.SortDirDef);
        this.form['controls']['name'].setValue('');
        this.form['controls']['id'].setValue(0);
        
      }
      else
      this.toastr.warning("::failed");
  })//end of subscribe
    this.cancelEdit();

  }

   
  onChecknameIsalreadysignWhenUpdate(element:any)
  {
   this.missionTypeService.MissionTypeIsAlreadySigned(element.name,element.id).subscribe(res=>
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
    }//,error=>{this.toastr.warning("::faild");}
    )
  }
 
  /////////////



 


}
