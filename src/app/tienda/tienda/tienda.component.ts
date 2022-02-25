import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd } from '@angular/router';
import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
  state,
} from '@angular/animations';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  animations: [ // <-- add your animations here
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Set a default  style for enter and leave
        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            width: '100%',
            opacity: 0
          }),
        ]),
        // Animate the new page in
        query(':enter', [
          animate('300ms ease-out', style({ opacity: 1})),
        ])
      ])
    ])
    
  ]
})
export class TiendaComponent implements OnInit {

  title = 'creadoCarino';
  home: boolean = false;

  constructor( private router: Router) { }

  ngOnInit(): void {

    const url = this.router.url;

    if(url === "/" || url === ''){
      this.home = true;
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: any) => {
      if(event.url === '/' || event.url === ''){
        this.home = true;
      } else {
        this.home = false;
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  scroll(anchor: string){
    const element = document.getElementById(anchor);
    this.scrollCustomImplementation(element!);
  }

  scrollCustomImplementation(element: HTMLElement) {
    let start: any = null!;
    let target = element && element ? element.getBoundingClientRect().top : 0;
    let firstPos = window.pageYOffset || document.documentElement.scrollTop;
    let pos = 0;

    (function () {
      var browser: string[] = ['ms', 'moz', 'webkit', 'o'];

      for (var x = 0, length = browser.length; x < length && !window.requestAnimationFrame; x++) {
        window.requestAnimationFrame = window[browser[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[browser[x] + 'CancelAnimationFrame'] || window[browser[x] + 'CancelRequestAnimationFrame'];
      }
    })();

    function showAnimation(timestamp: any) {
      if (!start) {
        start = timestamp || new Date().getTime();
      } //get id of animation


      var elapsed = timestamp - start;
      var progress = elapsed / 600; // animation duration 600ms
      //ease in function from https://github.com/component/ease/blob/master/index.js

      var outQuad = function outQuad(n:any) {
        return n * (2 - n);
      };

      var easeInPercentage = +outQuad(progress).toFixed(2); // if target is 0 (back to top), the position is: current pos + (current pos * percentage of duration)
      // if target > 0 (not back to top), the positon is current pos + (target pos * percentage of duration)

      pos = target === 0 ? firstPos - firstPos * easeInPercentage : firstPos + target * easeInPercentage;
      window.scrollTo(0, pos);

      if (target !== 0 && pos >= firstPos + target || target === 0 && pos <= 0) {
        cancelAnimationFrame(start);

        if (element) {
          element.setAttribute("tabindex", "-1");
          element.focus();
        }

        pos = 0;
      } else {
        window.requestAnimationFrame(showAnimation);
      }
    }

    window.requestAnimationFrame(showAnimation);
  }
}
