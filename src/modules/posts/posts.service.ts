import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/db/schemas/post.schema';

interface GetAllByFilter {
  sort?: 'viewed' | 'likes';
  page?: number;
  size?: number;
}

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(post: Post): Promise<Post> {
    const createdPost = new this.postModel(post);
    return createdPost.save();
  }

  async getMostPopular({
    page = 1,
    size = 5,
  }: GetAllByFilter): Promise<Post[]> {
    return (await this.postModel.aggregate([
      { $sort: { likes: -1 } },
      { $skip: (page - 1) * size },
      { $project: { content: 0 } },
      { $limit: size },
    ])) as Post[];
  }

  async getTopMostViewed(): Promise<Post[]> {
    return (await this.postModel.aggregate([
      { $sort: { viewed: -1 } },
      { $project: { content: 0 } },
      { $limit: 6 },
    ])) as Post[];
  }
}
