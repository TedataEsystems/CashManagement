import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MissionFormService } from 'src/app/shared/service/mission-form.service';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent implements OnInit {


  constructor( public dialogRef: MatDialogRef<AddMissionComponent>,public service: MissionFormService){
  }

    ngOnInit(){
      this.service.initializeFormGroup();
    }




    onClear(){
      // this.service.form.reset();
      // this.service.initializeFormGroup();
      // this.notificationService.success(':: Submitted successfully');
    }
    onSubmit(){
      if(this.service.form.invalid){
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
