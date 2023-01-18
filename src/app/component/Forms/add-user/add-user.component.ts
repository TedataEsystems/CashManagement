import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobDegree } from 'src/app/model/job-degree';
import { UserList } from 'src/app/model/user-list';
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

  constructor(public dialogRef: MatDialogRef<AddUserComponent>, private toastr: ToastrService, private userService: UserService,private _router:Router) {
  }
  newUser = {
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
    this.form;
    this.userService.getUserlists().subscribe(response => {
      this.jobDegrees = response?.data.jobDegrees;
      this.userRoles = response?.data.userRoles;
    });
  }





  onSubmit() {
    if (this.form.invalid) 
    {
      return;
    }
    this.newUser.name = this.form.value.name;
    this.newUser.team = this.form.value.team;
    this.newUser.jobNumber = this.form.value.jobNumber;
    this.newUser.roleId = this.form.value.userRole;
    this.newUser.jobDegreeid = this.form.value.jobDegree;
    this.userService.addUser(this.newUser).subscribe(response => {
    });

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
