import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-approve-status',
  templateUrl: './add-approve-status.component.html',
  styleUrls: ['./add-approve-status.component.css']
})
export class AddApproveStatusComponent implements OnInit {


  constructor( public dialogRef: MatDialogRef<AddApproveStatusComponent>,private toastr:ToastrService){
  }
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('',[Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),

  })

    ngOnInit(){
      this.form;
    }





    onSubmit(){
if(this.form.invalid){
  return;
}
    this.toastr.success(' Submitted successfully');
      this.onClose();
      this.dialogRef.close('save');

      }

    onClose(){

      this.form.reset();

      this.dialogRef.close('save');

    }


}
