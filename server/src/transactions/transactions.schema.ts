import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({
  collection: 'transactions',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Transaction {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, enum: ['Transferencia', 'Pago', 'Domiciliación', 'Inversión'] })
  tipo: string;

  @Prop({ required: true })
  importe: number; // + / -

  @Prop({ required: true, enum: ['Completado', 'Pendiente', 'Procesando', 'Fallido'] })
  estado: string;

  @Prop({ required: true })
  creada: Date;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
