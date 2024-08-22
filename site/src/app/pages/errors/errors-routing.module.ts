import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorsComponent } from './errors.component';

const routes: Routes = [{ path: '', component: ErrorsComponent }, { path: '404', loadChildren: () => import('./e404/e404.module').then(m => m.E404Module) }, { path: '404', loadChildren: () => import('./e500/e500.module').then(m => m.E500Module) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
