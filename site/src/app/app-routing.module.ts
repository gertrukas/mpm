import { NgModule } from '@angular/core';
import { RouterModule, Routes, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'errors',
    loadChildren: () => import('./pages/errors/errors.module').then(m => m.ErrorsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled', // Desplaza automáticamente al inicio al cambiar de ruta
    anchorScrolling: 'enabled' // Habilita el desplazamiento con anclas si usas # en tus URLs

})],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    // Esto garantiza que la página se desplace hacia arriba en cada navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }
}
