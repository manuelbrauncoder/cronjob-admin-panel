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
    path: 'dashboard',
    loadComponent: () =>
      import('./presentation/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'cronjob/:id',
    loadComponent: () =>
      import('./presentation/pages/cronjob/cronjob.component').then(
        (m) => m.CronjobComponent
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
