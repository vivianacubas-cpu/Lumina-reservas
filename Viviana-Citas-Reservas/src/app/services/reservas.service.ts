import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Reserva { id:number; nombre:string; telefono:string; correo:string; servicio:string; fecha:string; hora:string; notas?:string; }
export interface Servicio { nombre:string; icono:string; precio:number; duracion:string; desc:string; }

export const SERVICIOS: Servicio[] = [
  {nombre:'Masaje Relajante',icono:'💆',precio:90,duracion:'60 min',desc:'Alivia tensiones con aceites esenciales.'},
  {nombre:'Facial Hidratante',icono:'🧖',precio:75,duracion:'45 min',desc:'Piel luminosa y renovada.'},
  {nombre:'Manicure & Pedicure',icono:'💅',precio:60,duracion:'50 min',desc:'Cuidado completo de manos y pies.'},
  {nombre:'Corte & Peinado',icono:'💇',precio:55,duracion:'40 min',desc:'Estilo profesional a tu medida.'},
  {nombre:'Aromaterapia',icono:'🌿',precio:80,duracion:'55 min',desc:'Equilibrio y bienestar mental.'},
  {nombre:'Day Spa Premium',icono:'✨',precio:220,duracion:'3 h',desc:'La experiencia completa de lujo.'},
];
export const HORAS = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'];

@Injectable({providedIn:'root'})
export class ReservasService {
  private data = new BehaviorSubject<Reserva[]>([]);   // datos en memoria
  reservas$ = this.data.asObservable();
  private nextId = 1;
  get reservas(){ return this.data.value; }
  getById(id:number){ return this.reservas.find(r=>r.id===id); }
  agregar(r: Omit<Reserva,'id'>){ this.data.next([...this.reservas,{...r,id:this.nextId++}]); }
  actualizar(id:number, cambios: Partial<Omit<Reserva,'id'>>){
    this.data.next(this.reservas.map(r => r.id===id ? { ...r, ...cambios } : r));
  }
  eliminar(id:number){ this.data.next(this.reservas.filter(r=>r.id!==id)); }
}
