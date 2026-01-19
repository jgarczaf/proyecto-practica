import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './transactions.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';
import { TransactionsErrorComponent } from './components/transactions-error/transactions-error.component';

const TRANSACTIONS_ROUTES: Routes = [
  { path: 'list', component: TransactionsComponent },
  { path: 'detail/:id', component: TransactionDetailComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', component: TransactionsErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(TRANSACTIONS_ROUTES)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
