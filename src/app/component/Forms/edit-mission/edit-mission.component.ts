import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-mission',
  templateUrl: './edit-mission.component.html',
  styleUrls: ['./edit-mission.component.css']
})
export class EditMissionComponent implements OnInit {

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    status: new FormControl(''),
    comments: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),

  })
  constructor(private dialogRef:MatDialogRef<EditMissionComponent>) { }

  ngOnInit(): void {
    // this.form.reset();
  }




  onSubmit() {
    if(!this.form.valid){
      return;
    }


  }
  onClose() {

     this.dialogRef.close();


  }

}
