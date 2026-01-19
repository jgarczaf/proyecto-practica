import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction, TransactionDocument } from './transactions.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private readonly txModel: Model<TransactionDocument>,
  ) {}

  async create(dto: CreateTransactionDto) {
    const created = await this.txModel.create({
      ...dto,
      creada: new Date(dto.creada),
      userId: new Types.ObjectId(dto.userId),
    });
    return created;
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.txModel.find().sort({ creada: -1 }).skip(skip).limit(limit).lean(),
      this.txModel.countDocuments(),
    ]);

    return {
      data: items,
      meta: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  async findOne(id: string) {
    const doc = await this.txModel.findById(id).lean();
    if (!doc) throw new NotFoundException('Transacción no encontrada');
    return doc;
  }

  async update(id: string, dto: UpdateTransactionDto) {
    const updated = await this.txModel.findByIdAndUpdate(id, dto, { new: true }).lean();
    if (!updated) throw new NotFoundException('Transacción no encontrada');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.txModel.findByIdAndDelete(id).lean();
    if (!deleted) throw new NotFoundException('Transacción no encontrada');
    return { deleted: true, id };
  }
}
