import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MissionList } from 'src/app/model/mission-list';
import { MissionType } from 'src/app/model/mission-type';
import { Status } from 'src/app/model/status';
import { UserList } from 'src/app/model/user-list';
import { MissionFormService } from 'src/app/shared/service/mission-form.service';
import { MissionService } from 'src/app/shared/service/mission.service';
import { CommentService } from 'src/app/shared/service/comment.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  // expression=new RegExp("^[^-\s][a-zA-Z0-9_\s-]+$")
  appear = false;
 step=0;
  file_store: FileList;
  file_list: Array<string> = [];
  file: File = null; // Variable to store file
  fileName: string;
  selectAll = false;
  userList: UserList[] = [];
  statusList: Status[] = [];
  missionTypeList: MissionType[] = [];
  commentList: Comment[] = [];
  comment: string = '';
  creationDate: string = '';
  createdBy: string = '';
  createdByTeam: string = '';
  Available = true;
  disabled=false;
  add = false;
  displayedCommentColumns: string[] = ['comment', 'creationDate','createdBy'];
  dataSourceComment = new MatTableDataSource<any>();
  dataSourceComment1 = new MatTableDataSource<any>();
  constructor(public dialogRef: MatDialogRef<EditComponent>, public service: MissionFormService,
    private missionService: MissionService, private toastr: ToastrService, private commentService: CommentService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  attachId: number;
  attachName: string;
  commentStatus: boolean;
  statusShow:boolean=false;
  statusname:string='';
  ngOnInit() {

    if (localStorage.getItem("team") == "1") {
      this.commentStatus = true;
      this.statusShow=true;

    }
    if (localStorage.getItem("role") == "1"&&localStorage.getItem("team")!= "1") {
      this.commentStatus = false;
      this.statusShow=false;

    }
//console.log(this.data)
    this.attachId = this.data.attachFileId;
    this.attachName = this.data.attachFilename;
    //console.log(this.data.attachFilename,"file name")
    this.service.initializeFormGroup();
    this.missionService.getLists().subscribe(res => {
      if (res.status == true) {
        this.userList = res.usersList;
        this.statusList = res.statusesList;
        this.missionTypeList = res.missionTypesList;
      }
      else {
        this.toastr.warning(':failed');
      }
      if (this.data) {
        //set values of lists
        var userCount = 0;
        var statusCount = 0;
        var missionTypeCount = 0;
        for (var user of this.userList) {
          if (this.data.userId == user.id) {
            userCount++;
            this.service.form.controls['userId'].setValue(this.data.userId);
            this.statusname=this.data.status;
          }
        }
        if (userCount == 0) {
          this.service.form.controls['userId'].setValue(null);
        }
        for (var status of this.statusList) {
          if (this.data.statusId == status.id) {
            statusCount++;
            this.service.form.controls['statusId'].setValue(this.data.statusId);

          }
        }
        if (statusCount == 0) {
          this.service.form.controls['statusId'].setValue(null);
        }
        for (var missionType of this.missionTypeList) {
          if (this.data.missionTypeId == missionType.id) {
            missionTypeCount++;
            this.service.form.controls['missionTypeId'].setValue(this.data.missionTypeId);
          }
        }
        if (missionTypeCount == 0) {
          this.service.form.controls['missionTypeId'].setValue(null);
        }
        this.service.form.controls['id'].setValue(this.data.id);
        this.service.form.controls['jobDegreeName'].setValue(this.data.jobDegree);
        this.service.form.controls['missionPurpose'].setValue(this.data.missionPurpose);
        this.service.form.controls['centerOfCost'].setValue(this.data.centerOfCost);
        this.service.form.controls['companyType'].setValue(this.data.companyType);
        this.service.form.controls['missionPlace'].setValue(this.data.missionPlace);
        this.service.form.controls['startDateMission'].setValue(this.data.startDateMission);
        this.service.form.controls['endDateMission'].setValue(this.data.endDateMission);
        this.service.form.controls['startDateStay'].setValue(this.data.startDateStay);
        this.service.form.controls['endDateStay'].setValue(this.data.endDateStay);
        this.service.form.controls['noOfNights'].setValue(this.data.noOfNights);
        this.service.form.controls['stay'].setValue(this.data.stay);
        this.service.form.controls['mealsAndIncidentals'].setValue(this.data.mealsAndIncidentals);
        this.service.form.controls['jobNumber'].setValue(this.data.jobNumber);
        this.service.form.controls['missionTypeCost'].setValue(this.data.missionTypeCost);
        this.service.form.controls['permissionRequest'].setValue(this.data.permissionRequest);
        this.service.form.controls['permissionDuration'].setValue(this.data.permissionDuration);
        //this.service.form.controls['comment'].setValue(this.data.comment);
        this.service.form.controls['creationDate'].setValue(this.data.creationDate);
        this.service.form.controls['createdBy'].setValue(this.data.createdBy);
        this.service.form.controls['updateDate'].setValue(this.data.updateDate);
        this.service.form.controls['updateBy'].setValue(this.data.updateBy);
        this.service.form.controls['userName'].setValue(this.data.user);
        this.service.form.controls['userId'].setValue(this.data.userId);
        this.service.form.controls['attachFile'].setValue(this.data.attachFilename);
        this.service.form.controls['teamName'].setValue(this.data.teamName);
        this.service.form.controls['serialNumber'].setValue(this.data.serialNumber);
       // this.service.form.controls['serialDate'].setValue(this.data.serialDate);
        //this.service.form.controls['attachFileId'].setValue(this.data.attachFileId);
      }//end of if data
    })//end of subscribe
    this.commentService.getComments(this.data.id).subscribe(res => {
      if (res.status) {
        this.commentList = res.comments

        this.dataSourceComment = new MatTableDataSource<any>(this.commentList);

      }

    })
  }


  onSubmit() {
    if (!this.service.form.valid) {
      return;
    }
    let mission = {
      id: this.service.form.value.id,
      missionPurpose: this.service.form.value.missionPurpose,
      centerOfCost: this.service.form.value.centerOfCost,
      companyType: this.service.form.value.companyType,
      missionPlace: this.service.form.value.missionPlace,
      startDateMission: this.service.form.value.startDateMission,
      endDateMission: this.service.form.value.endDateMission,
      startDateStay: this.service.form.value.startDateStay,
      endDateStay: this.service.form.value.endDateStay,
      noOfNights: this.service.form.value.noOfNights,
      stay: this.service.form.value.stay,
      mealsAndIncidentals: this.service.form.value.mealsAndIncidentals,
      jobNumber: this.service.form.value.jobNumber,
      missionTypeCost: this.service.form.value.missionTypeCost,
      permissionRequest: this.service.form.value.permissionRequest,
      permissionDuration: this.service.form.value.permissionDuration,
      comment: this.service.form.value.comment,
      creationDate: this.service.form.value.creationDate,
      createdBy: this.service.form.value.createdBy,
      updatedBy: localStorage.getItem('userName') || '',
      statusId: this.service.form.value.statusId,
      missionTypeId: this.service.form.value.missionTypeId,
      userId: this.service.form.value.userId,
      serialNumber:this.service.form.value.serialNumber,
    //  serialDate:this.service.form.value.serialDate
    }//end of object
    let comment = {
      missionId: this.service.form.value.id,
      comment: this.service.form.value.comment,
      createdBy:localStorage.getItem("userName")

    }
    // sent from withput update in attach file so we will update mission only
    if (this.file == null) {
      console.log(mission,"oooo");
      this.missionService.updateMission(mission).subscribe(res => {
        if (res.status == true) {
          if (comment.comment != null && comment.comment != "") {
            //Add comment
            this.commentService.addComment(comment).subscribe(res => {
              if (res.status) {
                this.toastr.success("updated successfully");
                this.service.form.reset();
                this.dialogRef.close('save');
              }
              else { this.toastr.warning("Add comment failed"); }

            })
          }
          else {
            this.toastr.success("updated successfully");
            this.service.form.reset();
            this.dialogRef.close('save');
          }
        }
        else {
          this.toastr.warning("updated failed");
        }
      })
    }
    //click in delete file button and add new one or replace exsit file and add new one without click in remove button
    else {
      this.missionService.updateMission(mission).subscribe(res => {
        if (res.status == true) {
          this.missionService.upload(this.file, res.id).subscribe(res => {
            if (res.status == true) {
              if (comment.comment != null && comment.comment != "") {
                //Add comment
                this.commentService.addComment(comment).subscribe(res => {
                  if (res.status) {
                    this.toastr.success("updated successfully");
                    // this.service.form.reset();
                    //this.dialogRef.close('save');
                      this.onClose();

                  }
                  else { this.toastr.warning("Add comment failed"); }

                })
              }
              else {
                this.toastr.success("updated successfully");
                // this.service.form.reset();
                this.onClose();

              }

            }
            else { this.toastr.warning("updated file failed "); }
          });

        }
        else {
          this.toastr.warning("updated failed");
        }

      })
    }
    //]}
    this.add = false;
//    this.dialogRef.close('save');

  }


  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }


  onClose() {
    this.service.form.reset();
    this.dialogRef.close();
    // this.dialogRef.close('save');

  }
  //////////
