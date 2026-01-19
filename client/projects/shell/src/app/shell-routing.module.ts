import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GlobalErrorComponent } from './components/global-error/global-error.component';

const SHELL_ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'transactions', redirectTo: 'transactions/list', pathMatch: 'full' },
  {
    path: 'transactions',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './RemoteTransactionsModule',
      }).then((m) => m.TransactionsComponentModule),
  },

  { path: '**', component: GlobalErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(SHELL_ROUTES)],
  exports: [RouterModule],
})
export class ShellRoutingModule {}
