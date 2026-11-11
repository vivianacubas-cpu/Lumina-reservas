import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReservasService } from '../services/reservas.service';

@Component({
  selector:'app-mis-reservas', standalone:true, imports:[CommonModule,RouterLink],
  template:`
  <div class="page">
    <h2 class="title">Mis Reservas</h2><p class="sub">Tus citas confirmadas</p>
    <div class="ok" *ngIf="(svc.reservas$|async)?.length">✅ ¡Reserva registrada con éxito!</div>
    <div class="empty" *ngIf="!(svc.reservas$|async)?.length">
      <div>📅</div><p>Aún no tienes reservas</p><a class="btn" routerLink="/reservar">Hacer una reserva</a>
    </div>
    <div class="list">
      <div class="item" *ngFor="let r of svc.reservas$|async; let i=index" [style.animationDelay]="i*.1+'s'">
        <div class="date"><b>{{r.fecha|date:'dd'}}</b><span>{{r.fecha|date:'MMM'}}</span></div>
        <div class="info"><h3>{{r.servicio}}</h3>
          <p>👤 {{r.nombre}} · 📞 {{r.telefono}}</p><p>✉️ {{r.correo}}</p>
          <p *ngIf="r.notas">📝 {{r.notas}}</p></div>
        <div class="side"><span class="hora">🕐 {{r.hora}}</span>
          <div class="actions">
            <button class="btn" (click)="editar(r.id)">Editar</button>
            <button class="btn rose" (click)="svc.eliminar(r.id)">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  styles:[`
  .list{display:flex;flex-direction:column;gap:1.2rem;max-width:850px;margin:0 auto}
  .item{display:flex;gap:1.5rem;align-items:center;background:#fff;border-radius:22px;padding:1.4rem;box-shadow:0 10px 28px rgba(45,27,78,.1);animation:up .7s both;transition:.3s;flex-wrap:wrap}
  .item:hover{transform:translateX(8px)}
  .date{background:linear-gradient(135deg,var(--violet),var(--violet2));color:#fff;border-radius:18px;padding:.8rem 1.2rem;text-align:center;display:flex;flex-direction:column}
  .date b{font:700 2rem 'Playfair Display'} .date span{text-transform:uppercase;color:var(--gold);letter-spacing:2px}
  .info{flex:1;min-width:200px} h3{color:var(--violet2)} p{color:#7a6f94;font-size:.9rem}
  .side{display:flex;flex-direction:column;gap:.6rem;align-items:flex-end}
  .hora{background:#e6fbf8;color:#1b9aaa;padding:.3rem .9rem;border-radius:20px;font-weight:600}
  .actions{display:flex;gap:.6rem;flex-wrap:wrap}
  .side .btn{padding:.5rem 1.2rem;font-size:.85rem}
  .ok{max-width:850px;margin:0 auto 1.5rem;background:#d8f5ee;padding:1rem;border-radius:14px;text-align:center;color:#117a65;animation:up .5s both}
  .empty{text-align:center;animation:up .8s both} .empty div{font-size:4rem} .empty p{margin:1rem 0}`]
})
export class MisReservasComponent {
  svc=inject(ReservasService);
  private router=inject(Router);
  editar(id:number){ this.router.navigate(['/reservar'], { queryParams: { id } }); }
}
