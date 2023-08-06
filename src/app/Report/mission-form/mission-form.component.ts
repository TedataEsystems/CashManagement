import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MissionService } from 'src/app/shared/service/mission.service';
@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})
export class MissionFormComponent implements OnInit {
  constructor(private missionService: MissionService) { }
  mision: any;
  misionDurationEn: any;
  misionDurationAr: any;
  ngOnInit(): void {
    //this.mision = this.missionService.missionForm;
    this.mision = localStorage.getItem('missionId');
    this.mision= JSON.parse(this.mision);
    let startDateMission = new Date(this.mision.startDateMission);
    let endDateMission = new Date(this.mision.endDateMission)
    // let startDateMission = new Date(this.missionService.missionForm.startDateMission);
    // let endDateMission = new Date(this.missionService.missionForm.endDateMission)
    var time = (endDateMission.getTime() - startDateMission.getTime()) / (1000 * 3600 * 24);
    this.misionDurationEn = " " + time + "  Days ";
    this.misionDurationAr = time + " يوم"
  }
  public exportPDF() {
    const div = document.getElementById('pdfTable'); console.log(div)
    const options = {
      background: 'white',
      scale: 2,
    };
    html2canvas(div as HTMLElement, options).then((canvas) => {
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
      console.log(pdfHeight + " / " + pdfWidth)
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, 220, undefined, 'FAST');

      return doc;
    }).then((doc) => {

      doc.save(`Mission-Form${Date.now()}.pdf`);


      //  this.toastr.success("pdf downloaded");

    });

  }
}
