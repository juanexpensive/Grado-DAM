import { Persona } from "../../domain/entities/Persona";
import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { IRepositoryPersonas } from "../../domain/interfaces/repositories/IRepositoryPersonas";
import {  makeAutoObservable } from "mobx";



@injectable()
export class PeopleListVM {

    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;
   
    constructor(
        @inject(TYPES.IRepositoryPersonas)
        private RepositoryPersonas: IRepositoryPersonas
    ) {

        this._personaSeleccionada = new Persona(0, '', '', '', '', '', '', 0);

        this._personasList = this.RepositoryPersonas.getListadoCompletoPersonas();
        makeAutoObservable(this);
     
    }

    public get personasList(): Persona[] {
        return this._personasList;
    }


    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }


    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
        //alert(`Persona seleccionada en el VM: ${this._personaSeleccionada.nombre} ${this._personaSeleccionada.apellido}`);
     
    }


  }
