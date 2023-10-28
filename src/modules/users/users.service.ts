import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/db/schemas/user.schema';
import { CreateUser } from './dto/user.dto';

@Injectable()
export class UsersService {
  @InjectModel(User.name)
  private readonly userModel: Model<User>;

  async findByEmailWithPassword(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async getUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async createUser(user: CreateUser): Promise<UserDocument> {
    const newUser = await this.userModel.create(user);
    const userCreated = await newUser.save();
    return userCreated;
  }
}
