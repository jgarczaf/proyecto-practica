import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['Transferencia', 'Pago', 'Domiciliación', 'Inversión'])
  tipo: string;

  @IsNumber()
  // Puede ser positivo o negativo. Si quisieras solo positivos: @IsPositive()
  importe: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['Completado', 'Pendiente', 'Procesando', 'Fallido'])
  estado: string;

  @IsDateString()
  creada: string; // lo convertimos a Date en el servicio si queremos

  @IsString()
  @IsNotEmpty()
  userId: string;
}
