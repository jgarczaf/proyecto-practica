import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

export interface Transaction {
  _id: string;
  nombre: string;
  tipo: 'Transferencia' | 'Pago' | 'Domiciliación' | 'Inversión';
  importe: number;
  estado: 'Completado' | 'Pendiente' | 'Procesando' | 'Fallido';
  creada: string;
  userId: string;
}

export interface Paginated<T> {
  data: T[];
  meta: { page: number; limit: number; totalItems: number; totalPages: number };
}

@Injectable({ providedIn: 'root' })
export class TransactionsApi {
  private base = `${environment.apiBaseUrl}/transactions`;

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 10) {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<Paginated<Transaction>>(this.base, { params });
  }

  get(id: string) {
    return this.http.get<Transaction>(`${this.base}/${id}`);
  }

  create(payload: Omit<Transaction, '_id'>) {
    return this.http.post<Transaction>(this.base, payload);
  }

  update(id: string, patch: Partial<Transaction>) {
    return this.http.patch<Transaction>(`${this.base}/${id}`, patch);
  }

  remove(id: string) {
    return this.http.delete<{ deleted: boolean; id: string }>(
      `${this.base}/${id}`,
    );
  }
}
