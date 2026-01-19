import { Component } from '@angular/core';

@Component({
  selector: 'app-global-error',
  template: `
    <div class="container mt-4">
      <div class="alert alert-danger">
        La ruta solicitada no existe en el sistema.
      </div>
      <a routerLink="/transactions/list" class="btn btn-link"
        >Ir al listado de transacciones</a
      >
    </div>
  `,
})
export class GlobalErrorComponent {}
