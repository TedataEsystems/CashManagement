import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobDegree } from 'src/app/model/job-degree';
import { User, UserList } from 'src/app/model/user-list';
import { UserolesList } from 'src/app/model/useroles-list';
import { UserService } from 'src/app/shared/service/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  isDisabled: boolean;
  isNameRepeated: boolean;
  dialogTitle: string = "";
  constructor(public dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private userService: UserService, private _router: Router) {
  }
  newuser1:User=new User();
  newUser = {
    id:0,
    name: "",
    team: "",
    jobNumber: 0,
    jobDegreeid: 0,
    roleId: 0,
    createdBy: "",
    updatedBy: ""


  };
  userRoles: UserolesList[] = [];
  jobDegrees: JobDegree[] = [];
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    jobNumber: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    name: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    team: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    jobDegree: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    userRole: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),



  })
  user = { jobNum: "" }

  ngOnInit() {
    if (this.data.dialogTitle !== "اضافة جديد") {
      this.dialogTitle = 'تعديل';
    }
    else {
      this.dialogTitle = this.data.dialogTitle;
    }
    this.form;
    this.userService.getUserlists().subscribe(response => {
      this.jobDegrees = response?.data.jobDegrees;
      this.userRoles = response?.data.userRoles;
    });
    if (this.data) {

      this.form.controls['Id'].setValue(this.data.id);
      this.form.controls['jobNumber'].setValue(this.data.jobNumber);
      this.form.controls['name'].setValue(this.data.name);
      this.form.controls['team'].setValue(this.data.team);
      this.form.controls['jobDegree'].setValue(this.data.jobDegreeId);
      this.form.controls['userRole'].setValue(this.data.roleId);
      //console.log(this.data);


    }
  }





  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.data.dialogTitle == "اضافة جديد") 
    {
      this.newUser.name = this.form.value.name;
    this.newUser.team = this.form.value.team;
    this.newUser.jobNumber = this.form.value.jobNumber;
    this.newUser.roleId = this.form.value.userRole;
    this.newUser.jobDegreeid = this.form.value.jobDegree;
    this.userService.addUser(this.newUser).subscribe();
    }
    else
    {
      console.log(this.form.value,"This is the form ")
      this.newuser1.id=this.form.value.Id;
      this.newuser1.name = this.form.value.name;
      this.newuser1.team = this.form.value.team;
      this.newuser1.jobNumber = this.form.value.jobNumber;
      this.newuser1.roleId = this.form.value.userRole;
      this.newuser1.jobDegreeid = this.form.value.jobDegree;
      this.userService.updateUser(this.newuser1).subscribe(res=>{console.log(res,"from uodate")});
    }
   

    this.toastr.success(':: Submitted successfully');
    this.onClose();
    this.dialogRef.close('save');
    // this._router.navigate(['/user'] );

  }

  onClose() {

    this.form.reset();

    this.dialogRef.close('save');

  }
  onCheckJobNumIsalreadysign() {
    this.user.jobNum = this.form.value.jobNumber;
    console.log("ok i am here before call function")
    this.userService.jobNumberIsAlreadyExist(this.user.jobNum.toString()).subscribe(res => {
      console.log("ok i am now here inside the function")
      console.log(this.user.jobNum, "inside subscribe");
      //not asign before
      if (res.status == true) {
        this.isDisabled = false;
        this.isNameRepeated = false;
      }
      //already exsit
      else {
        this.isDisabled = true;
        this.isNameRepeated = true;
      }
    });
  }


}
