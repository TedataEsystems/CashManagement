import { Component,OnInit} from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from 'src/app/shared/service/mission.service';
@Component({
  selector: 'app-cover-letter',
  templateUrl: './cover-letter.component.html',
  styleUrls: ['./cover-letter.component.css']
})
export class CoverLetterComponent implements OnInit {

  constructor(private missionServices:MissionService) { }
  missionApproved:any[]=[];
  TotalStay:number=0;
  TotalMealsAndIncidentals:number=0;
  TotalMissionTypeCost:number=0;

  ngOnInit(): void {
    this.missionServices.CoverReport(this.missionServices.CoverReportsIds).subscribe(res=>
      {
        this.missionApproved=res.missions;
        this.missionApproved.forEach( (element:any) => {
         this.TotalStay+=element.stay;
         this.TotalMealsAndIncidentals+=element.mealsAndIncidentals;
         this.TotalMissionTypeCost+=element.missionTypeCost;
      });
       // console.log(this.missionApproved);
      })
      }




  public exportPDF() {

    const div = document.getElementById('pdfTable');
    const options = {
      background: 'white',
      scale: 2,
    };

    html2canvas(div as HTMLElement,options).then((canvas) => {

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

      doc.save(`Cover-Letter${Date.now()}.pdf`);

    });

}

}
