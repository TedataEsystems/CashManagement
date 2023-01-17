import { Component,OnInit} from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})
export class MissionFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

      doc.save(`Mission-Form${Date.now()}.pdf`);


    //  this.toastr.success("pdf downloaded");

    });

}
}
