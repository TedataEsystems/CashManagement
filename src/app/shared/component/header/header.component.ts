import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import screenfull from 'screenfull';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  public onToggleSidenav=()=> {
    this.sidenavToggle.emit();
     }


     logOut(){
      localStorage.clear();
      // this.accountService.logout().subscribe(res=>{
        this.router.navigateByUrl('/login');

      }
      toggleFullscreen() {
        if (screenfull.isEnabled) {
          screenfull.toggle();
        }
      }

}
