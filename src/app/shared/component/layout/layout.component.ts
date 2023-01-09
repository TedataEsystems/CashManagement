import { animate, state, style, transition, trigger } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ])

  ]
})
export class LayoutComponent implements OnInit{

  isMenuOpen = true;
  contentMargin = 240;

  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event:any){
    this.pageYoffset = window.pageYOffset;
  }

  constructor(private scroll: ViewportScroller) {

  }


 ngOnInit(): void {



  }

  scrollToTop(){

    this.scroll.scrollToPosition([0,0]);
    }

}
