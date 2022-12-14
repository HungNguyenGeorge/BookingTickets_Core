import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDTO } from './dto/create-order.dto';
import { IDetailOrder } from './interface/order-details.interface';
import { IDetailOrderWithUser } from './interface/order-user-detail.interface';
import { OrderDocument } from './_schemas/order.schema';


export class OrdersRepository {
  constructor(
    @InjectModel('Order')
    private orderModel: Model<OrderDocument>,
  ) { }

  async createOne(order: CreateOrderDTO): Promise<IDetailOrder> {
    try {
      const newOrder = await this.orderModel.create(order);
      return <IDetailOrder>newOrder;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }


  async findById(_id: Types.ObjectId): Promise<any> {
    const result = this.orderModel.findById(_id);
    return result;
  }


  async removeUser(id: Types.ObjectId): Promise<{ acknowledged: boolean, deletedCount: number }> {
    const result = await this.orderModel.deleteOne({ _id: id });
    return result;
  }

  async getAll(filter): Promise<IDetailOrderWithUser[]> {
    const result = await this.orderModel.find(filter);
    return <IDetailOrderWithUser[]>result;
  }

  async findOne(email: string): Promise<any> {
    const result = await this.orderModel.findOne({ email: email });
    return result;
  }
  async findOneAndUpdate(id: Types.ObjectId, orderInfor: CreateOrderDTO): Promise<IDetailOrder> {

    try {
      const result = await this.orderModel.findByIdAndUpdate(id, orderInfor, { new: true });
      return <IDetailOrder>result;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  async updateMany(conditions: any, set: any) {
    const result = await this.updateMany(conditions, set);
    return result;
  }

  async getWithConditions(filter: any): Promise<OrderDocument[]> {
    const result = await this.orderModel.find(filter);
    return result;
  }
}
