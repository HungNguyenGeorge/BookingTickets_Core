import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { IDetailUser } from './entities/user-details.entity';
import { UsersRepository } from './users.repository';
import { UserDocument } from './_schemas/user.schema';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  createUser(userInfor: CreateUserDTO): Promise<UserDocument> {
    userInfor.status = userInfor.status || 1
    const user = this.usersRepository.createOne(userInfor);
    return user;
  }



  _getUserDetails({ id, fullname, email, phone, role, status }: UserDocument): IDetailUser {
    return {
      id,
      fullname,
      email,
      phone,
      role,
      status
    };
  }


  async getAllUsers(): Promise<UserDocument[]> {
    const users = await this.usersRepository.getAll();
    return users;
  }

  async removeUser(_id: Types.ObjectId): Promise<any> {
    const user = await this.usersRepository.findUserById(_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersRepository.removeUser(_id);
  }

  async findUserByEmail(email): Promise<UserDocument> {
    const user = this.usersRepository.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async findUserById(_id: Types.ObjectId): Promise<UserDocument> {
    const user = this.usersRepository.findUserById(_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async findUserByIdDetail(_id: Types.ObjectId): Promise<IDetailUser> {
    const user = this.usersRepository.findUserByIdDetail(_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: Types.ObjectId, userInfor: CreateUserDTO): Promise<CreateUserDTO> {
    const user = await this.usersRepository.findOneAndUpdate(id, userInfor);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

}
