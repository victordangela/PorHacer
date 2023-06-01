import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipeModule } from '../pipes/pipe/pipe.module';



@NgModule({
  declarations: [
    ListasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule
  ],
  exports:[
    ListasComponent
  ]
})
export class ComponentsModule { }
