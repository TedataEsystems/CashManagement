import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<MissionDetailsComponent>) { }

  ngOnInit(): void {
  }
  onClose() {

    this.dialogRef.close();


 }
}
