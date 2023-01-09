import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-msg',
  templateUrl: './delete-msg.component.html',
  styleUrls: ['./delete-msg.component.css']
})
export class DeleteMsgComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<DeleteMsgComponent>
    ) { }

  ngOnInit(): void {
  }
  onClose(){
    this.dialogRef.close(false);
    // this.dialogRef.close();

  }
  onDelete(){
    this.dialogRef.close(true);
        // this.onClose();

  }

}