//   addComment(e) {

//     this.area=this.service.form.value.comment

// if(this.expression.test(this.area)){

//     this.add = true;
//     e.stopPropagation()
//     let commentsList = [{
//       comment: this.service.form.value.comment,
//       creationDate: this.service.form.value.creationDate,
//       createdBy: this.service.form.value.createdBy,
//       createdByTeam: ''
//     }]
// console.log(commentsList)
//     this.dataSourceComment1 = new MatTableDataSource<any>(commentsList);

//   }
// }

  // check(){
  //   if(this.service.form.value.comment.&&this.service.form.value.comment!="")
  //   {
  //     this.Available=true

  //   }
  //   else{
  //     this.Available=false;

  //   }
  // }

  search() {
    this.appear = !this.appear
  }
  submittedfile: boolean = false;
  //edit on attach file
  handleFileInputChange(event) {
    this.file = event.target.files[0];
    this.attachName = event.target.files[0].name;
    var extensitin = this.attachName.split(".")[1];
    if (extensitin.toLowerCase() == "msg" || extensitin.toLowerCase() == "jpeg" || extensitin.toLowerCase() == "jpg" || extensitin.toLowerCase() == "png") {
      this.service.form['controls']['attachFile'].setValue(this.attachName);
    }
    else {
      this.fileName = "";
      this.attachName = "";
      this.service.form['controls']['attachFile'].setValue("");
      this.toastr.warning("::Not Acceptable Extension only acceptable extenstion(jpeg,jpg,png,msg)");
    }

    // this.service.form['controls']['attachFile'].setValue(this.attachName);

  }
  removeFile(id: number) {
    this.file = null;
    this.attachName = '';
    this.service.form['controls']['attachFile'].setValue('');

  }//remove

  setStep(index: number) {
    this.step = index;
  }
}
