import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservasService, SERVICIOS, HORAS } from '../services/reservas.service';
import { soloLetras, telefono9, fechaNoPasada, horarioDisponible } from '../validators/custom.validators';

@Component({
  selector:'app-reservar', standalone:true, imports:[CommonModule,ReactiveFormsModule],
  template:`
  <div class="page">
    <h2 class="title">Reserva tu cita</h2><p class="sub">Completa tus datos y asegura tu espacio</p>
    <form class="form" [formGroup]="form" (ngSubmit)="enviar()">
      <div class="f">
        <label>Nombre completo</label>
        <input formControlName="nombre" placeholder="Ej. María Torres" [class.bad]="inv('nombre')">
        <small *ngIf="inv('nombre')">
          <ng-container *ngIf="c('nombre').errors?.['required']">El nombre es obligatorio.</ng-container>
          <ng-container *ngIf="c('nombre').errors?.['minlength']">Mínimo 3 caracteres.</ng-container>
          <ng-container *ngIf="c('nombre').errors?.['soloLetras']">Solo se permiten letras.</ng-container>
        </small>
      </div>
      <div class="f">
        <label>Teléfono</label>
        <input formControlName="telefono" maxlength="9" inputmode="numeric" placeholder="9XXXXXXXX" [class.bad]="inv('telefono')">
        <small *ngIf="inv('telefono')">
          <ng-container *ngIf="c('telefono').errors?.['required']">El teléfono es obligatorio.</ng-container>
          <ng-container *ngIf="c('telefono').errors?.['telefono']">Debe tener 9 dígitos y empezar con 9.</ng-container>
        </small>
      </div>
      <div class="f">
        <label>Correo electrónico</label>
        <input type="email" formControlName="correo" placeholder="correo@ejemplo.com" [class.bad]="inv('correo')">
        <small *ngIf="inv('correo')">Ingresa un correo válido.</small>
      </div>
      <div class="f">
        <label>Servicio</label>
        <select formControlName="servicio" [class.bad]="inv('servicio')">
          <option value="">-- Selecciona --</option>
          <option *ngFor="let s of servicios" [value]="s.nombre">{{s.icono}} {{s.nombre}} — S/ {{s.precio}}</option>
        </select>
        <small *ngIf="inv('servicio')">Selecciona un servicio.</small>
      </div>
      <div class="f">
        <label>Fecha</label>
        <input type="date" formControlName="fecha" [min]="hoy" [class.bad]="inv('fecha')">
        <small *ngIf="inv('fecha')">
          <ng-container *ngIf="c('fecha').errors?.['required']">Elige una fecha.</ng-container>
          <ng-container *ngIf="c('fecha').errors?.['fechaPasada']">La fecha no puede ser anterior a hoy.</ng-container>
        </small>
      </div>
      <div class="f">
        <label>Hora</label>
        <select formControlName="hora" [class.bad]="inv('hora')">
          <option value="">-- Selecciona --</option>
          <option *ngFor="let h of horas" [value]="h">{{h}}</option>
        </select>
        <small *ngIf="inv('hora')">Elige una hora.</small>
      </div>
      <div class="f full"><label>Notas (opcional)</label>
        <textarea rows="3" formControlName="notas" placeholder="Alergias, preferencias..."></textarea></div>

      <div class="alert" *ngIf="form.errors?.['horarioOcupado'] && (c('hora').touched||c('fecha').touched)">⚠️ Ese horario ya está reservado, elige otro.</div>
      <div class="alert" *ngIf="form.errors?.['horaPasada']">⚠️ Esa hora ya pasó. Elige una hora futura.</div>
      <button class="btn full" [disabled]="form.invalid">{{ editandoId !== null ? 'Guardar cambios ✨' : 'Confirmar reserva ✨' }}</button>
    </form>
  </div>`,
  styles:[`
  .form{max-width:780px;margin:0 auto;background:#fff;padding:2.5rem;border-radius:28px;box-shadow:0 20px 50px rgba(45,27,78,.15);
    display:grid;grid-template-columns:1fr 1fr;gap:1.3rem;animation:up .8s both;border-top:6px solid var(--teal)}
  .f{display:flex;flex-direction:column;gap:.4rem;animation:up .7s both} .f:nth-child(2){animation-delay:.1s}.f:nth-child(3){animation-delay:.2s}.f:nth-child(4){animation-delay:.3s}
  .full{grid-column:1/-1}
  label{font-weight:500;color:var(--violet2);font-size:.9rem}
  input,select,textarea{padding:.85rem 1rem;border:2px solid #e8e1f3;border-radius:14px;font:inherit;background:#faf7ff;transition:.3s;outline:0}
  input:focus,select:focus,textarea:focus{border-color:var(--teal);box-shadow:0 0 0 4px rgba(46,196,182,.18);transform:translateY(-2px)}
  .bad{border-color:#e63946!important;animation:shake .4s}
  @keyframes shake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  small{color:#e63946;animation:up .3s both}
  .alert{grid-column:1/-1;background:#fff3cd;border-left:5px solid var(--gold);padding:.9rem 1rem;border-radius:12px;animation:up .4s both}
  @media(max-width:700px){.form{grid-template-columns:1fr;padding:1.5rem}}`]
})
export class ReservarComponent implements OnInit {
  private fb=inject(FormBuilder); private svc=inject(ReservasService);
  private router=inject(Router); private route=inject(ActivatedRoute);
  servicios=SERVICIOS; horas=HORAS;
  hoy=(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;})();
  editandoId: number | null = null;

  form=this.fb.group({
    nombre:['',[Validators.required,Validators.minLength(3),soloLetras()]],
    telefono:['',[Validators.required,telefono9()]],
    correo:['',[Validators.required,Validators.email]],
    servicio:['',Validators.required],
    fecha:['',[Validators.required,fechaNoPasada()]],
    hora:['',Validators.required],
    notas:['']
  },{validators:horarioDisponible(()=>this.svc.reservas, ()=>this.editandoId)});

  ngOnInit(){
    const s=this.route.snapshot.queryParamMap.get('servicio');
    const idParam=this.route.snapshot.queryParamMap.get('id');
    if(s) this.form.patchValue({servicio:s});
    if(idParam){
      const id=Number(idParam);
      const reserva = this.svc.getById(id);
      if(!reserva){ this.router.navigate(['/mis-reservas']); return; }
      this.editandoId = id;
      this.form.patchValue({
        nombre: reserva.nombre,
        telefono: reserva.telefono,
        correo: reserva.correo,
        servicio: reserva.servicio,
        fecha: reserva.fecha,
        hora: reserva.hora,
        notas: reserva.notas ?? ''
      });
      this.form.markAllAsTouched();
    }
  }
  c(n:string){ return this.form.get(n)!; }
  inv(n:string){ const x=this.c(n); return x.invalid && (x.touched||x.dirty); }
  enviar(){
    if(this.form.invalid){ this.form.markAllAsTouched(); return; }
    const payload = this.form.getRawValue() as any;
    if(this.editandoId !== null){
      this.svc.actualizar(this.editandoId, payload);
    } else {
      this.svc.agregar(payload);
    }
    this.router.navigate(['/mis-reservas']);
  }
}
