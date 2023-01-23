import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MissionList } from 'src/app/model/mission-list';
import { MissionType } from 'src/app/model/mission-type';
import { Status } from 'src/app/model/status';
import { UserList } from 'src/app/model/user-list';
import { MissionFormService } from 'src/app/shared/service/mission-form.service';
import { MissionService } from 'src/app/shared/service/mission.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  appear=false;

  file_store: FileList;
  file_list: Array<string> = [];
  file: File = null; // Variable to store file
  fileName: string;
  selectAll = false;
  userList: UserList[] = [];
  statusList: Status[] = [];
  missionTypeList: MissionType[] = [];
  constructor(public dialogRef: MatDialogRef<EditComponent>, public service: MissionFormService,
    private missionService: MissionService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.service.initializeFormGroup();
    this.missionService.getLists().subscribe(res => {
      if (res.status == true) {
        this.userList = res.usersList;
        this.statusList = res.statusesList;
        this.missionTypeList = res.missionTypesList;
      }
      else {
        this.toastr.warning(':failed');
      }
      if (this.data) {
        //set values of lists
        var userCount = 0;
        var statusCount = 0;
        var missionTypeCount = 0;
        for (var user of this.userList) {
          if (this.data.userId == user.id) {
            userCount++;
            this.service.form.controls['userId'].setValue(this.data.userId);
          }
        }
        if (userCount == 0) {
          this.service.form.controls['userId'].setValue(null);
        }
        for (var status of this.statusList) {
          if (this.data.statusId == status.id) {
            statusCount++;
            this.service.form.controls['statusId'].setValue(this.data.statusId);
          }
        }
        if (statusCount == 0) {
          this.service.form.controls['statusId'].setValue(null);
        }
        for (var missionType of this.missionTypeList) {
          if (this.data.missionTypeId == missionType.id) {
            missionTypeCount++;
            this.service.form.controls['missionTypeId'].setValue(this.data.missionTypeId);
          }
        }
        if (missionTypeCount== 0) {
          this.service.form.controls['missionTypeId'].setValue(null);
        }

        this.service.form.controls['id'].setValue(this.data.id);
       // this.service.form.controls['jobDegree'].setValue(this.data.jobDegree);
        this.service.form.controls['missionPurpose'].setValue(this.data.missionPurpose);
        this.service.form.controls['centerOfCost'].setValue(this.data.centerOfCost);
        this.service.form.controls['companyType'].setValue(this.data.companyType);
        this.service.form.controls['missionPlace'].setValue(this.data.missionPlace);
        this.service.form.controls['startDateMission'].setValue(this.data.startDateMission);
        this.service.form.controls['endDateMission'].setValue(this.data.endDateMission);
        this.service.form.controls['startDateStay'].setValue(this.data.startDateStay);
        this.service.form.controls['endDateStay'].setValue(this.data.endDateStay);
        this.service.form.controls['noOfNights'].setValue(this.data.noOfNights);
        this.service.form.controls['stay'].setValue(this.data.stay);
        this.service.form.controls['mealsAndIncidentals'].setValue(this.data.mealsAndIncidentals);
        this.service.form.controls['jobNumber'].setValue(this.data.jobNumber);
        this.service.form.controls['missionTypeCost'].setValue(this.data.missionTypeCost);
        this.service.form.controls['permissionRequest'].setValue(this.data.permissionRequest);
        this.service.form.controls['permissionDuration'].setValue(this.data.permissionDuration);
        this.service.form.controls['comment'].setValue(this.data.comment);
        this.service.form.controls['creationDate'].setValue(this.data.creationDate);
        this.service.form.controls['createdBy'].setValue(this.data.createdBy);
        this.service.form.controls['updateDate'].setValue(this.data.updateDate);
        this.service.form.controls['updateBy'].setValue(this.data.updateBy);
      }//end of if data
    })//end of subscribe
  }

  onSubmit() {
    if(!this.service.form.valid){
      return;
    }
    let mission = {
      id: this.service.form.value.id,
      jobDegree: this.service.form.value.jobDegree,
      missionPurpose: this.service.form.value.missionPurpose,
      centerOfCost: this.service.form.value.centerOfCost,
      companyType: this.service.form.value.companyType,
      missionPlace: this.service.form.value.missionPlace,
      startDateMission: this.service.form.value.startDateMission,
      endDateMission: this.service.form.value.endDateMission,
      startDateStay: this.service.form.value.startDateStay,
      endDateStay: this.service.form.value.endDateStay,
      noOfNights: this.service.form.value.noOfNights,
      stay: this.service.form.value.stay,
      mealsAndIncidentals: this.service.form.value.mealsAndIncidentals,
      jobNumber: this.service.form.value.jobNumber,
      missionTypeCost: this.service.form.value.missionTypeCost,
      permissionRequest: this.service.form.value.permissionRequest,
      permissionDuration: this.service.form.value.permissionDuration,
      comment: this.service.form.value.comment,
      creationDate: this.service.form.value.creationDate,
      createdBy: this.service.form.value.createdBy,
      updateBy: localStorage.getItem('usernam') || '',
      statusId: this.service.form.value.statusId,
      missionTypeId: this.service.form.value.missionTypeId,
      userId: this.service.form.value.userId
    }//end of object
    this.missionService.updateMission(mission).subscribe(res => {
      if (res.status == true) {
        this.toastr.success("updated successfully");
        this.service.form.reset();
        this.dialogRef.close('save');
      }
      else {
        this.toastr.warning("updated failed");
      }
    })

    this.onClose();
    this.dialogRef.close('save');

  }


  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    // this.service.form.reset();
    // this.service.initializeFormGroup();
    // this.notificationService.success(' Submitted successfully');
  }


  onClose() {
    this.service.form.reset();
     this.dialogRef.close();
    // this.service.form.reset();
    // this.service.initializeFormGroup();
    // this.dialogRef.close('save');

  }



  search(){
    this.appear =!this.appear
  }

  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.service.form.controls.attachFile.patchValue(`${f.name}${count}`);
    } else {
      this.service.form.controls.attachFile.patchValue("");
    }


    var fd = new FormData();
    this.file_list = [];
    for (let i = 0; i < this.file_store.length; i++) {
      fd.append("files", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }
  }

  handleSubmit(): void {
    var fd = new FormData();
    this.file_list = [];
    for (let i = 0; i < this.file_store.length; i++) {
      fd.append("files", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }
  }



  removeFile(i) {
    // this.file = null;
    // this.fileName = '';
    this.file_list.splice(i,1);
  }

}