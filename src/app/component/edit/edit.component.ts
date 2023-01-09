import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MissionFormService } from 'src/app/shared/service/mission-form.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  selectAll = false;

  constructor( public dialogRef: MatDialogRef<EditComponent>,public service: MissionFormService){
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
