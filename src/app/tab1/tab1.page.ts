import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public listaService: ListaService
  ) {}

  async AgregarLista(){ 
    let alerta = await this.alertController.create({ 
      header: "Agregar lista",
      inputs: [ 
        { 
        type: "text", 
        name: "titulo", 
        placeholder: "Ingresar nombre de la lista" 
      } 
    ], 
      buttons: [ 
        { 
          text: "Cancelar", 
          role: "cancel" 
        }, 
        { 
          text: "Crear", 
          handler: (data: any) => { 
            let isValid: boolean = this.validInput(data); 
            if (isValid) { 
              let titulo = data.titulo; 
              let wasCreated = this.listaService.crearLista(titulo); 
              if(wasCreated){ 
                this.presentToast('Lista creada correctamente'); 
              }
            }
          } 
        } 
      ]
    }); 
    await alerta.present();
    console.log("Click en el botón");
  }

  /** 
   * @function validInput 
   * @description Función realiza la validación del input 
   * cuando no fue ingresado ningun valor manda false (y un toast) y en caso contrario manda true 
   * @param { any } input al valor ingresado por el usuario 
   * @returns { boolean } 
   */
  validInput(input: any): boolean { 
    if (input && input.titulo) { 
      return true 
    } 
    console.log("Debe ingresar un valor"); 
    this.presentToast("Debe ingresar un valor");
    return false; 
  }

  async presentToast(mensaje: string): Promise<void> { 
    let toast = await this.toastController.create({ 
      message: mensaje, 
      duration: 2000 
    }); 
    toast.present(); 
  }

}
