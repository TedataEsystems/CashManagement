import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MissionFormService } from 'src/app/shared/service/mission-form.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddUserComponent>,public service: MissionFormService){
  }
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Staffdegree: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Team: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    User: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    Role: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),



  })

    ngOnInit(){
      this.form;
    }




    onClear(){
      // this.service.form.reset();
      // this.service.initializeFormGroup();
      // this.notificationService.success(':: Submitted successfully');
    }
    onSubmit(){
if(this.form.invalid){
  return;
}
      // this.notificationService.success(':: Submitted successfully');
      this.onClose();
      this.dialogRef.close('save');

      }

    onClose(){

      this.service.form.reset();
      this.service.initializeFormGroup();
      this.dialogRef.close('save');

    }


}
