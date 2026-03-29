import { Routes } from '@angular/router';
import { TablaPersonas } from './tabla-personas/tabla-personas';
import { FormularioPersona } from './formulario-persona/formulario-persona';
import { ListadoPersonas } from './listado-personas/listado-personas';


export const routes: Routes = [
    {path: "", component: TablaPersonas},
    {path: "tabla", component: TablaPersonas},
    {path: "formulario", component: FormularioPersona},
    {path: "listado", component: ListadoPersonas},

];
