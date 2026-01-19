import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import {
  TransactionsApi,
  Transaction,
} from '../../transactions.component.service';

type TipoTx = 'Transferencia' | 'Pago' | 'Domiciliación' | 'Inversión';
type EstadoTx = 'Completado' | 'Pendiente' | 'Procesando' | 'Fallido';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
})
export class TransactionDetailComponent implements OnInit {
  id = '';
  loading = true;
  error = '';

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    tipo: ['Transferencia' as TipoTx, Validators.required],
    importe: [0, Validators.required],
    estado: ['Pendiente' as EstadoTx, Validators.required],
    creada: [{ value: '', disabled: true }],
    userId: [''],
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly api: TransactionsApi,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (!this.id) {
      this.router.navigate(['/transactions/error']);
      return;
    }

    this.loading = true;
    this.api
      .get(this.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (tx) => {
          const fecha = tx.creada ? tx.creada.substring(0, 10) : '';
          this.form.patchValue({
            nombre: tx.nombre,
            tipo: tx.tipo as TipoTx,
            importe: tx.importe,
            estado: tx.estado as EstadoTx,
            creada: fecha,
            userId: tx.userId,
          });
        },
        error: (err) => {
          this.router.navigate(['/transactions/error']);
        },
      });
  }

  save(): void {
    if (!this.id) {
      this.router.navigate(['/transactions/error']);
      return;
    }
    if (this.form.invalid) {
      this.error = 'Formulario inválido';
      return;
    }

    const raw = this.form.getRawValue();

    const patch: Partial<Transaction> = {
      nombre: raw.nombre ?? undefined,
      tipo: (raw.tipo as TipoTx | null) ?? undefined,
      importe:
        raw.importe !== null && raw.importe !== undefined
          ? Number(raw.importe)
          : undefined,
      estado: (raw.estado as EstadoTx | null) ?? undefined,
    };

    this.loading = true;
    this.api
      .update(this.id, patch)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          // Vuelve al listado
          this.router.navigate(['/transactions/list']);
        },
        error: () => {
          this.error = 'No se pudo actualizar la transacción';
        },
      });
  }

  delete(): void {
    if (!this.id) {
      this.router.navigate(['/transactions/error']);
      return;
    }
    const ok = confirm('¿Eliminar esta transacción?');
    if (!ok) return;

    this.loading = true;
    this.api
      .remove(this.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/transactions/list']);
        },
        error: () => {
          this.error = 'No se pudo eliminar la transacción';
        },
      });
  }

  backToList(): void {
    this.router.navigate(['/transactions/list']);
  }
}
