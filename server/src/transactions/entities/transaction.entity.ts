export type TransactionCategory = 'INGRESO' | 'GASTO' | 'TRANSFERENCIA';

export class Transaction {
  id: number;
  concepto: string;
  categoria: TransactionCategory;
  importe: number;
  fecha: string;
}
