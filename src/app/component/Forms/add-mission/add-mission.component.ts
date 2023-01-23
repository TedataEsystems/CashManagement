
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
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
  submittedfile=false;
  appear=false;
  sameTeam=true;
  file_store: FileList;
  file_list: Array<string> = [];
  file: File = null; // Variable to store file
  fileName: string;

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
        this.toastr.warning('Failed');
      }
    })//end of subscribe
  }

   // On file Select

  onSubmit() {
    debugger
    if(!this.service.form.valid) {
      return;
    }//end of if
    let missionn={
      id:this.service.form.value.id,
     // jobDegree:this.service.form.value.jobDegree,
      jobDegree:this.service.form.value.jobDegreeName,
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


      this.missionService.addMission(missionn).subscribe(res=>
        {
          console.log("resss",res);
          if(res.status==true)
          {
            if(this.file!=null){
             this.missionService.upload(this.file,res.id).subscribe(res=>{console.log(res.status)})
           }
            this.toastr.success(":added successfully");
            this.service.form.reset();
            this.dialogRef.close('save');
          }
          else
          {
            this.toastr.warning(":failed");
          }
        })


    this.onClose();
    this.dialogRef.close('save');
    //this._router.navigate(['/summary'] );
  }//end of submit
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close('save');
  }
search(jobNumber:any){
  this.missionService.checkSameTeam(jobNumber).subscribe(res=>{
if(res.status)
{
  this.service.form['controls']['jobNumber'].setValue(res.jobNumber)
  this.service.form['controls']['userName'].setValue(res.name)
  this.service.form['controls']['userId'].setValue(res.userId)
   this.service.form['controls']['jobDegreeName'].setValue(res.jobDegreeName)
  this.appear =!this.appear
  this.sameTeam=true;
}
else
{
  this.sameTeam=false;
}

  })
}

// handleFileInputChange(l: FileList): void {
//   this.file_store = l;
//   if (l.length) {
//     const f = l[0];
//     const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
//     this.service.form.controls.attachFile.patchValue(`${f.name}${count}`);
//   } else {
//     this.service.form.controls.attachFile.patchValue("");
//   }


//   var fd = new FormData();
//   this.file_list = [];
//   for (let i = 0; i < this.file_store.length; i++) {
//     fd.append("files", this.file_store[i], this.file_store[i].name);
//     this.file_list.push(this.file_store[i].name);
//   }
// }
handleFileInputChange(event){
  this.file = event.target.files[0];
 this.fileName = event.target.files[0].name;
 this.service.form.controls['attachFile'].setValue(this.fileName)
 this.submittedfile= true;

}

handleSubmit(): void {
  var fd = new FormData();
  this.file_list = [];
  for (let i = 0; i < this.file_store.length; i++) {
    fd.append("files", this.file_store[i], this.file_store[i].name);
    this.file_list.push(this.file_store[i].name);
  }
}

onChange(event) {
  this.file = event.target.files[0];
}


// onChange(file) {
//   this.file = file.files[0];
//   this.fileName = file.files[0].name;
// }

removeFile() {
  this.file = null;
  this.fileName = '';
  this.service.form.controls['attachFile'].setValue('')
  this.submittedfile=false;
  //this.file_list.splice(i,1);
}

}
