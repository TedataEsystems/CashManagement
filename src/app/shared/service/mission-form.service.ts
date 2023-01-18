import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MissionFormService {

  constructor() { }

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    jobDegree: new FormControl(''),
    missionPurpose: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    centerOfCost: new FormControl(2455),
    companyType: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    missionPlace : new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    startDateMission: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    endDateMission: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    startDateStay: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    endDateStay: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    noOfNights: new FormControl(0,[Validators.required,Validators.min(0),Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    stay: new FormControl(0),
    mealsAndIncidentals: new FormControl(0),
    jobNumber: new FormControl(0),
    missionTypeCost: new FormControl(0),
    permissionRequest: new FormControl(''),
    permissionDuration: new FormControl(''),
    comment:new FormControl(''),
    attachFile: new FormControl(''),
    creationDate:new FormControl(null),
    updateDate:new FormControl(null),
    createdBy:new FormControl(null),
    updateBy:new FormControl(null),
    statusId: new FormControl(0,[Validators.required]),
    missionTypeId: new FormControl(0,[Validators.required]),
    userId: new FormControl(0),
  });




  initializeFormGroup(){
    this.form.setValue({
      id:0,
      jobDegree:'',
      missionPurpose: '',
      centerOfCost:2455,
      companyType:0,
      missionPlace: '',
      startDateMission: '',
      endDateMission:'',
      startDateStay:'',
      endDateStay: '',
      noOfNights: 0,
      stay:0,
      mealsAndIncidentals:0,
      jobNumber: 0,
      missionTypeCost: '',
      permissionRequest:'',
      permissionDuration: '',
      comment:'',
      attachFile: '',
      creationDate:null,
      createdBy:null,
      updateDate:null,
      updateBy:null,
      statusId:0,
      missionTypeId:0,
      userId:0

    })


  }
}
