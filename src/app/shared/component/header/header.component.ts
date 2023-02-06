import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import screenfull from 'screenfull';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  ShowStatus=false;
  constructor(private router: Router,private accountService:AccountService) { }
  userName:string;
  ngOnInit(): void {
    this.userName=localStorage.getItem("userName");
    if(localStorage.getItem("team").toLocaleLowerCase().replace(/\s/, '')=="efocash")
    {
     this.ShowStatus=true;
    }

  }


  public onToggleSidenav=()=> {
    this.sidenavToggle.emit();
     }


     logOut(){
      localStorage.clear();
      this.accountService.logout().subscribe(res=>{

      })
        this.router.navigateByUrl('/login');

      }
      toggleFullscreen() {
        if (screenfull.isEnabled) {
          screenfull.toggle();
        }
      }

}
