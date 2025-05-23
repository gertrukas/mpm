import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';


const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        title: 'Bienvenidos a Lounge & Food MPM'

      },
      
      { path: 'aviso-de-privacidad',
        loadChildren: () => import('./aviso/aviso-de-privacidad/aviso-de-privacidad.module').then(m => m.AvisoDePrivacidadModule),
      },
      {
        path: 'somos',
        loadChildren: () => import('./somos/somos/somos.module').then(m => m.SomosModule),
        
      },
      
      {
        path: 'servicios/comedor-empresarial',
        loadChildren: () => import('./servicios/comedor-empresarial/comedor-empresarial.module').then(m => m.ComedorEmpresarialModule),
      },
      {
        path: 'servicios/eventos-especiales',
        loadChildren: () => import('./servicios/eventos-especiales/eventos-especiales.module').then(m => m.EventosEspecialesModule),
      },
      {
        path: 'servicios/cafeterias',
        loadChildren: () => import('./servicios/cafeterias/cafeterias.module').then(m => m.CafeteriasModule),
      },
      {
        path: 'servicios/catering',
        loadChildren: () => import('./servicios/catering/catering.module').then(m => m.CateringModule),
      },
      {
        path: 'servicios/diseno-de-comedores',
        loadChildren: () => import('./servicios/desarrollo-de-proyectos/desarrollo-de-proyectos.module').then(m => m.DesarrolloDeProyectosModule),
      },
      {
        path: 'beneficios/alianzas-estrategicas',
        loadChildren: () => import('./alianzas-estrategicas/alianzas-estrategicas.module').then(m => m.AlianzasEstrategicasModule),
      },
      {
        path: 'beneficios/certificaciones',
        loadChildren: () => import('./certificaciones/certificaciones.module').then(m => m.CertificacionesModule),
      },
      {
        path: 'bolsa-de-trabajo',
        loadChildren: () => import('./bolsa-de-trabajo/bolsa-de-trabajo.module').then(m => m.BolsaDeTrabajoModule),
      },
      {
        path: 'contacto',
        loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoModule)
      },
      
      


    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
