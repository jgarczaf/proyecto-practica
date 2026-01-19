import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { TransactionsApi, Transaction } from './transactions.component.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  loading = false;
  error = '';
  page = 1;
  limit = 10;
  totalPages = 1;
  totalItems = 0;
  data: Transaction[] = [];

  displayedColumns = [
    'nombre',
    'tipo',
    'importe',
    'estado',
    'creada',
    'acciones',
  ];
  createPanelOpen = false;

  createForm = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    tipo: ['Transferencia', Validators.required],
    importe: [0, Validators.required],
    estado: ['Pendiente', Validators.required],
    creada: [new Date()],
    userId: ['000000000000000000000001', Validators.required],
  });

  constructor(
    private api: TransactionsApi,
    private fb: FormBuilder,
    private router: Router,
    private snack: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  chipColor(
    status: Transaction['estado'],
  ): 'primary' | 'warn' | 'accent' | undefined {
    switch (status) {
      case 'Completado':
        return 'primary';
      case 'Pendiente':
        return 'warn';
      case 'Procesando':
        return 'accent';
      case 'Fallido':
        return 'warn';
      default:
        return undefined;
    }
  }

  fetch() {
    this.loading = true;
    this.error = '';
    this.api.list(this.page, this.limit).subscribe({
      next: (res) => {
        this.data = res.data;
        this.totalPages = res.meta.totalPages;
        this.totalItems = res.meta.totalItems;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error cargando transacciones';
        this.loading = false;
      },
    });
  }

  onPage(e: PageEvent) {
    this.limit = e.pageSize;
    this.page = e.pageIndex + 1;
    this.fetch();
  }

  goDetail(id: string) {
    this.router.navigate(['/transactions/detail', id]);
  }

  create() {
    if (this.createForm.invalid) return;

    const raw = this.createForm.getRawValue();
    const payload = {
      ...raw,
      // Asegura ISO string para la API
      creada: (raw.creada as Date).toISOString(),
    } as any;

    this.api.create(payload).subscribe({
      next: () => {
        this.snack.open('Transacción creada', 'OK', { duration: 2000 });
        this.createForm.reset({
          nombre: '',
          tipo: 'Transferencia',
          importe: 0,
          estado: 'Pendiente',
          creada: new Date(),
          userId: '000000000000000000000001',
        });
        this.page = 1;
        this.fetch();
      },
      error: () =>
        this.snack.open('No se pudo crear la transacción', 'Cerrar', {
          duration: 2500,
        }),
    });
  }
}
