import { Component } from '@angular/core';
@Component({
  selector: 'app-transactions-error',
  template: `
    <div class="container">
      <mat-card style="border-left:4px solid #e53935;">
        Ha ocurrido un problema con la transacción solicitada (ID no existente o
        error de dominio).
        <div style="margin-top:12px;">
          <a mat-stroked-button color="primary" routerLink="/transactions/list">
            <span class="material-icons">list</span>
            Ir al Listado
          </a>
        </div>
      </mat-card>
    </div>
  `,
})
export class TransactionsErrorComponent {}
