import {
  Controller,
  Post,
  Res,
  Body,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { User } from 'src/db/schemas/user.schema';
import { Inject } from '@nestjs/common/decorators';
import { CreatePost } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  @Inject(PostsService)
  private readonly postsService: PostsService;

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Res() res: Response,
    @Body() post: CreatePost,
    @Req() req: Request,
  ) {
    const user = req.user as User;

    const createdPost = await this.postsService.create({
      ...post,
      viewed: 0,
      likes: 0,
      user,
    });

    return res.status(201).json({ post: createdPost });
  }

  @Get('/most-viewed')
  async getTopMostViewed(@Res() res: Response) {
    const mostViewed = await this.postsService.getTopMostViewed();
    return res.status(200).json({ mostViewed });
  }

  @Get('/most-popular')
  async getMostPopular(@Res() res: Response) {
    const mostPopular = await this.postsService.getTopMostViewed();
    return res.status(200).json({ mostPopular });
  }
}
