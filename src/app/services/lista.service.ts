import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  public listas: Lista[] = []; //Va almacenar las listas de listas
  constructor() { 
    this.listas = this.cargarStorage();
  }

   /**
   * @function crearLista
   * @description Función que guarda en arreglo de listas un nuevo objecto o una nueva lista a patir del nombre de la lista
   * @param { string } nombreLista el nombre de la lista
   */
  crearLista(nombreLista: string) {

    let ObjetoLista = new Lista(nombreLista);

    this.listas.push(ObjetoLista);
    this.guardarStorage();
    return ObjetoLista.id;
  }

  guardarStorage() {
    let stringListas: string = JSON.stringify(this.listas);
    localStorage.setItem('listas', stringListas);
  }

  /**
   * @function cargarStorage
   * @description Función realizar el cargado de la información de las listas
   */
  cargarStorage(): Lista[] {
    const listaStorage = localStorage.getItem('listas');
    if (listaStorage == null) {
      return [];
    }
    let objListas: Lista[] = JSON.parse(listaStorage);
    return objListas;
  }
 
  borrarLista(lista: Lista) {
    let newLista = this.listas.filter((listaItem) => listaItem.id !== lista.id);
    this.listas = newLista;
    this.guardarStorage();
  }

  /**
   * @function editarLista
   * @description Función realizar edición de la lista pasada por parametro
   * @param {Lista} lista la lista a editar
   */
    editarLista(lista: Lista) {
      let MatchLista = this.listas.find((listaItem) => listaItem.id == lista.id);
      if(MatchLista){
        MatchLista.titulo = lista.titulo;
      }
      this.guardarStorage();
    }
  
    obtenerLista(idLista: string | number): Lista {
      const id = Number(idLista);
      return this.listas.find((itemLista)=>itemLista.id == id);
    }


}
