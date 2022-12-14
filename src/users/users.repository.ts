import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { IDetailUser } from './entities/user-details.entity';
import { UserDocument } from './_schemas/user.schema';


export class UsersRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) { }

  async createOne(user: CreateUserDTO): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }


  async findUserById(_id: Types.ObjectId): Promise<any> {
    const result = this.userModel.findById(_id);
    return result;
  }

  async findUserByIdDetail(_id: Types.ObjectId): Promise<IDetailUser> {
    const result = await this.userModel.findById(_id);
    return <IDetailUser>result;
  }


  async removeUser(id: Types.ObjectId): Promise<{ acknowledged: boolean, deletedCount: number }> {
    const result = await this.userModel.deleteOne({ _id: id });
    return result;
  }

  async getAll(): Promise<any> {
    const result = await this.userModel.find({});
    return result;
  }

  async findOne(email): Promise<any> {
    const result = await this.userModel.findOne({ email: email });
    return result;
  }

  async findOneAndUpdate(id: Types.ObjectId, UserInfor: CreateUserDTO): Promise<UserDocument> {
    try {
      const result = await this.userModel.findByIdAndUpdate(id, UserInfor, { new: true });
      return result;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }
}
