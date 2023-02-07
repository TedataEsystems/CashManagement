import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';
import { element } from 'protractor';
import { DashboardService } from 'src/app/shared/service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  IsAdmin: boolean = true;
  isCreator=false;
   totalPending=0;
   totalApproved=0;
   totalRejected=0;
  
   
  constructor(private title : Title,private dashboardService:DashboardService) {
    this.title.setTitle("الصفحة الرئيسية")
   }

  ngOnInit(): void {
    var role = localStorage.getItem("role").toLocaleLowerCase().replace(/\s/, '');
    var team = localStorage.getItem("team").toLocaleLowerCase().replace(/\s/, '');
    if (role == 'creator' && team != "efocash") {
      this.IsAdmin = false;
    }
    else {
      this.IsAdmin = true;
    }


    if (localStorage.getItem("role").toLocaleLowerCase().replace(/\s/, '') == "creator") {
      this.isCreator = true;
    }
      this.dashboardService.getDashboard().subscribe(res=>{
        if (role == 'creator' && team != "efocash") 
        {
          this.doughnutChartData=[res.data.approvedCount,res.data.pendingCount,res.data.rejectedCount]
          this.totalPending=res.data.pendingCount;
          this.totalApproved=res.data.approvedCount;
          this.totalRejected=res.data.rejectedCount;

        }
        else 
        {
          let approved :any={
            data:[]=[],
            label:''
          }
          let pending :any={
              data:[]=[],
              label:''
            }
          let rejected :any={
              data:[]=[],
              label:''
              }
            

             res.data.forEach( (element:any) => {
              this.barChartLabels.push(element.teamName);
              approved.data.push(element.approvedCount);
              pending.data.push(element.pendingCount);
              rejected.data.push(element.rejectedCount);
              this.totalPending+=element.pendingCount;
              this.totalApproved+=element.approvedCount;
              this.totalRejected+=element.rejectedCount;
              console.log('totalPending',this.totalPending)
              console.log(this.totalApproved)
              console.log(this.totalRejected)
              
           });
           approved.label='Approved';
           pending.label='Pending';
           rejected.label='Rejected';
           this.barChartData=[];
           this.barChartData.push(approved,pending,rejected);
           console.log("barChart",this.barChartData)
           
           
        }
      })

  }

  /////////////////donut chart//////////////////
  doughnutChartLabels: Label[] = ['Approved', 'Pending', 'Rejected'];
  doughnutChartData: MultiDataSet = [];

  doughnutChartType: ChartType = 'doughnut';
  colors: Color[] = [
    {
      backgroundColor: [
        '#8e2279',
        '#80868b',
      '#d7d7d7',
"#0f1323",
 "#1b3c51",
 "#791a75",

        'blue', 'red','pink','orange','purple','brown','DeepPink','DarkOrange'
      ]
    }
  ];





/////////bar chart/////////////////////////
barChartOptions: ChartOptions = {

  responsive: true,
};
//'EFO Cash', 'Estore', 'ETSI', 'ETSM', 'EWFM','Fiber Support','Fiber Team','TE MSAN','WiMax'
barChartLabels: Label[] = [];
barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];

public barcolors: Array<any> = [
  { // first color
    backgroundColor: '#8e2279',
   // backgroundColor: 'rgb(33, 179, 33)',

  },
  { // second color
     backgroundColor: '#80868b',
    //backgroundColor: 'rgb(245, 182, 66)',

  },
{
  // thirdcolor
   backgroundColor: '#d7d7d7',
  //backgroundColor: 'rgb(221, 7, 7)',

}];
public barChartData: ChartDataSets[] = [
  // { data: [65, 59, 80, 81, 56, 55, 40,44,61], label: 'Approved' },
  // { data: [28, 48, 40, 19, 86, 27, 90,20,33], label: 'Pending' },
  // { data: [11, 60, 20, 20, 80, 11, 70,21,50], label: 'Rejected' }
];




}



