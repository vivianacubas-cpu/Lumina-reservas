import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Reserva } from '../services/reservas.service';

const parse=(s:string)=>{const [y,m,d]=s.split('-').map(Number);return {y,m,d};};

export const soloLetras = (): ValidatorFn => (c:AbstractControl):ValidationErrors|null =>
  !c.value || /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(c.value) ? null : {soloLetras:true};

// 9 dígitos y empieza con 9 (celular Perú)
export const telefono9 = (): ValidatorFn => (c) =>
  !c.value || /^9\d{8}$/.test(c.value) ? null : {telefono:true};

export const fechaNoPasada = (): ValidatorFn => (c) => {
  if(!c.value) return null;
  const {y,m,d}=parse(c.value); const hoy=new Date(); hoy.setHours(0,0,0,0);
  return new Date(y,m-1,d) < hoy ? {fechaPasada:true} : null;
};

// Validador de grupo: horario ocupado o hora ya pasada hoy
export const horarioDisponible = (get:()=>Reserva[], ignoreId:()=>number|null = ()=>null): ValidatorFn => (g) => {
  const fecha=g.get('fecha')?.value, hora=g.get('hora')?.value;
  if(!fecha||!hora) return null;
  const currentId = ignoreId();
  if(get().some(r => r.id !== currentId && r.fecha===fecha && r.hora===hora)) return {horarioOcupado:true};
  const {y,m,d}=parse(fecha); const [hh,mm]=hora.split(':').map(Number);
  return new Date(y,m-1,d,hh,mm) < new Date() ? {horaPasada:true} : null;
};
