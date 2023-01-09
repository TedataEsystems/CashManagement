import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  

  isExpanded= true;
  isExpanded1= true;
  isExpanded2= true;
  isExpanded3= true;
  isExpanded4 = true;
  isExpanded5 = true;
  isExpanded6 = true;
  isExpanded7 = true;
  isExpanded8 = true;
  isExpanded9 = true;
  

  showSubmenu = true;
  showSubmenu1 = false;
  showSubmenu2 = false;
  showSubmenu3 = false;
  showSubmenu4 = false;
  showSubmenu5 = false;
  showSubmenu6 = false;
  showSubmenu7 = false;
  showSubmenu8 = false;
  showSubmenu9 = false;
  isShowing = false;
  isShowing1 = false;
  isShowing2 = false;
  isShowing3 = false;
  isShowing4 = false;
  isShowing5 = false;
  isShowing6 = false;
  isShowing7 = false;
  isShowing8 = false;
  isShowing9 = false;
  
  showSubSubMenu: boolean = false;
  
  constructor(private router: Router) { 
   
  
  }

  ngOnInit(): void {
  }
  logOut(){
    localStorage.clear();
    // this.accountService.logout().subscribe(res=>{
      this.router.navigateByUrl('/login');
      
    } 

}
