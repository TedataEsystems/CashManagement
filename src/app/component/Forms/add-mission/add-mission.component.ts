import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MissionFormService } from 'src/app/shared/service/mission-form.service';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent implements OnInit {

  file_store:FileList;
  file_list: Array<string> = [];


  constructor( public dialogRef: MatDialogRef<AddMissionComponent>,public service: MissionFormService){
  }

    ngOnInit(){
      this.service.initializeFormGroup();
    }




    handleFileInputChange(l: FileList): void {
      this.file_store = l;
      if (l.length) {
        const f = l[0];
        const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
        this.service.form.controls['Approvalmail'].patchValue(`${f.name}${count}`);
      } else {
        this.service.form.controls['Approvalmail'].patchValue("");
      }
    }

    handleSubmit(): void {
      var fd = new FormData();
      this.file_list = [];
      for (let i = 0; i < this.file_store.length; i++) {
        fd.append("files", this.file_store[i], this.file_store[i].name);
        this.file_list.push(this.file_store[i].name);
      }

      // do submit ajax
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
