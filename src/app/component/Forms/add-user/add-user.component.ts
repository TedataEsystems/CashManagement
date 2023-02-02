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
 
  constructor(public dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService, private userService: UserService, private _router: Router) {
  }
  newuser1: User = new User();
  userRoles: UserolesList[] = [];
  jobDegrees: JobDegree[] = [];
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    jobNumber: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    name: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    team: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    jobDegree: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    userRole: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    // userName: new FormControl('', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    userName: new FormControl('')
})
  isDisabled: boolean;
  isNameRepeated: boolean;
  dialogTitle: string = "";
  jobDegreeExist: number = 0;
  userRoleExist: number = 0;
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
      if(response.status)
      {
        this.jobDegrees = response?.data.jobDegrees;
        this.userRoles = response?.data.userRoles;
      }
      if (this.data) {
        for (var jobDeg of this.jobDegrees) {
          if (this.data.jobDegreeId == jobDeg.id) {
            this.jobDegreeExist++;
            this.form.controls['jobDegree'].setValue(this.data.jobDegreeId);
          }
        }
        if (this.jobDegreeExist == 0) {
          this.form.controls['jobDegree'].setValue(null);
        }
        for (var userRol of this.userRoles) {
          if (this.data.roleId == userRol.id) {
            this.userRoleExist++;
            this.form.controls['userRole'].setValue(this.data.roleId);
          }
        }
        if (this.userRoleExist == 0) {
          this.form.controls['userRole'].setValue(null);
        }
        this.form.controls['Id'].setValue(this.data.id);
        this.form.controls['jobNumber'].setValue(this.data.jobNumber);
        this.form.controls['name'].setValue(this.data.name);
        this.form.controls['team'].setValue(this.data.team);
        this.form.controls['userName'].setValue(this.data.userName);
      }
     
    });
   
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.data.dialogTitle == "اضافة جديد") {
      this.newuser1.name = this.form.value.name;
      this.newuser1.team = this.form.value.team;
      this.newuser1.jobNumber = this.form.value.jobNumber;
      this.newuser1.roleId = this.form.value.userRole;
      this.newuser1.jobDegreeid = this.form.value.jobDegree;
      this.newuser1.createdBy = localStorage.getItem("userName");
      let userName = this.form.value.userName;
      if (userName != null) {
        this.userService.CheckUserName(userName).subscribe(res => {
          if (res.status == true) {
            this.newuser1.userName = this.form.value.userName;
            this.userService.addUser(this.newuser1).subscribe();
            this.toastr.success(' Submitted successfully');
          }
          else {
            this.toastr.error('User name is not exist you can not add a new user');
          }
        });
      }
      else {
        this.newuser1.userName = this.form.value.userName;
        this.userService.addUser(this.newuser1).subscribe();
        this.toastr.success(' Submitted successfully');
      }
    }
    else {
      this.newuser1.id = this.form.value.Id;
      this.newuser1.name = this.form.value.name;
      this.newuser1.team = this.form.value.team;
      this.newuser1.jobNumber = this.form.value.jobNumber;
      this.newuser1.roleId = this.form.value.userRole;
      this.newuser1.jobDegreeid = this.form.value.jobDegree;
      this.newuser1.updatedBy = localStorage.getItem("userName");
      let userName = this.form.value.userName;
      if (userName != null) {
        this.userService.CheckUserName(userName).subscribe(res => {
          if (res.status == true) {
            this.newuser1.userName = this.form.value.userName;
            this.userService.updateUser(this.newuser1).subscribe();
            this.toastr.success(' Submitted successfully');
          }
          else {
            this.toastr.error('User name is not exist you can not update this user');
          }
        });
      }
      else {
        this.newuser1.userName = this.form.value.userName;
        this.userService.updateUser(this.newuser1).subscribe();
        this.toastr.success(' Submitted successfully');
      }
    }
    this.onClose();
    this._router.navigate(['/user']);
  }
  onClose() {
    this.form.reset();
    this.dialogRef.close('save');
  }
  onCheckJobNumIsalreadysign() {
    this.user.jobNum = this.form.value.jobNumber;
    this.userService.jobNumberIsAlreadyExist(this.user.jobNum.toString()).subscribe(res => {
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
