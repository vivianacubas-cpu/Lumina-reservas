import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../shared/carousel.component';

@Component({
  selector:'app-home', standalone:true, imports:[CarouselComponent,RouterLink],
  template:`
  <app-carousel>
    <p class="tag">BIENVENIDO A</p>
    <h1>Lumina Spa & Beauty</h1>
    <p class="lead">Reserva tu momento de bienestar en pocos clics</p>
    <div class="cta"><a class="btn" routerLink="/reservar">Reservar cita</a><a class="btn rose" routerLink="/servicios">Ver servicios</a></div>
  </app-carousel>
  <section class="page">
    <h2 class="title">¿Por qué elegirnos?</h2><p class="sub">Calidad, confort y atención personalizada</p>
    <div class="grid">
      <div class="card" style="animation-delay:.1s"><span>🌸</span><h3>Profesionales</h3><p>Especialistas certificados con años de experiencia.</p></div>
      <div class="card" style="animation-delay:.3s"><span>⏰</span><h3>Reserva fácil</h3><p>Elige fecha y hora en menos de un minuto.</p></div>
      <div class="card" style="animation-delay:.5s"><span>💎</span><h3>Experiencia premium</h3><p>Ambientes relajantes y productos de primera.</p></div>
    </div>
  </section>`,
  styles:[`
  h1{font-size:4rem;animation:up 1s both .2s;text-shadow:0 4px 20px rgba(0,0,0,.4)}
  .tag{letter-spacing:6px;color:var(--gold);font-weight:500;animation:up .8s both}
  .lead{font-size:1.3rem;font-weight:300;margin:1rem 0 2rem;animation:up 1s both .5s}
  .cta{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;animation:up 1s both .8s}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem}
  .card{background:#fff;border-radius:24px;padding:2rem;text-align:center;box-shadow:0 10px 30px rgba(45,27,78,.1);animation:up .8s both;transition:.4s}
  .card:hover{transform:translateY(-10px);box-shadow:0 20px 40px rgba(46,196,182,.25)}
  .card span{font-size:2.8rem;display:block;margin-bottom:.8rem} .card h3{color:var(--violet2);margin-bottom:.5rem}
  @media(max-width:600px){h1{font-size:2.5rem}}`]
})
export class HomeComponent {}
