import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Post } from './post.schema';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  picture: string;

  @Prop()
  bio: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
