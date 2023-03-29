import { Component,OnInit} from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MissionService } from 'src/app/shared/service/mission.service';
@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.css']
})
export class ExpensesFormComponent implements OnInit {

  appear=false;
  noData=true;
  isExist=true;
  expensesForm:any[]=[]
  userName:string;
  jobNum:number;
    total:number;
  constructor(private missionService: MissionService) { }

  ngOnInit(): void {
    console.log("this.missionService.missionId",this.missionService.missionId)
    if(this.missionService.missionId !=0)
    {
      this.appear=true;
      this.search(0,this.missionService.missionId);
      this.missionService.missionId=0
    }
    else{
      this.appear=false;
    }
   
  }


/////check userId
search(jobNumber:any,missionId:any){
  
   this.missionService.ExpensesFormReport(jobNumber,missionId).subscribe(res=>{
if(res.status)
{
  console.log("response true",res.expensesForm)
 if(missionId!=0)
 {
 this.expensesForm.push(res.expensesForm);
 this.jobNum=res.jobNumber;
 }
 else{
  this.expensesForm=res.expensesForm;
  this.appear =!this.appear
  this.jobNum=jobNumber;
 }
 this.userName=this.expensesForm[0].userName;
 this.total=res.total;
  //this.appear =!this.appear
  this.noData=true;
}
else if(res.errorNum==1)
{
  console.log(res.status,"if error 1");
  this.isExist=false;

}
else if(res.errorNum==2){
  console.log(res.status,"if error 2");
  this.noData=false;
}

  })

}


  public exportPDF() {

        const div = document.getElementById('pdfTable');console.log(div)
        const options = {
          background: 'white',
          scale: 2,
        };

        html2canvas(div as HTMLElement,options).then((canvas) => {
          debugger;
          console.log("ed");
          var img = canvas.toDataURL("image/PNG");
          var doc = new jsPDF('l', 'mm', 'a4');

          // Add image Canvas to PDF
          const bufferX = 5;
          const bufferY = 5;
          const imgProps = (<any>doc).getImageProperties(img);
          const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          console.log(pdfHeight + " / "+pdfWidth)
          doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, 220, undefined, 'FAST');

          return doc;
        }).then((doc) => {

          doc.save(`expenses${Date.now()}.pdf`);


             });

  }
}
