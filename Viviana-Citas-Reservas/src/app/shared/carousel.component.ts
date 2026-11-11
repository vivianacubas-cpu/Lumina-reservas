import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector:'app-carousel', standalone:true, imports:[CommonModule],
  template:`
  <div class="car">
    <div *ngFor="let s of slides; let i=index" class="slide" [class.on]="i===idx" [style.backgroundImage]="'url('+s.img+')'"></div>
    <div class="shade"></div>
    <div class="content"><ng-content></ng-content></div>
    <button class="arrow l" (click)="prev()">‹</button><button class="arrow r" (click)="next()">›</button>
    <div class="dots"><span *ngFor="let s of slides; let i=index" [class.on]="i===idx" (click)="go(i)"></span></div>
  </div>`,
  styles:[`
  .car{position:relative;height:560px;overflow:hidden;background:linear-gradient(135deg,#2d1b4e,#2ec4b6)}
  .slide{position:absolute;inset:0;background-size:cover;background-position:center;opacity:0;transform:scale(1.12);transition:opacity 1.4s ease,transform 7s ease}
  .slide.on{opacity:1;transform:scale(1)}
  .shade{position:absolute;inset:0;background:linear-gradient(120deg,rgba(45,27,78,.8),rgba(46,196,182,.25))}
  .content{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;color:#fff;padding:1rem}
  .arrow{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.2);backdrop-filter:blur(6px);border:0;color:#fff;font-size:2rem;width:48px;height:48px;border-radius:50%;cursor:pointer;transition:.3s}
  .arrow:hover{background:var(--teal)} .l{left:20px}.r{right:20px}
  .dots{position:absolute;bottom:20px;left:0;right:0;display:flex;justify-content:center;gap:10px}
  .dots span{width:12px;height:12px;border-radius:10px;background:rgba(255,255,255,.5);cursor:pointer;transition:.4s}
  .dots span.on{width:34px;background:var(--gold)}`]
})
export class CarouselComponent implements OnInit, OnDestroy {
  slides=[
    {img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80'},
    {img:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80'},
    {img:'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&q=80'},
    {img:'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80'},
  ];
  idx=0; private t:any;
  ngOnInit(){ this.start(); }
  ngOnDestroy(){ clearInterval(this.t); }
  start(){ clearInterval(this.t); this.t=setInterval(()=>this.next(false),4000); }
  next(reset=true){ this.idx=(this.idx+1)%this.slides.length; if(reset)this.start(); }
  prev(){ this.idx=(this.idx-1+this.slides.length)%this.slides.length; this.start(); }
  go(i:number){ this.idx=i; this.start(); }
}
