import { animate, state, style, transition, trigger } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxGlideComponent } from 'ngx-glide';
import productosTotales from '../../../assets/data/productos.json';
import { Producto } from '../../interfaces/productos.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class HomeComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    tipo : [ 'todos' ]
  })


  private _vps!: ViewportScroller;

  showCustomArrows!: boolean;
  showArrows!: boolean;
  showBullets!: boolean;
  arrowLeftLabel!: string;
  arrowRightLabel!: string;
  type!: string;
  startAt!: number;
  perView!: number;
  focusAt!: number | string;
  gap!: number;
  autoplay!: number | boolean;
  hoverpause!: boolean;
  keyboard!: boolean;
  bound!: boolean;
  swipeThreshold!: number | boolean;
  dragThreshold!: number | boolean;
  perTouch!: number | boolean;
  touchRatio!: number;
  touchAngle!: number;
  animationDuration!: number;
  rewind!: boolean;
  rewindDuration!: number;
  animationTimingFunc!: string;
  direction!: string;
  classes!: object;
  isCenter!: boolean;
  isAutoplay!: boolean;
  isSwipeThreshold!: boolean;
  isDragThreshold!: boolean;
  isPerTouch!: boolean;
  logs: { event: string; data?: object }[];
  productos!: Producto[];

  @ViewChild('ngxGlide') ngxGlide!: NgxGlideComponent;

  play(): void {
    this.ngxGlide.play();
  }

  constructor( private fb: FormBuilder) {
    this.productos = productosTotales;
    this.logs = [];
   }

  ngOnInit(): void {
    this.showCustomArrows = true;
    this.showArrows = true;
    this.showBullets = false;
    this.arrowLeftLabel = 'left';
    this.arrowRightLabel = 'right';
    this.type = 'carousel';
    this.startAt = 0;
    this.isCenter = true;
    this.focusAt = 0;
    this.gap = 20;
    this.isAutoplay = false;
    this.autoplay = 1000;
    this.hoverpause = true;
    this.keyboard = true;
    this.bound = false;
    this.isSwipeThreshold = true;
    this.swipeThreshold = 80;
    this.isDragThreshold = true;
    this.dragThreshold = 120;
    this.isPerTouch = false;
    this.perTouch = 3;
    this.touchRatio = 0.5;
    this.touchAngle = 45;
    this.animationDuration = 400;
    this.rewind = true;
    this.rewindDuration = 800;
    this.animationTimingFunc = 'cubic-bezier(0.165, 0.840, 0.440, 1.000)';
    this.direction = 'ltr';
    this.perView = 4;
  }

  cambiarTipo(event: any) {
    this.productos = productosTotales;
    if(event.target.value !== "todos"){
      this.productos = this.productos.filter(producto => producto.name === event.target.value);
    }
    this.ngxGlide.recreate();
    console.log(this.productos);
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
      console.log(pos, target, firstPos, progress);

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
