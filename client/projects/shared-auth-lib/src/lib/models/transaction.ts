export interface Transaction {
  id: string;
  fecha: string;
  concepto: string;
  importe: number;
  estado: 'confirmada' | 'pendiente';
}
