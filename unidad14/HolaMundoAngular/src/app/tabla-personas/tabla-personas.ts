import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tabla-personas',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './tabla-personas.html',
  styleUrl: './tabla-personas.css',
})
export class TablaPersonas {

}
