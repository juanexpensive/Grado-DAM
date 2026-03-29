import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-persona',
  templateUrl: './formulario-persona.html',
  imports: [FormsModule]
})
export class FormularioPersona {
  nombre: string = '';
  apellidos: string = '';

  saludar(): void {
    if (this.nombre) {
      alert(`¡Hola, ${this.nombre} ${this.apellidos}!`);
    } else {
      alert('¡Hola! Por favor, introduce tu nombre.');
    }
  }
}