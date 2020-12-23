import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu/menu.page';



@NgModule({
  declarations: [MenuPage],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [MenuPage],
})
export class SharedModule { }