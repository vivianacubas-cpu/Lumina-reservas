import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReservasService } from './services/reservas.service';

@Component({
  selector:'app-root', standalone:true, imports:[RouterOutlet,RouterLink,RouterLinkActive,AsyncPipe],
  animations:[trigger('routeAnim',[transition('* <=> *',[
    style({opacity:0,transform:'translateY(24px) scale(.98)'}),
    animate('550ms cubic-bezier(.2,.8,.2,1)',style({opacity:1,transform:'none'}))])])],
  template:`
  <header class="nav">
    <a class="logo" routerLink="/">🌸 Lumina</a>
    <nav>
      <a routerLink="/" routerLinkActive="act" [routerLinkActiveOptions]="{exact:true}">Inicio</a>
      <a routerLink="/servicios" routerLinkActive="act">Servicios</a>
      <a routerLink="/reservar" routerLinkActive="act">Reservar</a>
      <a routerLink="/mis-reservas" routerLinkActive="act">Mis reservas <em>{{(svc.reservas$|async)?.length}}</em></a>
    </nav>
  </header>
  <main [@routeAnim]="o.activatedRouteData['anim']"><router-outlet #o="outlet"></router-outlet></main>
  <footer>© 2026 Lumina Spa & Beauty · Hecho con Angular Reactive Forms 💜</footer>`,
  styles:[`
  .nav{position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;padding:1rem 2rem;
    background:rgba(45,27,78,.92);backdrop-filter:blur(10px);animation:down .8s both}
  @keyframes down{from{transform:translateY(-100%)}to{transform:none}}
  .logo{font:700 1.8rem 'Playfair Display';color:var(--gold);text-decoration:none}
  nav{display:flex;gap:.4rem;flex-wrap:wrap}
  nav a{color:#fff;text-decoration:none;padding:.5rem 1.1rem;border-radius:30px;transition:.3s;font-weight:400}
  nav a:hover{background:rgba(255,255,255,.15)} nav a.act{background:var(--teal);box-shadow:0 4px 14px rgba(46,196,182,.5)}
  em{background:var(--rose);color:var(--violet);border-radius:50%;padding:0 .45rem;font-style:normal;font-size:.75rem;font-weight:600}
  main{min-height:70vh;display:block}
  footer{background:var(--violet);color:#cbbfe6;text-align:center;padding:1.5rem;font-size:.9rem}`]
})
export class AppComponent { svc=inject(ReservasService); }
