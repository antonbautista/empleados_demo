import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor() { }

  setdatos(){
    try {
      localStorage.setItem('persona', JSON.stringify({"nombre":"test","edad":28}));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }
}
