import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'users',
    loadChildren: () => import('../pages/admin/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'blogs',
    loadChildren: () => import('../pages/admin/news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('../pages/admin/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'products',
    loadChildren: () => import('../pages/admin/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'tags',
    loadChildren: () => import('../pages/admin/tags/tags.module').then(m => m.TagsModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
