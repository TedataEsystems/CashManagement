import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/model/team';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { TeamService } from 'src/app/shared/service/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
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
  teams:Team[]=[];
  public colname: string = 'Id';
  public coldir: string = 'asc';
  editUsr: any;
  editdisabled: boolean = false;
  loader: boolean = false;
  isDisabled = false;
  isAdmin:boolean=false;
  isDisable = false;
  team = {id: 0,name:'',createdBy:''}
  constructor(private titleService: Title,private toastr:ToastrService, private router: Router,
    private route: ActivatedRoute, private dailogService: DeleteService, private dialog:MatDialog,private teamService:TeamService
  )  { 
    this.titleService.setTitle('المجموعات');
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  })

  ngOnInit(): void {
    if(localStorage.getItem("role")=='3')
    {
      this.isAdmin=true;
    }
    this.getTeams(1,100,'',this.sortColumnDef,this.SortDirDef);

  }
  getTeams(pageNum: number,pagesize: number,searchValue: string,sortColumn: string,sortDir: string) {
    this.loader = true;
    this.teamService.getAllTeams(pageNum, pagesize, searchValue, sortColumn, sortDir).subscribe(respose => {
      this.teams = respose?.data;
      this.dataSource = new MatTableDataSource<any>(this.teams);
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
    this.getTeams(1,100,'',this.colname,this.coldir);
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
    this.getTeams(1,100,searchData,this.sortColumnDef,'asc');
  }
  editROw(r: any) {

    this.editUsr = r.id;
    this.editdisabled = true;
  }
  cancelEdit() {
    this.editdisabled = false;
    this.isNameUpdatedRepeated = false;
    this.getTeams(1,100,'',this.sortColumnDef,this.SortDirDef);
  }
  updateEdit(row: any) {
    let teamEdit:Team={
      id:row.id,
      name:row.name,
      creationDate:row.creationDate,
      updatedBy:localStorage.getItem('userName') || ''
    }
  this.teamService.updateTeam(teamEdit).subscribe(res=>
    {this.loader = true;
        if(res.status==true)
        {
          this.toastr.success("updated successfully");
          this.getTeams(1,100,'',this.sortColumnDef,this.SortDirDef);
          this.form['controls']['name'].setValue('');
          this.form['controls']['id'].setValue(0);
        }
        else
        this.toastr.warning("failed");
    })//end of subscribe
      this.cancelEdit();
  }
  onDelete(r:any) {
  this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
    if (res) {
      this.teamService.deleteTeam(r.id).subscribe(res => {
        this.toastr.success(' successfully Deleted');
        this.getTeams(1,100,'',this.sortColumnDef,this.SortDirDef);
      }, error => { this.toastr.warning('failed'); }
      )//end of subscribe
    }//end of if
  })//end of first subscriob
      
  }
  addTeam() {
    this.form.reset();
    this.isShowDiv = !this.isShowDiv;
  }
  onCreateUpdate() {
    let team = {
      id: 0,
      name: this.form.value.name,
      createdBy:localStorage.getItem('userName') || ''
    };
    if (this.form.valid) {
      this.teamService.addTeam(team).subscribe(res => {
        this.toastr.success("Succesfully added");
        this.form['controls']['name'].setValue('');
        this.form['controls']['id'].setValue(0);
        this.getTeams(1,100,'',this.sortColumnDef,this.SortDirDef);
      }
      )
      this.isShowDiv = false;
    }
  }
  onChecknameIsalreadysign()
  {
    this.team.id=0;
    this.team.name=this.form.value.name;
    if(this.form.valid)
    {
    this.teamService.TeamIsAlreadySigned(this.team.name,this.team.id).subscribe(res=>
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
  }
  onChecknameIsalreadysignWhenUpdate(element:any)
  {
    if(element.name.trim().length>0&&element.name.trim()!='')
    {
   this.teamService.TeamIsAlreadySigned(element.name,element.id).subscribe(res=>
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
  else{
    this.isDisabled=true;
        }

}

}
