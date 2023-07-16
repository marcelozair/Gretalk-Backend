import { User } from './user.schema';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = HydratedDocument<Post>

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  banner: string;

  @Prop()
  likes: number;

  @Prop()
  viewed: number;

  @Prop()
  content: string;

  @Prop()
  category: string;

  @Prop()
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
