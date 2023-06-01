import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  implements OnInit {
  @Input() tipo: string;
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public listaService: ListaService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.tipo)
  }

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


  /**
   * @function borrarLista
   * @description Función eliminar la lista seleccionada
   * @param { Lista } listaItem lista a eliminar
   */
  borrarLista(listaItem: Lista) {
    console.log("Eliminar", listaItem);
    this.listaService.borrarLista(listaItem);
  }

  listaSeleccionada(listaItem: Lista) {
    console.log("Seleccionada", listaItem);
    const URL = '/agregar/'+listaItem.id; 
    this.router.navigateByUrl(URL);
  }

  /**
  * @function EditarLista
  * @description Función sera ejecutada cuando el usuario le de click al boton editar
  * Muestra una alerta donde solicita el nuevo nombre de la lista
  */
  async editarLista(lista: Lista) {
    let alerta = await this.alertController.create({
      header: "Editar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nombre de la lista",
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Editar",
          handler: (data: any) => {
            let isValid: boolean = this.validInput(data);
            if (isValid) {
              let titulo = data.titulo;
              lista.titulo = titulo;
              this.listaService.editarLista(lista);
              this.presentToast('Lista editada correctamente!');
            }

          }
        }
      ]
    });
    await alerta.present();
    console.log("Editar", lista);
  }

}
