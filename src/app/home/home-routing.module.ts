import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StroopGamePage } from '../stroop-game/stroop-game.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'stroopGame',
    component: StroopGamePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
