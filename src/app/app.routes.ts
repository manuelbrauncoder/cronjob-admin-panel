import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cronjobs',
    pathMatch: 'full',
  },
  {
    path: 'cronjobs',
    loadComponent: () =>
      import('./presentation/pages/cronjobs/cronjobs.component').then(
        (m) => m.CronjobsComponent
      ),
  },
  {
    path: 'cronjobs/:id',
    loadComponent: () =>
      import('./presentation/pages/cronjob/cronjob.component').then(
        (m) => m.CronjobComponent
      ),
  },
  {
    path: 'log/:id',
    loadComponent: () =>
      import('./presentation/pages/log/log.component').then(
        (m) => m.LogComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./presentation/pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
