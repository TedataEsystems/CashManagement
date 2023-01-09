import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MissionFormService {

  constructor() { }

  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Staffdegree: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    // Team: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Costcenter: new FormControl(2455),
    CompanyType: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Location: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    DurationofstayFrom: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    DurationofstayTo: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    NightsNum: new FormControl(0,[Validators.required,Validators.min(0),Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    stay: new FormControl(0),
    Meals: new FormControl(0),
    DurationofmissionFrom: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    DurationofmissionTo: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Missionpurpose: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    MissionType: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Permission: new FormControl(''),
    Durationofpermission: new FormControl(''),
    Comment:new FormControl(''),
    Approvalmail: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    CreationDate:new FormControl(null),
    CreatedBy:new FormControl(null),
    UpdateDate:new FormControl(null),
    UpdateBy:new FormControl(null),
  });




  initializeFormGroup(){
    this.form.setValue({
      Id:0,
      Staffdegree:'',
      Name: '',
      Costcenter:2455,
      CompanyType:0,
      Location: '',
      DurationofstayFrom: '',
      DurationofstayTo:'',
      NightsNum: 0,
      stay:0,
      Meals:0,
      DurationofmissionFrom:'',
      DurationofmissionTo: '',
      Missionpurpose: '',
      MissionType: '',
      Permission:'',
      Durationofpermission: '',
      Comment:'',
      Approvalmail: '',
      CreationDate:null,
      CreatedBy:null,
      UpdateDate:null,
      UpdateBy:null,
    })


  }
}
