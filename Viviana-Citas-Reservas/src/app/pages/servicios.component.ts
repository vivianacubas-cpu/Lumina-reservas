import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SERVICIOS } from '../services/reservas.service';

@Component({
  selector:'app-servicios', standalone:true, imports:[CommonModule],
  template:`
  <div class="page">
    <h2 class="title">Nuestros Servicios</h2><p class="sub">Elige el tratamiento perfecto para ti</p>
    <div class="grid">
      <div class="card" *ngFor="let s of servicios; let i=index" [style.animationDelay]="i*.12+'s'">
        <div class="ico">{{s.icono}}</div><h3>{{s.nombre}}</h3><p>{{s.desc}}</p>
        <div class="meta"><b>S/ {{s.precio}}</b><small>⏱ {{s.duracion}}</small></div>
        <button class="btn" (click)="reservar(s.nombre)">Reservar</button>
      </div>
    </div>
  </div>`,
  styles:[`
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.8rem}
  .card{background:#fff;border-radius:26px;padding:2rem;text-align:center;box-shadow:0 10px 30px rgba(45,27,78,.1);animation:up .8s both;transition:.4s;border-top:5px solid var(--teal)}
  .card:nth-child(even){border-top-color:var(--rose)}
  .card:hover{transform:translateY(-10px) rotate(-1deg);box-shadow:0 22px 44px rgba(74,44,122,.2)}
  .ico{font-size:3.2rem;animation:float 3s ease-in-out infinite}
  @keyframes float{50%{transform:translateY(-8px)}}
  h3{color:var(--violet2);margin:.6rem 0} p{color:#7a6f94;margin-bottom:1rem}
  .meta{display:flex;justify-content:space-between;margin-bottom:1.2rem;color:var(--violet)} .meta b{font-size:1.4rem;color:#1b9aaa}`]
})
export class ServiciosComponent {
  servicios=SERVICIOS;
  constructor(private router:Router){}
  reservar(s:string){ this.router.navigate(['/reservar'],{queryParams:{servicio:s}}); }
}
