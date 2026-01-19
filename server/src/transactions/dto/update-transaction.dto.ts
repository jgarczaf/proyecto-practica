import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['Transferencia', 'Pago', 'Domiciliación', 'Inversión'])
  tipo?: string;

  @IsOptional()
  @IsNumber()
  importe?: number;

  @IsOptional()
  @IsString()
  @IsEnum(['Completado', 'Pendiente', 'Procesando', 'Fallido'])
  estado?: string;
}
