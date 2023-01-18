
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MissionList } from 'src/app/model/mission-list';
import { MissionType } from 'src/app/model/mission-type';
import { Status } from 'src/app/model/status';
import { UserList } from 'src/app/model/user-list';
import { MissionFormService } from 'src/app/shared/service/mission-form.service';
import { MissionService } from 'src/app/shared/service/mission.service';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent implements OnInit {

  file_store: FileList;
  file_list: Array<string> = [];
  missionTypeList: MissionType[] = [];
missionList:MissionList[]=[];
  constructor(public dialogRef: MatDialogRef<AddMissionComponent>,
    public service: MissionFormService, public missionService: MissionService, 
    private toastr: ToastrService,private _router:Router) {
  }

  ngOnInit() {
    this.service.initializeFormGroup();
    this.missionService.getLists().subscribe(res => {
      if (res.status == true) {
        this.missionTypeList = res.missionTypesList;
      }
      else {
        this.toastr.warning(':failed');
      }
    })//end of subscribe
  }
  file: File = null; // Variable to store file
   // On file Select
   onChange(event) {
    this.file = event.target.files[0];
}
  onSubmit() {
    if(!this.service.form.valid) {
      return;
    }//end of if
    let missionn={
      id:this.service.form.value.id,
      jobDegree:this.service.form.value.jobDegree,
      missionPurpose: this.service.form.value.missionPurpose,
      centerOfCost:this.service.form.value.centerOfCost,
      companyType:this.service.form.value.companyType,
      missionPlace: this.service.form.value.missionPlace,
      startDateMission: this.service.form.value.startDateMission,
      endDateMission:this.service.form.value.endDateMission,
      startDateStay:this.service.form.value.startDateStay,
      endDateStay: this.service.form.value.endDateStay,
      noOfNights: this.service.form.value.noOfNights,
      stay:this.service.form.value.stay,
      mealsAndIncidentals:this.service.form.value.mealsAndIncidentals,
      jobNumber: this.service.form.value.jobNumber,
      missionTypeCost: this.service.form.value.missionTypeCost,
      permissionRequest:this.service.form.value.permissionRequest,
      permissionDuration: this.service.form.value.permissionDuration,
      comment:this.service.form.value.comment,
      //attachFile: this.file,
      file:'' ,
      creationDate:this.service.form.value.creationDate,
      createdBy:this.service.form.value.createdBy,
      updateDate:this.service.form.value.updateDate,
      updateBy:this.service.form.value.updateBy,
      statusId:this.service.form.value.statusId,
      missionTypeId:this.service.form.value.missionTypeId,
      userId:this.service.form.value.userId
    }//end of mission
    
    this.missionService.upload(this.file).subscribe(res=>{
      missionn.file=res.uniqueFileName;
      this.missionService.addMission(missionn).subscribe(res=>
        {
          if(res.status==true)
          {
            this.toastr.success(":added successfully");
            this.service.form.reset();
            this.dialogRef.close('save');
          }
          else
          {
            this.toastr.warning(":failed");
          }
        })

    })
    this.onClose();
    this.dialogRef.close('save');
    this._router.navigate(['/summary'] );
  }//end of submit
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose() {


    this.service.form.reset();
    this.service.initializeFormGroup();
  }


}
